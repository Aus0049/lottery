/**
 * Created by Aus on 17/2/6.
 */
const Tools = {
    SwipeListWatcher () {
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
                $("body").append("<div class='transparent-mask'></div>");
                $(".swipe-list-group li > .face.open").next().addClass("up");
            }

            $(e.currentTarget).animate({left: newLeft}, 200);
            enableScroll();
        });

        $(document).on("touchstart", ".transparent-mask", function () {
            $(".swipe-list-group li > .face.open").next().removeClass("up");
            $('.swipe-list-group li > .face.open').removeClass('open').animate({left: '0px'}, 200);
            $(this).remove();
        });
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