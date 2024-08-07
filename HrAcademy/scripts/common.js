$(document).ready(function () {
    //Header
    $('header nav ul > li').hover(function () {
        $('header').stop().animate({ 'height': '412px' });
        $(this).children('a').addClass('on');
    }, function () {
            $('header').stop().animate({ 'height': '152px' });
        $(this).children('a').removeClass('on');
    });
    $(document).on("click", "header.for_mobile nav ul > li > a", function () {
        if ($(this).hasClass('on')) {
            $('header.for_mobile nav ol').slideUp();
            $(this).next('ol').slideDown();
        } else {
            $(this).removeClass('on')
            $(this).next('ol').slideUp();
        }
        return false;
    });
    //Mobile Header(Search)
    $('header a.mo_search').click(function () {
        $('header .search').animate({ 'right': 0 });
        $('header .mo_srch_black_bg').fadeIn();
        return false;
    });
    $('header .search a.close').click(function () {
        $('header .search').animate({ 'right': '-100%' });
        $('header .mo_srch_black_bg').fadeOut();
        return false;
    });
    //Mobile Header(Nav)
    $('header a.mo_open').click(function () {
        $('.nav.mo').animate({ 'left': 0 });
        $('.mo_black_bg').fadeIn();
        return false;
    });
    $('.nav.mo .mo_close').click(function () {
        $('.nav.mo').animate({ 'left': '-100%' });
        $('.mo_black_bg').fadeOut();
        return false;
    });
    function navGNBhtml() {
        var navGNBtags = $('header nav').html();
        $('.nav.mo .menu').html(navGNBtags);
        $('.nav.mo .menu ul > li > a').attr('href','#');
    }
    navGNBhtml();
    $('.nav.mo .menu ul > li > a').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).next('ol').slideUp();
        } else {
            $('.nav.mo .menu ul > li > a').removeClass('on');
            $(this).addClass('on');
            $('.nav.mo .menu ol').slideUp();
            $(this).next('ol').slideDown();
        }
        return false;
    });
    //로그인/회원가입 Popup
    $('header .util a.memberPopOpen, .nav.mo .mo_util a.memberPopOpen').click(function () {
        $($(this).attr('href')).show();
        return false;
    });
    $('.loginPopup .close_pop , .joinPopup .close_pop').click(function () {
        $(this).parents('.login_pop').hide();
        return false;
    });
    //비밀번호찾기 Popup
    $('.loginPopup .option a.openpopup').click(function () {
        $('.findPasswordPopup').show();
        $('.loginPopup').hide();
        return false;
    });
    $('.findPasswordPopup .close_pop').click(function () {
        $('.findPasswordPopup').hide();
        $('.loginPopup').show();
        return false;
    });
    //약관 popup
    $('footer .bottom li a.infoPopup').click(function () {
        $($(this).attr('href')).show();
        return false;
    });
    //팝업닫기(공통)
    $('.layerPopup .close_pop').click(function () {
        $(this).parents('.layerPopup').hide();
        return false;
    });
    //Sub Top Banner
    $('.sub .topBanner .nowPage').click(function () {
        $(this).next('ul.for_mobile').slideToggle();
    });
    //Quick
    function quickFun() {
        var headerHT = $('header').outerHeight();
        var topVisualHT = $('.sub .topBanner').outerHeight();
        var windowWDhalf = $(window).width() / 2;
        var quickTopPos = headerHT + topVisualHT + 25;
        $('.quick').css('top', quickTopPos);
        $('.quick.Qleft').css('left', windowWDhalf - 770);
        $('.quick.Qright').css('right', windowWDhalf - 770);
    };
    quickFun();
    $(window).resize(function () {
        quickFun();
    });
    $(window).scroll(function () {
        if($('.container section').first().hasClass('topBanner')){
            var headerHT = $('header').outerHeight();
            var topVisualHT = $('.sub .topBanner').outerHeight();
            var quickPosHasTop = headerHT + topVisualHT;
            var contentPos = $('.sub .content').offset().top;
            if ($(document).scrollTop() > contentPos) {
                $('.quick').stop().animate({ "top": $(document).scrollTop() + 25 });
            }else{
                $('.quick').stop().animate({ "top": quickPosHasTop + 25});
            }
        }else{
            var headerHT = $('header').outerHeight();
            var quickPosNoneTop = headerHT;
            if ($(document).scrollTop() > 0) {
                $('.quick').stop().animate({ "top": $(document).scrollTop() + quickPosNoneTop });
            }else{
                $('.quick').stop().animate({ "top": $(document).scrollTop() + quickPosNoneTop + 25 });
            }
        }
    });
    //Mobile
    function mobileTabClass() {
        if ($(window).width() <= 768) {
            $('.sub .topBanner .tab ul').addClass('for_mobile');
            $('.sub .topBanner .tab ul').removeClass('for_pc');
        } else {
            $('.sub .topBanner .tab ul').removeClass('for_mobile');
            $('.sub .topBanner .tab ul').addClass('for_pc');
        }
    }
    mobileTabClass();
    $(window).resize(function () {
        mobileTabClass();
    });
    //Sub Mobile Tab
    $('.sub .content').each(function () {
        var PageInDepthNow = $(this).find('.depMenu > ul li.on a').text();
        var PageInDepthTags = $(this).find('.depMenu > ul').html();
        $(this).find('.depMenu .now').text(PageInDepthNow);
        $(this).find('.depMenu .mo_menu > ul').html(PageInDepthTags);
    })
    $('.sub .depMenu .now').click(function () {
        $(this).next('ul').slideToggle();
    });
});