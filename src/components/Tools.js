/**
 * Created by Aus on 17/2/6.
 */
const Tools = {
    SwipeListWatcher () {
        let x; // 滑动初始点坐标
        let shouldSwipe = true; // 是否应该滑动的开关

        $(document).on("touchstart", ".swipe-list-group li > .face", function (e) {
            // 判断当前列表是否应该清滑动
            if($('.swipe-list-group li > .face.open').length > 0){
                // 列表中有打开的列表 应该关掉并结束
                shouldSwipe = false;
                $('.swipe-list-group li > .face.open').removeClass('open').animate({left: '0px'}, 200, function () {
                    shouldSwipe = true;
                });
            }
            // 记住该位置
            x = e.originalEvent.targetTouches[0].pageX; // anchor point
        });

        $(document).on("touchmove", ".swipe-list-group li > .face", function (e) {
            // 如果开关关闭则取消行动
            if(!shouldSwipe){
                return false;
            }

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
            if(!shouldSwipe){
                return false;
            }
            let left = Number.parseInt(e.currentTarget.style.left);
            let new_left;

            if (left < -35) {
                new_left = '-100px';
            }else {
                new_left = '0px';
            }

            $(e.currentTarget).animate({left: new_left}, 200);
            enableScroll();
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