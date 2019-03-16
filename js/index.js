/**
 * Created by lenovo on 2019/3/13.
 */
window.onload=function(){
    search()
    timeBack()
    bannerEffect()
}
//头部实现
//获取banner的高度
function search(){
    var banner=document.querySelector('.jd_banner');
    var bannerHeight=banner.offsetHeight;
//获取search的高度
    var search=document.querySelector('.jd_search');
//    获取当屏幕滚动时，banner滚出屏幕的距离
    window.onscroll=function(){
        var offsetTop=document.documentElement.scrollTop;
        //设置初始透明度
        var opacity=0;
        //   判断banner是否完全滚出屏幕，并计算透明度
        if(offsetTop<bannerHeight){
            opacity=offsetTop/bannerHeight;
            //设置search的样式
            //search.style.backgroundColor='rgba(233,35,34,'+opacity+')';

            search.style.backgroundColor=`rgba(233,35,34,${opacity})`;
        }
    }
}

//倒计时
function timeBack(){
    //    获取span
    var spans=document.querySelector('.jd_sk_time').querySelectorAll('span');
//    设置初始时间
    var totalTime=3700;
//   开启定时器
    var timerId= setInterval(function(){
        totalTime--;
        // 判断倒计时是否完毕
        if(totalTime<0){
            //倒计时完毕清除定时器
            clearInterval(timerId);
            return;
        }
        //获取时
        var hour=Math.floor(totalTime/3600);
        //获取分
        var minute=Math.floor(totalTime%3600/60);
        //获取秒
        var second=Math.floor(totalTime%60);
        //将时间填充到span中
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);

        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);

        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);


    },1000)

}


//轮播图
function bannerEffect() {
    //获取轮播图结构
    var banner = document.querySelector('.jd_banner');
    //获取轮播图中的图片容器
    var imgBox = banner.querySelector('ul:first-of-type');
    //获取第一张图片
    var first = imgBox.querySelector('li:first-of-type');
    //获取最后一张图片
    var last=imgBox.querySelector('li:last-of-type');
    //把图片添加到图片容器中
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);



    //获取所有的li 元素
    var lis=imgBox.querySelectorAll('li');
    //获取li 元素的数量
    var count=lis.length;
    // 获取banner的宽度
    bannerWidth=banner.offsetWidth;
//    获取图片盒子的宽度
    imgBox.style.width=count*bannerWidth+'px';
//设置每一个li 元素的宽度
    for(var i=0;i<count;i++){
        lis[i].style.width=bannerWidth+'px';
    }
//    定义图片索引
    var index=1;
//    设置默认的偏移值
    imgBox.style.left=-bannerWidth+'px';

    //当屏幕变化时重新进行宽度的计算
    window.onresize=function(){
        // 获取banner的宽度
        var bannerWidth=banner.offsetWidth;
//    获取图片盒子的宽度
        imgBox.style.width=count*bannerWidth+'px';
//上设置每一个li 元素的宽度
        for(var i=0;i<count;i++){
            lis[i].style.width=bannerWidth+'px';
        }
        //重新定位值
        imgBox.style.left=-index*bannerWidth+'px';
    }
//    设置点标记
    function dot(index){
        //var banner=document.querySelector('.jd_banner');
        var lis=banner.querySelector('ul:last-of-type').querySelectorAll('li');
    //    清除其他li元素的样式
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove('active');
        }
    //    为当前li元素添加样式
        lis[index-1].classList.add('active');
    }
//    实现自动轮播
    var timer;
    function startTime(){
         timer=setInterval(function(){
            index++;
            //设置过渡效果
            imgBox.style.transition='left 0.5 ease-in-out';
            //设置偏移值
            imgBox.style.left=(-index*bannerWidth)+'px';
            //    判断是否是最后一张
            setTimeout(function(){
                if(index==count-1){
                    index=1;
                    imgBox.style.transition='none';
                    //偏移值为
                    imgBox.style.left=(-index*bannerWidth)+'px';
                }
            },500)
        },2000)
    }
    startTime()
//    实现手动轮播
//    标记当前效果是否已经执行完毕
    var isEnd=true;
//    触摸图片开始事件
    imgBox.addEventListener('touchstart',function(e){
    //    为了可以点住，要清除上面的定时器
        clearInterval(timer);
    //   获取当前手指的位置
        startX=e.targetTouches[0].clientX;
    })
//    触摸图片滑动事件
    imgBox.addEventListener('touchmove',function(e){
        if(isEnd==true){
            //    获取当前手指滑动的位置
            moveX = e.targetTouches[0].clientX;
            //  获取位置的偏移值
            distanceX = moveX - startX;
            //为了保证正常的效果，将之前的过渡样式清除
            imgBox.style.transition = 'none';
            //滑动的距离，在当前位置的基础上偏移
            imgBox.style.left = (-index * bannerWidth + distanceX) + 'px';
        }


    })
//    触摸图片结束事件
    imgBox.addEventListener('touchend',function(){
       // 松开手指，标记当前过渡正在执行
        isEnd=false;
       //判断滑动的距离是否超出100px 的范围
        if(Math.abs(distanceX)>100){
        // 判断滑动图片的方向
            if(distanceX>0){
                index--;//从左往右滑
            }else{
                index++;//从右往左滑
            }
        //    实现翻页效果
            imgBox.style.transition='left 0.5s ease-in-out';
            imgBox.style.left=-index*bannerWidth+'px';
        }
        //保证用户滑动过，再进行回弹
        else  if(Math.abs(distanceX)>0){
            imgBox.style.transition='left 0.5s ease-in-out';
            imgBox.style.left=-index*bannerWidth+'px';
        }
        //重置上次move 所产生的数据
        startX=0;
        moveX=0;
        distanceX=0;
    })
//    webkittransitionend可以监听当前元素效果执行完毕
    imgBox.addEventListener('webkitTransitionEnd',function(){
    //    当图片到最后一张(count-1)时，让它回到索引1
    //    当图片到第一张(0)时，让它到count-2
        if(index==count-1){
            index=1;
        // 清除过渡效果
            imgBox.style.transition='none';
        //设置偏移值
            imgBox.style.left=-index*bannerWidth+'px';
        }else if(index==0){
            index=count-2;
            // 清除过渡效果
            imgBox.style.transition='none';
            //设置偏移值
            imgBox.style.left=-index*bannerWidth+'px';
        }
        dot(index)
        setTimeout(function(){
            isEnd=true;
        //    清除定时器
            clearInterval(timer);
        //    开启定时器
            startTime();

        },100)
    })

}


