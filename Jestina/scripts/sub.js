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
            $('.location .dep1').text('COMPANY');
            $('.location .dep2List').append(dep2Menu);
            $('nav .menuList dl:first-child dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dd').show();
        };
        if ($('#container').hasClass('company vision')) {
            $('.location .now , .sub h3.pageTitle').text('비전');
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:first-child dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:first-child dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('company history')) {
            $('.location .now , .sub h3.pageTitle').text('연혁');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:first-child dd a:nth-child(2)').addClass('inPage');
            $('.mobileGNB .moMenuList dl:first-child dd a:nth-child(2)').addClass('inPage');
        };
        if ($('#container').hasClass('company business')) {
            $('.location .now , .sub h3.pageTitle').text('사업영역');
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
            $('.location .dep1').text('STORE');
            $('.location .dep2List').append(dep2Menu);
            $('.location .now , .sub h3.pageTitle').text('STORE');
            $('nav .menuList dl:nth-child(3) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(3) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(3) dd').show();
        };
        if ($('#container').hasClass('store domestic')) {
            $('.location .now').text('국내');
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:nth-child(3) dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(3) dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('store overseas')) {
            $('.location .now').text('해외');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:nth-child(3) dd a:nth-child(2)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(3) dd a:nth-child(2)').addClass('inPage');
        };
        /*Recruit*/
        if ($('#container').hasClass('recruit')) {
            var dep2Menu = $('nav dl:nth-child(4) dd').html();
            $('.location .dep1').text('RECRUIT');
            $('.location .dep2List').append(dep2Menu);
            $('nav .menuList dl:nth-child(4) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(4) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(4) dd').show();
        };
        if ($('#container').hasClass('recruit talent')) {
            $('.location .now , .sub h3.pageTitle').text('인재상');
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:nth-child(4) dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(4) dd a:nth-child(1)').addClass('inPage');
        };
        if ($('#container').hasClass('recruit duty')) {
            $('.location .now , .sub h3.pageTitle').text('직무소개');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:nth-child(4) dd a:nth-child(2)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(4) dd a:nth-child(2)').addClass('inPage');
        };
        if ($('#container').hasClass('recruit culture')) {
            $('.location .now , .sub h3.pageTitle').text('기업문화/복리후생');
            $('.location li .dep2List a').eq(2).addClass('on');
            $('nav .menuList dl:nth-child(4) dd a:nth-child(3)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(4) dd a:nth-child(3)').addClass('inPage');
        };
        if ($('#container').hasClass('recruit jobOpening anncmnt')) {
            $('.location .now , .sub h3.pageTitle').text('채용공고');
            $('.location li .dep2List a').eq(3).addClass('on');
            $('nav .menuList dl:nth-child(4) dd a:nth-child(4)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(4) dd a:nth-child(4)').addClass('inPage');
        };
        if ($('#container').hasClass('recruit jobOpening regist')) {
            $('.location .now , .sub h3.pageTitle').text('인재풀 등록');
            $('.location li .dep2List a').eq(4).addClass('on');
            $('nav .menuList dl:nth-child(4) dd a:nth-child(5)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(4) dd a:nth-child(5)').addClass('inPage');
        };
        if ($('#container').hasClass('recruit application')) {
            $('.location .now , .sub h3.pageTitle').text('입사지원');
        };
        /*IR*/
        if ($('#container').hasClass('ir')) {
            var dep2Menu = $('nav dl:nth-child(5) dd').html();
            $('.location .dep1').text('IR');
            $('.location .dep2List').append(dep2Menu);
            $('nav .menuList dl:nth-child(5) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(5) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(5) dd').show();
        };
        if ($('#container').hasClass('ir stock')) {
            $('.location .now , .sub h3.pageTitle').text('주가정보');
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:nth-child(5) dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(5) dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('ir disclosure')) {
            $('.location .now , .sub h3.pageTitle').text('공시정보');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:nth-child(5) dd a:nth-child(2)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(5) dd a:nth-child(2)').addClass('inPage');
        };
        if ($('#container').hasClass('ir notif')) {
            $('.location .now , .sub h3.pageTitle').text('공고');
            $('.location li .dep2List a').eq(2).addClass('on');
            $('nav .menuList dl:nth-child(5) dd a:nth-child(3)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(5) dd a:nth-child(3)').addClass('inPage');
        };
        /*News*/
        if ($('#container').hasClass('bbs')) {
            var dep2Menu = $('nav dl:nth-child(6) dd').html();
            $('.location .dep1').text('NEWS');
            $('.location .dep2List').append(dep2Menu);
            $('nav .menuList dl:nth-child(6) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(6) dt a').addClass('inPage');
            $('.mobileGNB .moMenuList dl:nth-child(6) dd').show();
        };
        if ($('#container').hasClass('bbs notice')) {
            $('.location .now , .sub h3.pageTitle').text('공지사항')
            $('.location li .dep2List a').eq(0).addClass('on');
            $('nav .menuList dl:nth-child(6) dd a:first-child').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(6) dd a:first-child').addClass('inPage');
        };
        if ($('#container').hasClass('bbs news')) {
            $('.location .now , .sub h3.pageTitle').text('뉴스');
            $('.location li .dep2List a').eq(1).addClass('on');
            $('nav .menuList dl:nth-child(6) dd a:nth-child(2)').addClass('inPage');
            $('header .mobileGNB .moMenuList dl:nth-child(6) dd a:nth-child(2)').addClass('inPage');
        };
    };
    subLocation();
});