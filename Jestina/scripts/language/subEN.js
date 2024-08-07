$(document).ready(function () {
    //Common
    function containerSub() {
        if ($('#container').hasClass('sub')) {
            $('header').addClass('subHeader')
        }
    }
    containerSub();
    //Location
    $('.location li.depmenu').hover(function () {
        $(this).find('.now').addClass('on');
        $(this).find('.dep2List').stop().slideDown();
    }, function () {
        $(this).find('.now').removeClass('on');
        $(this).find('.dep2List').stop().slideUp();
    });
    //GNB & Location
    function subLocation() {
        /*Company*/
        if ($('#container').hasClass('company')) {
            var dep2Menu = $('nav dl:first-child dd').html();
            $('.location .dep1').text('ABOUT');
            $('.location .dep2List').append(dep2Menu);
            $('nav .menuList dl:first-child dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dd').show();
        };
        if ($('#container').hasClass('company vision')) {
            $('.location .now').text('Vision');
            $('.sub h3.pageTitle').text('Vision');
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:first-child dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:first-child dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('company history')) {
            $('.location .now , .sub h3.pageTitle').text('History');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:first-child dd a:nth-child(2)').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dd a:nth-child(2)').addClass('inPage');
        };
        if ($('#container').hasClass('company business')) {
            $('.location .now , .sub h3.pageTitle').text('Business Areas');
            $('.location li .dep2List a').eq(2).addClass('on');
            $('nav .menuList dl:first-child dd a:nth-child(3)').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dd a:nth-child(3)').addClass('inPage');
        };
        if ($('#container').hasClass('company identity')) {
            $('.location .now , .sub h3.pageTitle').text('BI');
            $('.location li .dep2List a').eq(3).addClass('on');
            $('nav .menuList dl:first-child dd a:nth-child(4)').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dd a:nth-child(4)').addClass('inPage');
        };
        if ($('#container').hasClass('company contact')) {
            $('.location .now , .sub h3.pageTitle').text('Contact');
            $('.location li .dep2List a').eq(4).addClass('on');
            $('nav .menuList dl:first-child dd a:nth-child(5)').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dd a:nth-child(5)').addClass('inPage');
        };
        /*Brand*/
        if ($('#container').hasClass('brand')) {
            var dep2Menu = $('nav dl:nth-child(2) dd').html();
            $('.location .dep1').text('BRAND');
            $('.location .dep2List').append(dep2Menu);
            $('nav .menuList dl:nth-child(2) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(2) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(2) dd').show();
        };
        if ($('#container').hasClass('brand jewelry')) {
            $('.location .now').text('J.ESTINA JEWELRY');
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:nth-child(2) dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(2) dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('brand handbag')) {
            $('.location .now').text('J.ESTINA HANDBAG');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:nth-child(2) dd a:nth-child(2)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(2) dd a:nth-child(2)').addClass('inPage');
        };
        if ($('#container').hasClass('brand romanson')) {
            $('.location .now , .sub h3.pageTitle').text('ROMANSON');
            $('.location li .dep2List a').eq(2).addClass('on');
            $('nav .menuList dl:nth-child(2) dd a:nth-child(3)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(2) dd a:nth-child(3)').addClass('inPage');
        };
        if ($('#container').hasClass('brand archive')) {
            $('.location .now').text('ARCHIVE');
            $('.location li .dep2List a').eq(3).addClass('on');
            $('nav .menuList dl:nth-child(2) dd a:nth-child(4)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(2) dd a:nth-child(4)').addClass('inPage');
            $('footer').css('margin-top', '-1px')
        };
        /*Store*/
        if ($('#container').hasClass('store')) {
            var dep2Menu = $('nav dl:nth-child(3) dd').html();
            $('.location .dep1').text('STORES');
            $('.location .dep2List').append(dep2Menu);
            $('.location .now , .sub h3.pageTitle').text('STORES');
            $('nav .menuList dl:nth-child(3) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(3) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(3) dd').show();
        };
        if ($('#container').hasClass('store domestic')) {
            $('.location .now').text('South Korea');
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:nth-child(3) dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(3) dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('store overseas')) {
            $('.location .now').text('International');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:nth-child(3) dd a:nth-child(2)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(3) dd a:nth-child(2)').addClass('inPage');
        };
        /*News*/
        if ($('#container').hasClass('bbs')) {
            var dep2Menu = $('nav dl:nth-child(4) dd').html();
            $('.location .dep1').text('NEWS');
            $('.location .dep2List').append(dep2Menu);
            $('nav .menuList dl:nth-child(4) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(6) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(6) dd').show();
        };
        if ($('#container').hasClass('bbs notice')) {
            $('.location .now , .sub h3.pageTitle').text('Announcements')
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:nth-child(4) dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(4) dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('bbs news')) {
            $('.location .now , .sub h3.pageTitle').text('News');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:nth-child(4) dd a:nth-child(2)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(4) dd a:nth-child(2)').addClass('inPage');
        };
    };
    subLocation();
});