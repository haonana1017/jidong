/**
 * Created by lenovo on 2019/3/14.
 */
$(function() {
//    获取轮播图元素
    var banner = $('.jd_banner');
    //获取轮播图区域的宽度
    var bannerWidth = banner.width();
// 获取图片盒子
    var imgBox = banner.find('ul:first-of-type');
// 获取点标记
    var dot = banner.find('ul:eq(1)').find('li');
//获取首尾图片
    var first = imgBox.find('li:first-of-type');
    var last = imgBox.find('li:last-of-type');
// 给首尾添加两张图片
    imgBox.append(first.clone());
    last.clone().insertBefore(first);

//  找到所有的li
    var lis = imgBox.find('li');
    var count = lis.length;
    // 设置图片盒子的宽度
    imgBox.width(count * bannerWidth);
//    设置li标签的宽度
//    遍历所有的li
    lis.each(function (index, value) {
        $(lis[index]).width(bannerWidth);
    })
//  设置默认的偏移值
    imgBox.css('left', -bannerWidth);


//  封装函数
    var imgAnimate=function(){
        imgBox.animate(
            {'left': -index * bannerWidth},
            200,
            'ease-in-out',
            function () {
                if (index == count - 1) {
                    index = 1;
                    //设置偏移值
                    imgBox.css('left', -index * bannerWidth);
                } else if (index == 0) {
                    index = count - 2;
                    imgBox.css('left', -index * bannerWidth);
                }
                //    设置点标记
                //    清除所有的active类，给当前元素对应的点标记添加active类
                dot.removeClass('active').eq(index - 1).addClass('active');
            }
        )
    }

//  定义图片的索引
    index = 1;
//  开启定时器
  var timer= setInterval(function () {
        index++;
        // 引用animate动画完成自动轮播效果
        //  1.动画样式
        //  2.动画耗时
        //  3.动画速度函数
        //  4.动画的回调函数
        imgAnimate()

    }, 1000)
    //实现手动滑动
    //左滑动
    imgBox.on('swipeleft',function(){
        //清除定时器
        clearInterval(timer);
        index++;
        imgAnimate();
    })
    imgBox.on('swiperight',function(){
        //清除定时器
        clearInterval(timer);
        index--;
        imgAnimate();
    })
})


