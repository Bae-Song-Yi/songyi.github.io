$(document).ready(function () {
    //Common(Tab)
    $('.sub .subTab a').click(function(){
        $('.sub .subTab a').removeClass('on');
        $(this).addClass('on');
        return false;
    })
    //Common(Scroll Top)
    $('.scrollTop').click(function(){
        $('html, body').stop().animate({ scrollTop: 0 });
        return false;
    })
    $('.fixBtn .idim .close').click(function(){
        $('.idim').hide();
        return false;
    })
    //Common(Layer Popup)
    $('.layerPopWrap .closeBtn').click(function(){
        $(this).parents('.layerPopWrap').hide();
        return false;
    })
    //Common(이벤트 Popup)
    $('.eventPopWrap .closeBtn').click(function(){
        $(this).parents('.eventPopWrap').hide();
        return false;
    })
    //Common(오늘하루열지않기Pop)
    cookiedata = document.cookie;
    //시스템점검(Pop) 
    if (cookiedata.indexOf("ncookie=done") < 0) {
        $('.sysNotiLayerPop').css('display','block')
    }else {
        $('.sysNotiLayerPop').css('display', 'none')
    }
    //이벤트1(Pop) 
    if (cookiedata.indexOf("popncookie=done") < 0) {
        $('.eventLayerPop').css('display','block')
    }else {
        $('.eventLayerPop').css('display', 'none')
    }
    //이벤트2(Pop) 
    if (cookiedata.indexOf("popOtncookie=done") < 0) {
        $('.eventOtLayerPop').css('display','block')
    }else {
        $('.eventOtLayerPop').css('display', 'none')
    }
    //Common(Paging)
    $('.pagination li a.num').click(function(){
        $('.pagination li a.num').removeClass('on');
        $(this).addClass('on');
        return false;
    })
    //Common(MO GNB)
    $('header .moMenu').click(function(){
        $('.mobileGNB').animate({'right': 0});
        $('body').css('overflow', 'hidden');
        return false;
    })
    $('.mobileGNB .close').click(function(){
        $('.mobileGNB').animate({'right': '-100%'});
        $('body').css('overflow', 'auto');
        return false;
    })
    function mobileMenu() {
        var desktopMenuTags = $('nav').html();
        var appBtnHT = $('.mobileGNB .moMenuAppDown').height();
        $('header .mobileGNB .moMenuList').prepend(desktopMenuTags);
        $('.mobileGNB .moMenuList').css({'height': $(window).height() - appBtnHT, 'padding-bottom': appBtnHT});
    };
    mobileMenu();
    $(window).resize(function(){
        var appBtnHT = $('.mobileGNB .moMenuAppDown').height();
        $('.mobileGNB .moMenuList').css({'height': $(window).height() - appBtnHT, 'padding-bottom': appBtnHT});
    })
    //Common(Scroll)
    function scroll(){
        var tabHT = $('.fixTabWrap').height();
        var headerHT = $('header').height();
        var headerPos = $('header').offset().top;
        if($('div').hasClass('fixTabWrap') == true){
            var tabPos = $('.subTab').offset().top - $('header').height();
        }
        $(window).scroll(function(){
            var offsetBottom = $('.sub').offset().top + $('.sub').outerHeight();
            //Header Scroll Top
            if($(window).scrollTop() > headerPos){
                $('header').addClass('fix');
            }else{
                $('header').removeClass('fix');
            }
            //Scroll Top
            if($(window).scrollTop() > offsetBottom - $(window).height()){
                $('.fixBtn .scrollTop').fadeIn(300);/*bsy 1006 수정*/
                $('.fixBtn').addClass('removeFix');
            }else{
                $('.fixBtn .scrollTop').fadeOut(300);/*bsy 1006 수정*/
                $('.fixBtn').removeClass('removeFix');
            }
            //Tab
            if($(window).scrollTop() > tabPos){
                $('.fixTabWrap').addClass('fix');
                $('.sub h3.pageTitle').css('opacity','0');
                $('.sub').css('padding-top', tabHT + 120);
            }else{
                $('.fixTabWrap').removeClass('fix');
                $('.sub h3.pageTitle').css('opacity','1');
                $('.sub').css('padding-top', 0);
            }
        })
        
    }
    scroll();

    //Share Layer Popup
    function urlCopy(){
        var url = '';
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea)
        url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea)
    }
    $('.shareLayerPop a.urlCopy').click(function(){
       urlCopy();
        $('.shareLayerPop .copyTxt').show();
        setTimeout(function() { 
            $('.shareLayerPop .copyTxt').hide();
        }, 2000)
        return false;
    })
    //개인정보 처리방침
    $('.policy .dropBox .now').click(function(){
        $(this).next('ul').stop().toggleClass('on')
        $(this).next('ul').stop().slideToggle();
        return false;
    })
    $('.policy .dropBox ul').mouseleave(function(){
        $(this).stop().removeClass('on')
        $(this).stop().slideUp();
    })
    //이벤트 팝업 슬라이드
    var swiper = new Swiper(".eventLayerPop .slideWrap, .eventOtLayerPop .slideWrap", {
        slidesPerView: 1,
        speed: 1000,
        centeredSlides: true,
        mousewheel: false,
        loop: true,
        resistance: true,
        navigation: {
            nextEl: '.ctrl .next',
            prevEl: '.ctrl .prev',
        },
        pagination: {
            el: '.paging',
            type: 'fraction',
        },
    });
});
function setCookie( name, value, expiredays ){ 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
//시스템점검(Pop)
function todaycloseWin() {
    if ($('input.day_chk:checked').is(":checked")) {
        setCookie( "ncookie", "done" , 1 ); 
        $('.sysNotiLayerPop').css('display', 'none')
    } else {
        setCookie( "ncookie", "done" , 1 ); 
        $('.sysNotiLayerPop').css('display', 'none')
    }
}
//이벤트1(Pop)
function popTodaycloseWin() {
    if ($('input.day_chk:checked').is(":checked")) {
        setCookie( "popncookie", "done" , 1 ); 
        $('.eventLayerPop').css('display', 'none')
    } else {
        setCookie( "popncookie", "done" , 1 ); 
        $('.eventLayerPop').css('display', 'none')
    }
}
//이벤트2(Pop)
function popOtTodaycloseWin() {
    if ($('input.day_chk:checked').is(":checked")) {
        setCookie( "popOtncookie", "done" , 1 ); 
        $('.eventOtLayerPop').css('display', 'none')
    } else {
        setCookie( "popOtncookie", "done" , 1 ); 
        $('.eventOtLayerPop').css('display', 'none')
    }
}