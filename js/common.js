setTimeout(function () {
    $(function () {
        $(document).scroll(function () {
            var top = $(document).scrollTop();
            if (top < 300) {
                $('.ws-fixed-scroll').hide();
            } else {
                $('.ws-fixed-scroll').show();
            }
        });
    });
}, 1000);
/**
 * Created by admin on 2016/9/8.
 */
function lazyload_img() {
    if (typeof $.fn.lazyload == 'function') {
        $('img[data-left-src]').lazyload({data_attribute: 'left-src'});
        $('img[data-src]').lazyload({data_attribute: 'src'});
        $('img[data-right-src]').lazyload({data_attribute: 'right-src'});
    }
}
$(function () {
    lazyload_img();
});
var ws = {
    name: 'wws',
    DIMAUB: '//www.d1ev.com/',
    JS_ROOT: 'statics/js/',
    addWheel: function (obj, fn) {
        function fnWheel(ev) {
            var oEvent = ev || event;
            var bDown = true;//true  向下   false   向上
            if (oEvent.wheelDelta) {
                //wheelDelta
                if (oEvent.wheelDelta > 0) {
                    bDown = false;
                } else {
                    bDown = true;
                }
            } else {
                //detail
                if (oEvent.detail < 0) {
                    bDown = false;
                } else {
                    bDown = true;
                }
            }
            fn && fn(bDown);
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        }
        if (window.navigator.userAgent.indexOf('Firefox') != -1) {
            //DOMMouseScroll
            obj.addEventListener('DOMMouseScroll', fnWheel, false);
        } else {
            //onmousewheel
            obj.onmousewheel = fnWheel;
        }
    },
    ws_alert: function (ele, str, time1) {
        var time = time1 || 2000;
        //alert弹窗 ie8 、9
        if (ele.length > 0) {
            if (window.navigator.userAgent.indexOf("MSIE 9.0") > 0 || window.navigator.userAgent.indexOf("MSIE 8.0") > 0) {
                console.log('ie89');
                ele.css({'margin-left': -ele.width() / 2, 'margin-top': -ele.height() / 2});
            }
        } else {
            ele.css({'margin-left': 0, 'margin-top': 0});
        }
        ele.show().html(str);
        setTimeout(function () {
            ele.hide();
        }, time);


    },
    time2ret: function (time, ele) {
        var ret = "";
        var nowd = new Date();
        var now = nowd.getTime();
        var delay = now - time;
        var t = new Date(time);
        var getHours = t.getHours();
        var getMinutes = t.getMinutes();
        if (delay > (10 * 24 * 60 * 60 * 1000)) {
            ret = tool.getYearsMonthDay(time, "yyyy-MM-dd hh:mm:ss");
        } else if (delay >= (24 * 60 * 60 * 1000)) {
            delay = (delay / (24 * 60 * 60 * 1000));
            var num = Math.floor(delay);

            ret = num + "天前";

        } else if (delay >= (60 * 60 * 1000)) {
            delay = (delay / (60 * 60 * 1000));
            ret = Math.floor(delay) + "小时前";
        } else if (delay >= (60 * 1000)) {
            delay = (delay / (60 * 1000));
            ret = Math.floor(delay) + "分钟前";
        } else {
            ret = "刚刚";
        }

        ele && $(ele).attr('data-time3', ret);
        return ret;


    }
};
$(function () {
    //点击闹铃
    $(document).on('click', '.ws-nav-alarm .icon-tixing', function () {
        window.location.href = '//www.d1ev.com/member/message/MyCount';
    });
    //点击邮件
    $(document).on('click', '.ws-nav-info .icon-youjian', function () {
        //window.location.href = window.location.href;

        window.location.href = '//www.d1ev.com/member/message/MyCount#2';
        removePlace && removePlace();

    });
});
$(function () {
    //热文榜
    $('.ws-hotdoc-tabhDiv').click(function () {
        $('.ws-hotdoc-tabhDiv').removeClass('ws-active').eq($(this).index()).addClass('ws-active');
        $('.ws-hotdoc-tabc .ws-hotdoc-tabcon').hide().eq($(this).index()).show();

    });
});

$(function () {
    //搜索
    $('.ws-nav-searchIcon').click(function () {
        $('.ws-searchboxBg').show();

    });
    $('.ws-searchbox-close').click(function () {
        $('.ws-searchboxBg').hide();
    });

    $('.search-all-form-q').keydown(function (e) {
        //console.log(e);
        if (e.keyCode === 13) {
            var _keywords = $(this).parent('.search-all-form').children('.search-all-form-q');
            if (!_keywords.val()) {
                return false;
            }
            $(this).parent('.search-all-form').submit();
        }
    });
    $('.search-all-form-submit').click(function () {
        var _keywords = $(this).parent('.search-all-form').children('.search-all-form-q');
        //console.log(_keywords);
        if (!_keywords.val()) {
            return false;
        }
        $(this).parent('.search-all-form').submit();
    });

    $('.ws-searchbox-historyH2').click(function () {
        $.ajax({
            url: '//www.d1ev.com/contents/index/clearsearch',
            type: 'post',
            success: function (data) {
                console.log(data);
                if ($.trim(data) == 1) {
                    console.log('cg');
                    $('.ws-searchbox-historyC').html('');
                }
            }
        });
    });

    //登录与注册
    var timer = null;
    $(document).on('mouseover', '.ws-nav-headmap', function () {
        clearTimeout(timer);
        $('.ws-nav-users').show();
        $('.ws-nav-users').addClass('ws-nav-usersAnimate');
    });
    $(document).on('mouseout', '.ws-nav-headmap', function () {
        timer = setTimeout(function () {
            $('.ws-nav-users').hide();
            $('.ws-nav-users').removeClass('ws-nav-usersAnimate');
        }, 200);
    });
    $(document).on('mouseover', '.ws-nav-users', function () {
        clearTimeout(timer);
        //$('.ws-nav-users').show();
    });
    $(document).on('mouseout', '.ws-nav-users', function () {
        timer = setTimeout(function () {
            $('.ws-nav-users').hide();
            $('.ws-nav-users').removeClass('ws-nav-usersAnimate');
        }, 200);
    });

});

$(function () {
    //首页导航部分

    $(".ws-fix-head").headroom({
        tolerance: 5,
        offset: 205,
        classes: {
            initial: "animated",
            pinned: "fadeInDown",
            unpinned: "fadeOutUp"
        }
    });
});

$(function () {
    //意见反馈
    $("#tijiao").on("click", function () {
        if (!$('#tijiaocontent').val() || !$('#yourcall').val()) {
            $('.tijiao .tip').text('请输入反馈建议和联系方式后再提交');
            return false;
        } else {
            $('.tijiao .tip').text('');
        }
    });
});

