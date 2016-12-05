(function ($) {
    $.getUrlParam = function (name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //console.log(window.location);
        var r = window.location.search.substr(1).match(reg);
        //console.log('r:'+r);
        if (r != null)
            return (r[2]);
        return null;
    }
})(jQuery);

$(document).ready(function() {
    // 基于准备好的dom，初始化echarts图表
    myChart1 = echarts.init(document.getElementById('tb1'),'macarons');
    myChart2 = echarts.init(document.getElementById('tb2'),'macarons');
    myChart3 = echarts.init(document.getElementById('tb3'),'macarons');
    myChart4 = echarts.init(document.getElementById('tb4'),'macarons');


    $(".btns").click(function(){
        setOp(this,$(this).attr('opval'));
    });

    $("#form1 select,#form2 select,#form3 select,#form4 select").change(function(){
        var $type=$(this).closest("form").attr("data-style");
        var $this=$(this);
        if($(this).attr("name")==="a"){
            //console.log(2);
            $this=$this.closest(".form_type").siblings(".form_time");
        }else{
            //console.log(1);
            $this=$this.closest(".form_time");
        }
        //console.log($this);
		//console.log($this+'&&&'+$type);
        setOp($this,$type);
		
    });



    getSelect('scatid','clh','all','');
    getSelect('scatid5','clh','all','');
    getSelect('scatid6','clh','all','');
    getSelect('catid1','gj_m_output','','');
    getSelect('catid2','','','');

	//
	var pinpai_name = decodeURI($.getUrlParam('pinpai'));
    console.log(pinpai_name === "null");
    if(pinpai_name!=="null"){

		setTimeout(function(){

			var chexing_name=decodeURI($.getUrlParam('chexing'));
			console.log(pinpai_name+'__'+chexing_name);
			$('#scatid').val(pinpai_name);
			$('#scatid').trigger('changed.selected.amui');		
			setTimeout(function(){
				$('#stcatid').val(chexing_name);
				$('#stcatid').trigger('changed.selected.amui');				
			},100);
		},110);		
	}else{
		setOp();
        inittable();
	}


	
});

function inittable(){
    var $table1=$('#catid2');
    var $table2=$('#scatid2');
    var $table3=$('#stcatid2');
    var $btn=$table3.closest("label").siblings("input.am-btn");
    function init(){
        $table1.val("乘用车");
        $table1.trigger('changed.selected.amui');
        setTimeout(function(){
            init2();
        },100);
    }
    function init2(){
        $table2.val("宝马(BMW)牌");
        $table2.trigger('changed.selected.amui');
        setTimeout(function(){
            init3();
        },100);

    }
    function init3(){
        $table3.val("BMW7201AMHEV(BMW530Le)");
        $table3.trigger('changed.selected.amui');
        setTimeout(function(){
            $btn.click();
        },100);

    }
    setTimeout(function(){
        init();
    },100);
}
	 
