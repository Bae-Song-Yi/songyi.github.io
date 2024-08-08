$(document).ready(function () {
    //Header 
    $('header nav ul li.has_depth').mouseover(function(){
        $('header nav ul li').removeClass('on')
        $(this).find('div').show();
        $(this).addClass('on');
    });
    $('header nav ul li.has_depth > div').mouseout(function(){
        $(this).hide()
    });
    $('header nav ul li.one_depth,header nav ul li.last').hover(function(){
        $('header nav ul li.has_depth').removeClass('on')
        $('header nav ul li.has_depth > div').hide()
    });
    //Index slide
    $('.idx .slideArea').flexslider({
        animation: "",
        directionNav: false,
        pausePlay: true,
        controlsContainer: $(".controls"),
        customDirectionNav: $(".slideNavi a")
    });
    //Index Popup
    $('.idx .popupBtn').click(function () {
        $('.popupArea').show();
        $('.idx .quickMenu .popupOn').show();
        $('.idx .quickMenu .popupOff').css('opacity','0.2');
        return false;
    });
    $('.idx .quickMenu .popupCloseBtn,.idx .quickMenu .stopWatchBtn').click(function () {
        $('.popupArea').hide();
        $('.idx .quickMenu .popupOn').hide();
        $('.idx .quickMenu .popupOff').css('opacity', '1');
        return false;
    });
    //Q&A
    $('.qna .secret .radio').click(function(){
        if($(this).hasClass('on')==false){
            $(this).addClass('on')
            $(this).find('input').attr('checked', 'checked');
            $(this).find('input').prop('checked', true);
            $(this).next('input').show();
            $(this).parent('dd').css('padding-top','18px')
        }else{
            $(this).removeClass('on')
            $(this).find('input').removeAttr('checked', 'checked');
            $(this).find('input').prop('checked', false);
            $(this).next('input').hide();
            $(this).parent('dd').css('padding-top','35px')
        }
        return false;
    })
    /* Q&A_목록 */
    function ListTypeHeadWidth(){
        var resultWidth = $('.qnaList .thTable .result').outerWidth();
        var titWidth = $('.qnaList .thTable .tit').outerWidth();
        var areaWidth = $('.qnaList .thTable .area').outerWidth();
        var nameWidth = $('.qnaList .thTable .name').outerWidth();
        var dateWidth = $('.qnaList .thTable .date').outerWidth();
        var statusWidth = $('.qnaList .thTable .status').outerWidth();
        $('.qnaList .tbTable td.result').css('width',resultWidth);
        $('.qnaList .tbTable td.tit').css('width',titWidth);
        $('.qnaList .tbTable td.tit a').css('width',titWidth/1.25);
        $('.qnaList .tbTable td.area').css('width',areaWidth);
        $('.qnaList .tbTable td.name').css('width',nameWidth);
        $('.qnaList .tbTable td.date').css('width',dateWidth);
        $('.qnaList .tbTable td.status').css('width',statusWidth);
    }
    ListTypeHeadWidth();
    $(window).resize(function(){
        ListTypeHeadWidth();
    })

    //Q&A_비밀번호 팝업
    $('.PasswordPopup form .close').click(function(){
        $('.PasswordPopup').hide();
        return false;
    })
    //Q&A_상세
    $('.qnaDetails tbody .fileArea dt .file').click(function(){
        if($(this).hasClass('on')==false){
            $(this).addClass('on');
            $(this).parent('dt').next('dd').slideDown();
        }else{
            $(this).removeClass('on');
            $(this).parent('dt').next('dd').slideUp();
        }
        return false;
    })
    //FAQ 
    $('.faq dt').click(function () {
        var nextdd = $(this).next('dd');
        if (nextdd.hasClass('on') == true) {
            nextdd.removeClass('on');
            nextdd.stop().slideUp();
            $(this).removeClass('on');
        } else {
            $('.faq dt').removeClass('on');
            $('.faq dd').removeClass('on');
            $('.faq dd').stop().slideUp();
            nextdd.addClass('on');
            nextdd.stop().slideDown();
            $(this).addClass('on');
        }
    });
    //팝업 공통
    $('.popupData .popupClose').click(function () {
        $(this).parents('.popupArea').hide();
        $('.join .searchSchool .searchArea input').val('');
        return false;
    });
    //학교선택 팝업
    $('.join .selectSchool').click(function () {
        $('.join .popupArea').show()
    });
    //비밀번호 재설정 인증번호 선택
    $('.crtNumSend').click(function () {
        $('.crtNumInput').addClass('on');
        return false;
    });
    //학부모인증 팝업
    $('.parntalAut .popupBtn').click(function () {
        $('.popupData').hide();
        $('.popupArea').show();
        $($(this).attr('href')).show();
        return false;
    });
    //승마장정보 팝업
    $('.detailBtn').click(function () {
        $('.popupArea').show();
        $('.popupData').show();
        $('.ridingGround .slideArea').flexslider({
            animation: "",
            slideshow: false,
            controlNav: false
        });
        return false;
    });
    $('.ridingGround .closeBtn').click(function () {
        $(this).parents('.popupData').hide();
        $(this).parents('.popupArea').hide();
    });

    //Mobile Index All menu
    $('header .allMenuBtn').click(function () {
        $('header .moAllMenu').animate({ 'left': '0' },0);
        $('header .moAllMenu .blackBg').fadeIn(100);
        $('header .moAllMenu .menuCnt').animate({ 'left': '0' },500);
        return false;
    });
    $('header .moAllMenu .menuCnt .menuCloseBtn').click(function () {
        $('header .moAllMenu').animate({ 'left': '-100%' },500);
        $('header .moAllMenu .blackBg').fadeOut(50);
        $('header .moAllMenu .menuCnt').animate({ 'left': '-100%' }, 300);
        return false;
    });
    $('header .moAllMenu .menuCnt .menuList li.has_depth > a').click(function () {
        $(this).toggleClass('on')
        $(this).next('div').slideToggle()
        return false;
    });
	  //aplctGuide
    $('.aplctGuide dt').click(function () {
        var nextdd = $(this).next('dd');
        if (nextdd.hasClass('on') == true) {
            nextdd.removeClass('on');
            nextdd.stop().slideUp();
            $(this).removeClass('on');
        } else {
            $('.aplctGuide dt').removeClass('on');
            $('.aplctGuide dd').removeClass('on');
            $('.aplctGuide dd').stop().slideUp();
            nextdd.addClass('on');
            nextdd.stop().slideDown();
            $(this).addClass('on');
        }
    });
});