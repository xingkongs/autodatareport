// 二级导航tab切换
$("#nav").on("click","p.header--type a",function(){
    var $index=$(this).index();
    console.log($index);
    $(this).addClass("active").siblings().removeClass("active");
    var $content=$("#nav").find(".header--content");
    $content.eq($index).show().siblings(".header--content").hide();
    var $content2=$("#content").find(".card--wrapped");
    $content2.eq($index).show().siblings(".card--wrapped").hide();
});
// 报告
function modal(thisone){

    var $select=$(thisone).attr("data-select");
    var $type=$(thisone).attr("data-content");
    var $head=$("#modal--head");
    var $modaltype=$("#modal--type");
    $head.text($type);$modaltype.text($type);$modaltype.attr('value',$type);
    if($select==="a"){
        $("#doc-modal-14").modal({closeViaDimmer: 0, width: 590, height: 401});
    }else if($select==="b"){
        $("#doc-modal-13").modal({closeViaDimmer: 0, width: 590, height: 485});
    }

}
(function ($) {
    if ($.AMUI && $.AMUI.validator) {
        // 增加多个正则
        $.AMUI.validator.patterns = $.extend($.AMUI.validator.patterns, {
            colorHex: /^(#([a-fA-F0-9]{6}|[a-fA-F0-9]{3}))?$/
        });
        // 增加单个正则
        $.AMUI.validator.patterns.yourpattern = /^your$/;
        // 增加单个正则
        $.AMUI.validator.patterns.mobile = /^1((3|5|8){1}\d{1}|70)\d{8}$/;
    }
})(window.jQuery);