function setOp(obj,op){
    //console.log(op);
    var timestamp=new Date().getTime();
    pars ="time="+timestamp;

    if(typeof(op)=="undefined")
        var op=0;
    if(!(op==1 || op==2 || op==3 || op==4 || op==5)){
		//console.log(1);
        jQuery.getJSON("http://www.d1ev.com/Contents/Industry/user_hysj",pars,function(data){
			data.option1.optionToContent = new Function("opt", data.option1.optionToContent);
			data.option2.optionToContent = new Function("opt", data.option2.optionToContent);
			data.option3.optionToContent = new Function("opt", data.option3.optionToContent);
			data.option4.optionToContent = new Function("opt", data.option4.optionToContent);
			//console.log(data.option1);
            option1=data.option1;
            option2=data.option2;
            option3=data.option3;
            option4=data.option4;
            // 为echarts对象加载数据
            myChart1.setOption(option1);
            myChart2.setOption(option2);
            myChart3.setOption(option3);
            myChart4.setOption(option4);
        });
    }else if(op!=5){
        pars += "&year_f="+$(obj).find("select").eq(0).val();
        pars += "&month_f="+$(obj).find("select").eq(1).val();
        pars += "&year_l="+$(obj).find("select").eq(2).val();
        pars += "&month_l="+$(obj).find("select").eq(3).val();
        pars += "&op="+op;
        pars += "&ss="+"";
        pars += "&b="+"";
        pars += "&mm"+"";
        switch(op){
            case '1':{
                jQuery.getJSON("http://www.d1ev.com/Contents/Industry/user_hysj",pars,function(data){
                    data.option1.optionToContent = new Function("opt", data.option1.optionToContent);
					option1=data.option1;
                    myChart1.clear();
                    myChart1.setOption(option1);
                });
                break;
            }
            case '2':{
                jQuery.getJSON("http://www.d1ev.com/Contents/Industry/user_hysj",pars,function(data){
                    data.option2.optionToContent = new Function("opt", data.option2.optionToContent);
					option2=data.option2;
                    myChart2.clear();
                    myChart2.setOption(option2);
                });
                break;
            }
            case '3':{
                pars += "&ss="+encodeURI($('#form'+op+'_sbm select')[0].value);
                pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
                pars += "&mm="+encodeURI($('#form'+op+'_sbm select')[2].value);
                jQuery.getJSON("http://www.d1ev.com/Contents/Industry/user_hysj",pars,function(data){
                    data.option3.optionToContent = new Function("opt", data.option3.optionToContent);
					option3=data.option3;
                    myChart3.clear();
                    myChart3.setOption(option3);
                });
                break;
            }
            case '4':{
                pars += "&ss="+encodeURI($('#form'+op+'_sbm select')[0].value);
                pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
                pars += "&mm="+encodeURI($('#form'+op+'_sbm select')[2].value);
                jQuery.getJSON("http://www.d1ev.com/Contents/Industry/user_hysj",pars,function(data){
                    data.option4.optionToContent = new Function("opt", data.option4.optionToContent);
					option4=data.option4;
                    myChart4.clear();
                    myChart4.setOption(option4);
                });
                break;
            }
            default:
                break;
        }
    }else{//op=5
		//console.log(op);
        if($('#form'+op+'_sbm select')[2].value=="all"||$('#form'+op+'_sbm select')[2].value==""){
            ws.ws_alert($('.ws_alert'),"请选择 种类/品牌/车型",2000);
            setOption5('');
            return false;
        }
        pars += "&ss="+encodeURI($('#form'+op+'_sbm select')[0].value);
        pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
        pars += "&mm="+encodeURI($('#form'+op+'_sbm select')[2].value);
        pars += "&op="+op;
        jQuery.getJSON("http://www.d1ev.com/Contents/Industry/user_hysj",pars,function(data){
            option5=data.option5;
            setOption5(option5);
        });
    }
    //
    //console.log('form'+op);
    //console.log(pars);
}
function setOp_r(obj0,pn){			//Array('0','2')
    obj=$.extend({},obj0);
    obj.legend=$.extend({},obj0.legend);
    var op_l_d = new Array();
    var op_s_d = new Array();
    for(var i=0;i<pn.length;i++){
        op_l_d.push(obj.legend.data[pn[i]]);
        op_s_d.push(obj.series[pn[i]]);
    }
    obj.legend.data=op_l_d;
    obj.series=op_s_d;
    return $.extend({},obj);
}
// function setOp_r(obj0,pn){
//     var obj2=$.extend({},obj0);
//     for(var i=0;i<pn.length;i++){
//         if(pn[i]==="a"){
//             obj2.legend.data[i]="";
//             obj2.series[i].name="";
//             for(var j=0;j<obj2.series[i].data.length;j++){
//                 obj2.series[i].data[j]="";
//             }
//         }
//
//     }
//     return obj2;
// }
function setOption5(data){
    if(data){
        for(var k in data){
            $("#table5 tr [name="+k+"]").html(data[k]);
        }
    }else{
        $("#table5 .table5_data").html("-");
    }
}

