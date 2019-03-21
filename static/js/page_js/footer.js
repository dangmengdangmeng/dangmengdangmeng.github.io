$("#footer")
  .html(`<div class="weui-tab tab-bottom " style="height:44px;"><div class="weui-tabbar">
<a href="javascript:;" class="weui-tabbar__item">
    <img class='weui-tabbar__icon tabbar_img' src='./images/1_35.png'/>
  <p class="weui-tabbar__label">工作台</p>
</a>
<a href="javascript:;" class="weui-tabbar__item">
<img class='weui-tabbar__icon tabbar_img' src='./images/1_37.png'/>
  <p class="weui-tabbar__label">渠道</p>
</a>
<a href="javascript:;" class="weui-tabbar__item">
<img class='weui-tabbar__icon tabbar_img' src='./images/1_39.png'/>
  <p class="weui-tabbar__label">活动</p>
</a>
<a href="javascript:;" class="weui-tabbar__item ">
<img class='weui-tabbar__icon tabbar_img' src='./images/1_42.png'/>
  <p class="weui-tabbar__label ">我的</p>
</a>
</div></div>`);

$(".weui-tab").tab({
  defaultIndex: 2,
  onToggle: function(index) {
    switch_tab(index)
  }
});
function switch_tab(idx){
  if(idx==3){
    window.location.href='./details.html'
  }else{ 
    var img_arr = ['2_13','1_37','1_39','1_42'],img_arr1=['1_35','2_15','1_40','3_19'];
    $(".tabbar_img").each(function (index) {
        $(this).attr('src','./images/'+img_arr[index]+'.png')
    });
    $(".tab_content").each(function () {
        $(this).removeClass('show').addClass('hide');
    });
    $(".tabbar_img").eq(idx).attr('src','./images/'+img_arr1[idx]+'.png')
    $('.tab_content'+idx).removeClass('hide').addClass('show');}
}