/**
 * Created by lenovo on 2019/3/15.
 */
window.onload=function(){
//    获取左侧边框
var cleft=document.querySelector('.ct_left');
    //获取需要滑动的容器
    var ulBox=cleft.querySelector('ul:first-of-type');
// 实现上下滑动
    var startY=0;
    var moveY=0;
    var distanceY=0;
    var currentY=0;
    ulBox.addEventListener('touchstart',function(e){
         startY=e.targetTouches[0].clientY;
        console.log(14321423);
    })
    ulBox.addEventListener('touchmove',function(e){
         moveY=e.targetTouches[0].clientY;
    //    计算差值
         distanceY=moveY-startY;
    //    清除可能的过渡样式
        ulBox.style.transition='none';
    //  设置偏移值
        ulBox.style.top=(currentY+distanceY)+'px';

    })
    ulBox.addEventListener('touchend',function(e){
        //设置当前移动到的位置
        currentY+=distanceY;
    })
}