function getSelect(ob,f,s,b){
    //console.log(b);
    ob ="#"+ob;
    var url = 'http://www.d1ev.com/Contents/Industry/car_models';
    var tt = new Date().getTime();
    var pars = 'tt=' + tt + '&f=' + encodeURI(f);
    if(typeof(s)!='undefined')
        pars += '&ss='+ encodeURI(s);
    if(typeof(s)!='undefined' && typeof(b)!='undefined')
        pars += '&b='+ encodeURI(b);

    //
    //console.log(pars);

    jQuery.getJSON(url,pars,function(data){
        showResponse(data);
    });
    function showResponse(originalRequest)
    {
        var MyMe =originalRequest.result;
        $(ob).empty();
        $(ob).append("<option value='all'>请选择</option>");
        for(var k in MyMe)
        {
            if ((MyMe[k] == '' || MyMe[k] == '') && MyMe[k] != '') {
                $(ob).append("<option selected value='"+MyMe[k]+"'>"+MyMe[k]+"</option>");
            } else {
                if (MyMe[k] != '') {
                    $(ob).append("<option value='"+MyMe[k]+"'>"+MyMe[k]+"</option>");
                }
            }
        }
    }
}
function resetOP(obj,from,option,arr){
    $(obj).parent().parent().find('.dft').addClass("cur").siblings().removeClass("cur");
    $(obj).addClass("cur").siblings().removeClass("cur");
    from.clear();
    from.setOption(setOp_r(option,arr));
}
function setdata_ffy(obj0){
    var obj=$.extend({},obj0);
    // obj=JSON.parse(JSON.stringify(obj0));
    obj.title.text = obj.title.text_ffy;
    obj.xAxis[0].data = obj.xAxis[0].data_ffy;
    obj.series = obj.series_ffy;
    return obj;
}
function b_hide(obj,hos){
    // if(hos==1){
    //     $(obj).parent().next().slideDown();
    //     $(obj).parent().next().next().slideDown();
    // }else{
    //     $(obj).parent().next().slideUp();
    //     $(obj).parent().next().next().slideUp();
    // }
}
// 发布机构切换

$(".sx .sx_con").css("display","none").eq(0).css("display","block");
$(".hysj_tit a").click(function(){
    var $index=$(this).index()-1;
    //console.log($index);
    $(this).addClass("cur").siblings().removeClass("cur");
    $('.sx .sx_con').eq($index).css("display","block").siblings().css("display","none");
});

// // 弹窗
// $(".hysj .sx").on("click",".table_button",function(){
//     $("#modal2").toggle(500);
// });
// $(".hysj .gjsj").on("click",".table_button",function(){
//     $("#modal1").toggle(500);
// });

//固定定位
$(function(){
    var arr=[];
    arr[0]=$('#hysj').offset().top;
    arr[1]=$('#gjsj').offset().top;
    arr[2]=$('#table').offset().top;
    $('#collapse-head').find('a').click(function(){
        var h=arr[$(this).index()];
        //alert(arr[$(this).index()]);
        $('html,body').animate({scrollTop:arr[$(this).index()]},500);
    });
    $(window).scroll(function(){
        var scroH = $(this).scrollTop();
        //console.log('scroH'+':'+scroH+'-'+arr);
        if(scroH>=arr[2]){
            set_cur(2);
        }else if(scroH>=arr[1]){
            set_cur(1);
        }else if(scroH>arr[0]){
            set_cur(0);
        }
    });
    function set_cur(n){
        if($("#collapse-head a").hasClass("active")){
            $("#collapse-head a").removeClass("active");
        }
        $("#collapse-head a").eq(n).addClass("active");

    }
});
// 排行切换
$("#modal222").on("change",".select--wrapped select",function(){
    var $value=$(this).val();
    var $content=$("#modal222 .am-tabs");
    if($value==="全国乘用车市场信息联席会数据排行"){
        $content.eq(0).show(500).siblings(".am-tabs").hide(500);
    }else if($value==="工信部数据排行"){
        $content.eq(1).show(500).siblings(".am-tabs").hide(500);
    }else if($value==="中国汽车工业协会的数据排行"){
        $content.eq(2).show(500).siblings(".am-tabs").hide(500);
    }
});
window.onload = function () {
    Ps.initialize(document.querySelector('#modal111 .am-tabs-bd'));
};
window.onload = function () {
    Ps.initialize(document.querySelector('#modal222 .am-tabs-bd'));
};

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




