$(document).ready(function() {
    // 基于准备好的dom，初始化echarts图表
    myChart1 = echarts.init(document.getElementById('tb1'),'macarons');
    myChart2 = echarts.init(document.getElementById('tb2'),'macarons');
    myChart3 = echarts.init(document.getElementById('tb3'),'macarons');
    myChart4 = echarts.init(document.getElementById('tb4'),'macarons');

    setOp();
    $(".btns").click(function(){
        setOp(this,$(this).attr('opval'));
    });

    getSelect('scatid','clh','all','');
    getSelect('scatid5','clh','all','');
    getSelect('scatid6','clh','all','');
    getSelect('catid1','gj_m_output','','');
    getSelect('catid2','','','');

});

function setOp(obj,op){
    var timestamp=new Date().getTime();
    pars ="time="+timestamp;

    if(typeof(op)=="undefined")
        var op=0;

    if(op!=1 && op!=2 && op!=3 && op!=4 && op!=5){
        jQuery.getJSON("http://d1ev.com/user_hysj.php",pars,function(data){
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
        pars += "&year_f="+$(obj).prevAll().eq(3).find("select").val();
        pars += "&month_f="+$(obj).prevAll().eq(2).find("select").val();
        pars += "&year_l="+$(obj).prevAll().eq(1).find("select").val();
        pars += "&month_l="+$(obj).prevAll().eq(0).find("select").val();
        pars += "&op="+op;
        switch(op){
            case '1':{
                pars += "&s="+encodeURI($('#form'+op+'_sbm select')[0].value);
                pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
                pars += "&m="+encodeURI($('#form'+op+'_sbm select')[2].value);
                jQuery.getJSON("http://d1ev.com/user_hysj.php",pars,function(data){
                    option1=data.option1;
                    myChart1.clear();
                    myChart1.setOption(option1);
                });
                break;
            }
            case '2':{
                pars += "&s="+encodeURI($('#form'+op+'_sbm select')[0].value);
                pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
                pars += "&m="+encodeURI($('#form'+op+'_sbm select')[2].value);
                jQuery.getJSON("http://d1ev.com/user_hysj.php",pars,function(data){
                    option2=data.option2;
                    myChart2.clear();
                    myChart2.setOption(option2);
                });
                break;
            }
            case '3':{
                pars += "&s="+encodeURI($('#form'+op+'_sbm select')[0].value);
                pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
                pars += "&m="+encodeURI($('#form'+op+'_sbm select')[2].value);
                jQuery.getJSON("http://d1ev.com/user_hysj.php",pars,function(data){
                    option3=data.option3;
                    myChart3.clear();
                    myChart3.setOption(option3);
                });
                break;
            }
            case '4':{
                pars += "&s="+encodeURI($('#form'+op+'_sbm select')[0].value);
                pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
                pars += "&m="+encodeURI($('#form'+op+'_sbm select')[2].value);
                jQuery.getJSON("http://d1ev.com/user_hysj.php",pars,function(data){
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
        if($('#form'+op+'_sbm select')[2].value==""){
            setOption5('');
            return false;
        }
        pars += "&s="+encodeURI($('#form'+op+'_sbm select')[0].value);
        pars += "&b="+encodeURI($('#form'+op+'_sbm select')[1].value);
        pars += "&m="+encodeURI($('#form'+op+'_sbm select')[2].value);
        pars += "&op="+op;
        jQuery.getJSON("http://d1ev.com/user_hysj.php",pars,function(data){
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
    var url = 'http://d1ev.com/car_models.php';
    var tt = new Date().getTime();
    var pars = 'tt=' + tt + '&f=' + encodeURI(f);
    if(typeof(s)!='undefined')
        pars += '&s='+ encodeURI(s);
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
        $(ob).append("<option value=''>请选择</option>");
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
    obj=JSON.parse(JSON.stringify(obj0));
    obj.title.text = obj.title.text_ffy;
    obj.xAxis[0].data = obj.xAxis[0].data_ffy;
    obj.series = obj.series_ffy;
    return $.extend({},obj);
}
function b_hide(obj,hos){
    if(hos==1){
        $(obj).parent().next().slideDown();
        $(obj).parent().next().next().slideDown();
    }else{
        $(obj).parent().next().slideUp();
        $(obj).parent().next().next().slideUp();
    }
}
// 发布机构切换

$(".sx .sx_con").css("display","none").eq(0).css("display","block");
$(".hysj_tit a").click(function(){
    var $index=$(this).index()-1;
    //console.log($index);
    $(this).addClass("cur").siblings().removeClass("cur");
    $('.sx .sx_con').eq($index).css("display","block").siblings().css("display","none");
});

// 弹窗
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
    $('.fixLeft li').click(function(){
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
        if($(".fixLeft li").hasClass("active")){
            $(".fixLeft li").removeClass("active");
        }
        $(".fixLeft li").eq(n).addClass("active");

    }
});
// 排行切换
$("#modal2").on("change",".select--wrapped select",function(){
    var $value=$(this).val();
    var $content=$("#modal2 .am-tabs");
    if($value==="全国乘用车市场信息联席会数据排行"){
        $content.eq(0).show(500).siblings(".am-tabs").hide(500);
    }else if($value==="工信部数据排行"){
        $content.eq(1).show(500).siblings(".am-tabs").hide(500);
    }else if($value==="中国汽车工业协会的数据排行"){
        $content.eq(2).show(500).siblings(".am-tabs").hide(500);
    }
});
window.onload = function () {
    Ps.initialize(document.querySelector('#modal1 .am-tabs-bd'));
};
window.onload = function () {
    Ps.initialize(document.querySelector('#modal2 .am-tabs-bd'));
};
