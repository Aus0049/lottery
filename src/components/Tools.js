/**
 * Created by Aus on 17/2/6.
 */
const Tools = {
    SwipeListWatcher () {
        // 只适用于左划⬅️
        let x; // 滑动初始点坐标

        $(document).on("touchstart", ".swipe-list-group li > .face", function (e) {
            // 判断当前列表是否应该清滑动
            $('.swipe-list-group li > .face.open').removeClass('open').animate({left: '0px'}, 200);
            // 记住该位置
            x = e.originalEvent.targetTouches[0].pageX; // anchor point
        });

        $(document).on("touchmove", ".swipe-list-group li > .face", function (e) {
            // 滑动的距离
            let change = e.originalEvent.targetTouches[0].pageX - x;
            // 判断距离是否超过100
            change = Math.min(Math.max(-100, change), 0);
            // 判断 最终滑动距离如果不是负数的话 不加open类
            if(change < 0){
                $(e.currentTarget).addClass('open');
            } else {
                $(e.currentTarget).removeClass('open');
            }

            // 制作像素
            $(e.currentTarget).css({left: change + 'px'});
            //
            if (change < -10) disableScroll();
        });

        $(document).on("touchend", ".swipe-list-group li > .face", function (e) {
            let left = Number.parseInt(e.currentTarget.style.left);
            let newLeft;

            if (left < -35) {
                newLeft = '-100px';
            }else {
                newLeft = '0px';
            }

            // 当手指收起的时候 如果是打开状态 添加一层透明蒙版 点击蒙版关闭所有
            if(newLeft == '-100px'){
                if($(".transparent-mask").length == 0){
                    $("body").append("<div class='transparent-mask'></div>");
                    $(".swipe-list-group li > .face.open").next().addClass("up");
                }
            }

            $(e.currentTarget).animate({left: newLeft}, 200);
            enableScroll();
        });

        $(document).on("touchstart", ".transparent-mask", function () {
            $(".swipe-list-group li > .face.open").next().removeClass("up");
            $('.swipe-list-group li > .face.open').removeClass('open').animate({left: '0px'}, 200);
            $(this).remove();
        });
    },
    SwipeListLeftRightWatcher () {
        // 适用于左右滑动 ←→
        let x; // 滑动初始点坐标

        $(document).on("touchstart", ".swipe-list-group li > .prize-list", function (e) {
            // 判断当前列表是否应该清滑动
            $('.swipe-list-group li > .prize-list.open').removeClass('open').animate({left: '0px'}, 200);
            // 记住该位置
            x = e.originalEvent.targetTouches[0].pageX; // anchor point
        });

        $(document).on("touchmove", ".swipe-list-group li > .prize-list", function (e) {
            // 滑动的距离
            let change = e.originalEvent.targetTouches[0].pageX - x;
            // 判断距离是否超过100
            change = Math.min(Math.max(-100, change), 100);

            if(change != 0){
                $(e.currentTarget).addClass('open');
            } else {
                $(e.currentTarget).removeClass('open');
            }

            // 制作像素
            $(e.currentTarget).css({left: change + 'px'});
            //
            if (change < -10) disableScroll();
        });

        $(document).on("touchend", ".swipe-list-group li > .prize-list", function (e) {
            let left = Number.parseInt(e.currentTarget.style.left);
            let newLeft;

            if (left < -35) {
                newLeft = '-100px';
            } else if (left > 35) {
                newLeft = '100px';
            } else {
                newLeft = '0px';
            }

            // 当手指收起的时候 如果是打开状态 添加一层透明蒙版 点击蒙版关闭所有
            if(newLeft == '-100px'){
                if($(".transparent-mask").length == 0){
                    $("body").append("<div class='transparent-mask'></div>");
                    $(".swipe-list-group li > .prize-list.open").next().addClass("up");
                }
            }

            if(newLeft == '100px'){
                if($(".transparent-mask").length == 0){
                    $("body").append("<div class='transparent-mask'></div>");
                    $(".swipe-list-group li > .prize-list.open").next().next().addClass("up");
                }
            }

            $(e.currentTarget).animate({left: newLeft}, 200);
            enableScroll();
        });

        $(document).on("touchstart", ".transparent-mask", function () {
            let objDOM = $(".swipe-list-group li > .prize-list.open");
            let objFatherDOM = objDOM.parents(".swipe-list");
            objFatherDOM.find(".delete-btn").removeClass("up");
            objFatherDOM.find(".top-btn").removeClass("up");
            objDOM.removeClass('open').animate({left: '0px'}, 200);
            $(this).remove();
        });
    },
    StorageData (keyName, data) {
        // 向本地localStorage存储数据
        // 存储分以下几类:
        // 1.字符串 直接存就行 不需要调用此方法 不考虑
        // 2.[1,2,3] 数组 转成字符串存储
        // 3.{a: 1} JSON转一下存储
        // 4.[{a: 1}, {b: 2}] 复杂存储 大量处理
        // 统一输出格式: "4^^^data" ^^^是特殊标记 前面数字代表类型 后面代表真正数据\
        // 数据多了再补
        if(!data) return;
        let type = 0;
        let marker = "^^^";
        let dataString = "";

        switch (data.constructor) {
            case Array:
                // 数组 2 4
                if(data.length == 0 || typeof data[0] == ("string" || "number")){
                    // [] [1,2,3] ["1", "2"]
                    type = 2;
                } else if(typeof data[0] == "object"){
                    // [{},{}]
                    type = 4;
                }
                break;
            case Object:
                // {}
                type = 3;
                break;
        }

        if(type == 2){
            dataString = data.toString();
        } else if (type == 3) {
            dataString = JSON.stringify(data);
        } else if (type == 4) {
            // 将每个object转成字符串
            let stringArray = [];
            for(let i of data){
                stringArray.push(JSON.stringify(i));
            }
            dataString = stringArray.join(",,");
        }

        dataString = type + marker + dataString;
        localStorage.setItem(keyName, dataString);
    },
    ResolveStorageData (keyName) {
        // 解析本地存储的数据
        // 规则如上
        if(!keyName) return;
        let marker = "^^^";
        let originalData = localStorage.getItem(keyName);
        let data;

        if(originalData == undefined || originalData == "" || originalData == null){
            return "";
        }

        let [type, stringData] = originalData.split(marker);

        if(type == 2){
            data = stringData.split(",");
        } else if (type == 3) {
            data = JSON.parse(stringData);
        } else if (type == 4) {
            let temp = stringData.split(",,");
            data = [];
            for(let i of temp){
                data.push(JSON.parse(i));
            }
        }

        return data;
    }
};

// 禁止冒泡
function preventDefault(e) {
    e.preventDefault();
}
// 停止滑动
function disableScroll() {
    $(document).on('touchmove', preventDefault);
}
// 不能滑动
function enableScroll() {
    $(document).unbind('touchmove', preventDefault)
}

export default Tools;