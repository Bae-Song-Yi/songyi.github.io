$(document).ready(function () {
    var headerHT = $('header').outerHeight();
    var windowHT = $(window).height();
    //초기화
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $('.videoBanner').addClass('isFocus');
    $('.videoBanner.isFocus .bgOpc').css('opacity',1)
    //상단
    $('.topScrollBtn').click(function () {
        $(this).animate({ 'opacity': '0' });
        $('header').removeClass('fix');
        $('.moAppButton').animate({ 'opacity': '0', 'z-index': '-1' });
        $('.imgBanner').addClass('isFocus');
        $('html, body').stop().animate({ scrollTop: 0 });
        $('.infoFirst div.better').animate({ 'top': '0' });
        $('.infoFirst div.step').animate({ 'bottom': '0' });
        scrollDisable();
        return false;
    })

    //Common Section Browser Full
    function sectionObjFullSize() {
        $('section').height(windowHT);
    }
    //Common Object Browser Full
    function objFullSize() {
        $('.videoBanner').height(windowHT);
        $('.imgBanner').height(windowHT);
        $('.imgBanner .bgMotion').height(windowHT);
        $('.introBrand .infoSecond').height(windowHT);
        $('.introBrand .infoThird .swiper-slide').height(windowHT);
        $('.magazine .blank').height(windowHT);
    }
    //모바일 영상 삭제
    function mobileVideoDel() {
        if($(window).width() <= 720) {
            $('.videoBanner').remove();
            $('.imgBanner').css({right: 0});
            $('.imgBanner').addClass('isFocus');
        }
    };
    //Intro slider fake Size
    function introSliderFakeSize(){
        var prevIntroSize = $('.infoSecond').outerHeight();
        $('.introBrand .infoThird').css({ 'height': prevIntroSize });
        $('.introBrand .infoThird .blank').css({'height':prevIntroSize});
        $('.introBrand .infoThird .infoSlideWrap').css({ 'height': prevIntroSize });
        $('.introBrand .infoThird .infoSlideWrap .swiper-slide').css({ 'height': prevIntroSize });
    }
    //Mobile
    function Mobile(){
        if ($(window).width() < 720) {
            var appBtn = $('.moAppButton').height();
            var infoFirstHT = $('.introBrand .infoFirst').outerHeight();
            $('#wrap').css({ 'margin-bottom': $('.moAppButton').outerHeight()});
            //ImageBanner
            $('.imgBanner').css('height', windowHT - appBtn);
            //Service
            $('.service').removeClass('on');
            $('.service').css({'height' : windowHT - headerHT - appBtn});
            //IntroBrand
            $('.introBrand .infoFirst').css('height', windowHT - headerHT - appBtn)
            $('.introBrand .infoSecond').css({ 'top': infoFirstHT });
            $('.introBrand').css('height', $('.introBrand .infoFirst').outerHeight() + $('.introBrand .infoSecond').outerHeight() + $('.introBrand .infoThird').outerHeight())
            //Interview
            var interviewText = $('.interview .commonTextArea').outerHeight();
            $('.interview').css({'padding-top': headerHT });
            $('.interview .slide_fake').css('height', headerHT + interviewText)
            $('.magazine').addClass('moMagazine');
        }
    }
    $(window).scroll(function(){
        var magazineHalf = $('.magazine.moMagazine').outerHeight() / 2;
        var magazineTop = $('.magazine.moMagazine').offset().top;
        if($(window).scrollTop() > magazineTop + magazineHalf){
            $('.moAppButton').css('position','static');
        }else{
            $('.moAppButton').css('position','fixed');
        }
    });
    mobileVideoDel() 
    sectionObjFullSize();
    objFullSize();
    introSliderFakeSize();
    Mobile();
    $(window).resize(function () {
        mobileVideoDel();
        sectionObjFullSize();
        objFullSize();
        introSliderFakeSize();
        Mobile();
    });
    //Scroll Motion Stop/Play Common
    function scrollDisable() {
        $('body').addClass('scrollDisable').on('scroll touchmove mousewheel', function (e) {
            e.preventDefault();
        });
    }
    function scrollAble() {
        $('body').removeClass('scrollDisable').off('scroll touchmove mousewheel');
    }
    var startY, endY;
    //Main Banner - VideoType(PC)
    $('.videoBanner').on('mousewheel', function (event, delta) {
        scrollDisable();
        if (delta > 0) {//휠 위로올림
            $('html, body').animate({ scrollTop: 0 });
            $(this).find('video').get(0).play();
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            // $(this).stop().animate({ 'left': '-100%' });
            // $('.imgBanner').stop().animate({ 'right': 0 });
            $(this).addClass('isFocus');
            // $(this).find('video').get(0).pause();
            $('.infoFirst').addClass('isFocus');
            $('.infoFirst').removeClass('isFocusOut');
            $('.infoFirst').css('z-index', 9);
            $('.swiper-pagination').css('z-index',8);
            //소개 두번째화면
            $('.infoSecond').removeClass('isFocus');
            $('.infoSecond').removeClass('isFocusOut');
            $('.infoSecond').css('z-index', 8);
            //소개 세번째화면
            $('.infoThird').css('z-index', 7);
            $('.infoThird').removeClass('isFocus');
            $('.infoThird').removeClass('isFocusOut');
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top });
            setTimeout(function () {
                $('header').addClass('fix');
            }, 300);
            scrollDisable();
        }
    });
    //Main Banner - VideoType(Mobile)
    $('.videoBanner').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.videoBanner').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').animate({ scrollTop: 0 });
            $(this).find('video').get(0).play();
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $(this).stop().animate({ 'left': '-100%' });
            $('.imgBanner').stop().animate({ 'right': 0 });
            $('.imgBanner').addClass('isFocus');
            $(this).find('video').get(0).pause();
            scrollDisable();
        }
    });
    //Main Banner - ImageType(PC)
    $('.imgBanner').on(' mousewheel', function (event, delta) {
        if (delta > 0 && $(window).width() > 720) {//휠 위로올림
            $(this).stop().animate({ 'right': '-100%' });
            $('.videoBanner').stop().animate({ 'left': 0 });
            $('html, body').animate({ scrollTop: 0 });
            $(this).removeClass('isFocus');
            $('.videoBanner').find('video').get(0).play();
            scrollDisable();
        } else if (delta < 1 && $(window).width() > 720) {//휠 아래로 내림
            $(this).stop().animate({ 'right': 0 });
            $('.videoBanner').stop().animate({ 'left': '-100%' });
            $('.videoBanner').find('video').get(0).pause();
            $(this).removeClass('isFocus');
            //소개 첫화면
            $('.infoFirst').addClass('isFocus');
            $('.infoFirst').removeClass('isFocusOut');
            $('.infoFirst').css('z-index', 9);
            $('.swiper-pagination').css('z-index',8);
            //소개 두번째화면
            $('.infoSecond').removeClass('isFocus');
            $('.infoSecond').removeClass('isFocusOut');
            $('.infoSecond').css('z-index', 8);
            //소개 세번째화면
            $('.infoThird').css('z-index', 7);
            $('.infoThird').removeClass('isFocus');
            $('.infoThird').removeClass('isFocusOut');
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top });
            setTimeout(function () {
                $('header').addClass('fix');
            }, 300);
        }
    });
    //Main Banner - ImageType(MO)
    $('.imgBanner').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.imgBanner').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').animate({ scrollTop: 0 });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            //header Fix
            $('header').addClass('fix');
            $('.introBrand').css('padding-top', headerHT);
            $('.introBrand .moBlank').show();
            $('.infoFirst div.better').animate({'top' : '4rem'});
            $('.infoFirst div.step').animate({'bottom' : '4rem'});
            //소개 첫번째화면
            $('.infoFirst').css('z-index', 10);
             //소개 두번째화면
            $('.infoSecond').css('z-index', 8);
            //소개 세번째화면
            $('.infoThird').css('z-index', 7);
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top});
            scrollDisable();
            setTimeout(function () {
                $('.moAppButton').animate({ 'opacity': '1', 'z-index': '10' });
            }, 300);
        }
    });
    /*Intro Brand(PC)*/
    //소개 첫화면(PC)
    $('.infoFirst').on(' mousewheel', function (event, delta) {
        if (delta > 0 && $(window).width() > 720) {//휠 위로올림
            $('.imgBanner').addClass('isFocus');
            $('.moAppButton').animate({ 'opacity': '0', 'z-index': '-1' });
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').prev('section').offset().top });
            setTimeout(function () {
                $('header').removeClass('fix');
            }, 300);
            //첫화면
            $('.infoFirst').css('z-index', 9);
            $('.infoFirst').removeClass('isFocus');
            $('.infoFirst').removeClass('isFocusOut');
            //슬라이드 페이징
            $('.swiper-pagination').css('z-index', 8);
            $('.swiper-pagination').stop().animate({'opacity': 0});
            scrollDisable();
        } else if (delta < 1 && $(window).width() > 720) {//휠 아래로 내림
            $('.infoFirst').removeClass('isFocus');
            $('.infoFirst').addClass('isFocusOut');
            setTimeout(function () {
                //첫화면
                $('.infoFirst').css('z-index', 7);
                $('.infoFirst').removeClass('isFocus');
                $('.infoFirst').removeClass('isFocusOut');
                //두번째화면
                $('.infoSecond').css('z-index', 9);
                $('.infoSecond').addClass('isFocus');
                $('.infoSecond').removeClass('isFocusOut');
                $('.idimpopup').addClass('on')
                //세번째화면
                $('.infoThird').css('z-index', 8);
                $('.infoThird').addClass('isFocus');
                $('.infoThird').removeClass('isFocusOut');
                //슬라이드 페이징
                $('.swiper-pagination').css('z-index', 8);
                $('.swiper-pagination').stop().animate({'opacity': 1});
                $('.swiper-pagination').find('.swiper-pagination-bullet').eq(0).removeClass('swiper-pagination-bullet-active');
                $('.swiper-pagination-bullet').find('span').remove();
                $('.swiper-pagination-bullet').html('<i></i>');           
            }, 1000);
            scrollDisable();
        }
    });
    //소개 두번째화면(PC)
    $('.infoSecond').on(' mousewheel', function (event, delta) {
        if (delta > 0 && $(window).width() > 720) {//휠 위로올림
            //첫번째 화면
            $('.infoFirst').css('z-index', 9);
            $('.infoFirst').addClass('isFocus');
            $('.infoFirst').removeClass('isFocusOut');
            //두번째화면
            $('.infoSecond').css('z-index', 8);
            $('.infoSecond').removeClass('isFocus');
            $('.infoSecond').removeClass('isFocusOut');
            //세번째화면
            $('.infoThird').css('z-index', 7);
            $('.infoThird').removeClass('isFocus');
            $('.infoThird').removeClass('isFocusOut');
            $('.swiper-pagination-bullet').find('span').remove();
            $('.swiper-pagination-bullet').html('<i></i>');
            scrollDisable();
        } else if (delta < 1 && $(window).width() > 720) {//휠 아래로 내림
            $('.infoSecond').removeClass('isFocus');
            $('.infoSecond').addClass('isFocusOut');
            //첫화면
            $('.infoFirst').css('z-index', 7);
            //두번째화면
            $('.infoSecond').css('z-index', 8);
            $('.infoSecond').removeClass('isFocus');
            //세번째화면
            $('.infoThird').css('z-index', 9);
            $('.infoThird').removeClass('isFocus');
            $('.infoThird').addClass('isFocusOut');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 2);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake1 a.clickObj').show();
            $('.swiper-pagination').find('.swiper-pagination-bullet').eq(0).addClass('swiper-pagination-bullet-active');
            var stepSliderLength = $('.swiper-pagination-bullet').length;
            for(i=0;i<stepSliderLength; i++){
                $('.swiper-pagination-bullet').eq(i).append('<span>Step.0'+ (i+1) +'</span>')
            }
            scrollDisable();
        }
    });
    //소개 세번째화면(PC) - 첫 슬라이드
    $('.infoThird .slide_fake1').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').find('.infoFirst').offset().top })
            //두번째화면
            $('.infoSecond').addClass('isFocus');
            $('.infoSecond').removeClass('isFocusOut');
            //세번째화면
            $('.infoThird').addClass('isFocus');
            $('.infoThird').removeClass('isFocusOut');
            setTimeout(function () {
                $('.infoFirst').css('z-index', 7);
                $('.infoSecond').css('z-index', 9);
                $('.infoThird').css('z-index', 8);
            },1000);
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            $('.swiper-pagination').find('.swiper-pagination-bullet').eq(0).removeClass('swiper-pagination-bullet-active');
            $('.swiper-pagination-bullet').find('span').remove();
            $('.swiper-pagination-bullet').html('<i></i>');
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 2);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake2 a.clickObj').show();
            scrollDisable();
        }
    });
    //소개 세번째화면(PC) - 두번째 슬라이드
    $('.infoThird .slide_fake2').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 2);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake1 a.clickObj').show();
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 2);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake3 a.clickObj').show();
            scrollDisable();
        }
    });
    //소개 세번째화면(PC) - 세번째 슬라이드
    $('.infoThird .slide_fake3').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 2);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake2 a.clickObj').show();
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .blank .clickObj').css('opacity', 0);
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 2);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake4 a.clickObj').show();
            scrollDisable();
        }
    });
    //소개 세번째화면(PC) - 네번째 슬라이드
    $('.infoThird .slide_fake4').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 2);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake3 a.clickObj').show();
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 2);
            scrollDisable();
        }
    });
    //소개 세번째화면(PC) - 다섯번째 슬라이드
    $('.infoThird .slide_fake5').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 2);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake3 a.clickObj').show();
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            $('.service ul li').addClass('on');
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top });
            scrollDisable();
            setTimeout(function () {
                $('header').removeClass('fix');
                $('header').addClass('serv');
            });
        }
    });
    /*Intro Brand - First Fake1(MO)*/
    $('.infoFirst').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.infoFirst').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('.infoFirst div.better').animate({'top' : 0});
            $('.infoFirst div.step').animate({'bottom' : 0});
            //header Fix Remove
            $('header').removeClass('fix');
            $('section').css('padding-top', 0);
            $('html, body').stop().animate({ scrollTop: $(this).parent('section').prev('section').offset().top });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $(this).next('div').offset().top});
            $('.infoThird .slide_fake1').css('z-index', 2);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            scrollDisable();
            setTimeout(function () {
                $('.topScrollBtn').animate({ 'opacity': 1 });
                $('.idimBtn').animate({ 'opacity': 1 });
            }, 300);
        }
    });
    //소개 세번째화면(MO) - 첫 슬라이드
    $('.infoThird .slide_fake1').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.infoThird .slide_fake1').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
        $('html, body').stop().animate({ scrollTop: $(this).parents('section').find('.infoFirst').offset().top - headerHT});
            //소개 세번째화면
            scrollDisable();
            setTimeout(function () {
            }, 300);
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 2);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake2 a.clickObj').show();
            scrollDisable();
        }
    });
    //소개 세번째화면(MO) - 두번째 슬라이드
    $('.infoThird .slide_fake2').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.infoThird .slide_fake2').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 2);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake1 a.clickObj').show();
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 2);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake3 a.clickObj').show();
            scrollDisable();
        }
    });
    //소개 세번째화면(MO) - 세번째 슬라이드
    $('.infoThird .slide_fake3').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.infoThird .slide_fake3').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 2);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake2 a.clickObj').show();
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .blank .clickObj').css('opacity', 0);
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 2);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake4 a.clickObj').show();
            scrollDisable();
        }
    });
    //소개 세번째화면(MO) - 네번째 슬라이드
    $('.infoThird .slide_fake4').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.infoThird .slide_fake4').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            //Slide Trigger
            $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 2);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake3 a.clickObj').show();
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            //Slide Trigger
            $('.infoThird button.next').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .blank .clickObj').css('opacity', 0);
            $('.infoThird .slide_fake1').css('z-index', 1);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 2);
            $('.infoThird .blank a.clickObj').hide();
            $('.infoThird .slide_fake4 a.clickObj').show();
            scrollDisable();
        }
    });
    //소개 세번째화면(MO) - 다섯번째 슬라이드
    $('.infoThird .slide_fake5').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.infoThird .slide_fake5').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            //Slide Trigger
            // $('.infoThird button.prev').trigger('click');
            //세번째화면 - 슬라이드
            $('.infoThird .slide_fake1').css('z-index', 2);
            $('.infoThird .slide_fake2').css('z-index', 1);
            $('.infoThird .slide_fake3').css('z-index', 1);
            $('.infoThird .slide_fake4').css('z-index', 1);
            $('.infoThird .slide_fake5').css('z-index', 1);
            // $('.infoThird .blank a.clickObj').hide();
            // $('.infoThird .slide_fake3 a.clickObj').show();
            $('.service article li.isFocus').removeClass('isFocus');
            swiper.slideTo(0, 1000, false)
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('.service ul li').addClass('on');
            $('.introBrand .moBlank').hide();
            $('html, body').stop().animate({ scrollTop: $(this).parent('.infoThird').next('a').offset().top + headerHT});
            scrollDisable();
        }
    });
    var swiper = new Swiper(".infoSlideWrap", {
        slidesPerView: 1.4,
        spaceBetween: 40,
        speed: 1000,
        centeredSlides: true,
        mousewheel: false,
        loop: false,
        resistance :true,
        navigation: {
            nextEl: '.infoThird button.next',
            prevEl: '.infoThird button.prev',
        },
        pagination: {
            el: '.swiper-pagination',            
            clickable: true,            
        },
        breakpoints: {
            720: {
                slidesPerView: 2.5,
                spaceBetween: 40,
            },
        },
    });

    function slideClickObj() {
        var objSize = $('.infoSlideWrap .swiper-slide').outerWidth();
        $('.introBrand .infoThird .blank .clickObj').css('width', objSize)
    }
    slideClickObj();
    /*Service*/
    //Service slide1 hover(pc)
    $('.service .slide_fake1 .fakeWrap').hover(function () {
        $('.service').addClass('on')
        $('.service .slide_fake1').addClass('isFocus'); 
        $('.service .slide_fake2').addClass('isFocusOut'); 
        $('.service .slide_fake3').addClass('isFocusOut'); 
        $('.service .slide_fake4').addClass('isFocusOut'); 
    }, function () {
        $('.service').removeClass('on')
        $('.service .slide_fake1').removeClass('isFocus'); 
        $('.service .slide_fake2').removeClass('isFocusOut'); 
        $('.service .slide_fake3').removeClass('isFocusOut'); 
        $('.service .slide_fake4').removeClass('isFocusOut'); 
    })
    //Service slide2 hover(pc)
    $('.service .slide_fake2 .fakeWrap').hover(function () {
        $('.service').addClass('on2')
        $('.service .slide_fake1').removeClass('isFocus'); 
        $('.service .slide_fake1').addClass('isFocusOut'); 
        $('.service .slide_fake2').addClass('isFocus'); 
        $('.service .slide_fake3').addClass('isFocusOut'); 
        $('.service .slide_fake4').addClass('isFocusOut'); 
    }, function () {
        $('.service').removeClass('on2')
        $('.service .slide_fake1').removeClass('isFocusOut'); 
        $('.service .slide_fake2').removeClass('isFocus'); 
        $('.service .slide_fake3').removeClass('isFocusOut'); 
        $('.service .slide_fake4').removeClass('isFocusOut'); 
    })
    //Service slide3 hover(pc)
    $('.service .slide_fake3 .fakeWrap').hover(function () {
        $('.service').addClass('on3')
        $('.service .slide_fake1').addClass('isFocusOut'); 
        $('.service .slide_fake2').addClass('isFocusOut'); 
        $('.service .slide_fake3').removeClass('isFocusOut'); 
        $('.service .slide_fake3').addClass('isFocus'); 
        $('.service .slide_fake4').addClass('isFocusOut'); 
    }, function () {
        $('.service').removeClass('on3')
        $('.service .slide_fake1').removeClass('isFocusOut'); 
        $('.service .slide_fake2').removeClass('isFocusOut'); 
        $('.service .slide_fake3').removeClass('isFocus'); 
        $('.service .slide_fake4').removeClass('isFocusOut'); 
    })
    //Service slide4 hover(pc)
    $('.service .slide_fake4 .fakeWrap').hover(function () {
        $('.service').addClass('on4')
        $('.service .slide_fake1').addClass('isFocusOut'); 
        $('.service .slide_fake2').addClass('isFocusOut'); 
        $('.service .slide_fake3').addClass('isFocusOut'); 
        $('.service .slide_fake4').removeClass('isFocusOut'); 
        $('.service .slide_fake4').addClass('isFocus'); 
    }, function () {
        $('.service').removeClass('on4')
        $('.service .slide_fake1').removeClass('isFocusOut'); 
        $('.service .slide_fake2').removeClass('isFocusOut'); 
        $('.service .slide_fake3').removeClass('isFocusOut'); 
        $('.service .slide_fake4').removeClass('isFocus'); 
    })
    //Service Mouse Wheel(pc)    
    $('.service').on(' mousewheel', function (event, delta) {
        if (delta > 0 && $(window).width()) {//휠 위로올림
            $('html, body').stop().animate({ scrollTop: $(this).prev('section').find('.infoSecond').offset().top });
            scrollDisable();
        } else if (delta < 1 && $(window).width()) {//휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $(this).next('section').offset().top });
            scrollDisable();
            setTimeout(function () {
                $('header').removeClass('serv');
                $('header').addClass('opac');
            });
        }
    });
    /*Service (MO)*/
    if ($(window).width() < 720) {
        $('.service .slide_fake1 .fakeWrap').off();
        $('.service .slide_fake2 .fakeWrap').off();
        $('.service .slide_fake3 .fakeWrap').off();
        $('.service .slide_fake4 .fakeWrap').off()
        $('.service .blank.on').removeClass('on');
    }
    $('.service').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.service').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).prev('section').find('.infoSecond').offset().top - 100 });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $(this).next('section').offset().top - headerHT});
            scrollDisable();
        }
    });
    //Interview (pc)
    $('.interview').on(' mousewheel', function (event, delta) {
        if (delta > 0 && $(window).width() > 720) {//휠 위로올림
            $('html, body').stop().animate({ scrollTop: $(this).prev('section').offset().top });
            scrollDisable();
        } else if (delta < 1 && $(window).width() > 720) {//휠 아래로 내림
            $('.interview .interviewContent').addClass('isFocus');
            scrollDisable();
        }
    });
    //Interview Add IsFocus(pc)
    $('.interview .interviewContent').on(' mousewheel', function (event, delta) {
        if (delta > 0 && $(window).width() > 720) {//휠 위로올림
            $('.interview .interviewContent').removeClass('isFocus');
            scrollDisable();
        } else if (delta < 1 && $(window).width() > 720) {//휠 아래로 내림
            $('.magazine .slide_fake1').css('z-index' , '2');
            $('.magazine .slide_fake2').css('z-index' , '1');
            $('.magazine .slide_fake3').css('z-index', '1');
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top });
            scrollDisable();
        }
    });
    /*Interview (MO)*/
    //Interview 상단 터치
    $('.interview .slide_fake').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.interview .slide_fake').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).parent('section').prev('.service').offset().top - headerHT});
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $('.interviewContent li.i3').offset().top - headerHT });
            scrollDisable();
        }
    });
    //Interview 첫번째 오브젝트 터치
    $('.interviewContent li.i1').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.interviewContent li.i1').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top - headerHT });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $('.interviewContent li.i3').offset().top - headerHT });
            scrollDisable();
        }
    });
    //Interview 두번째 오브젝트 터치
    $('.interviewContent li.i2').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.interviewContent li.i2').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top - headerHT });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $('.interviewContent li.i3').offset().top - headerHT });
            scrollDisable();
        }
    });
    //Interview 세번째 오브젝트 터치
    $('.interviewContent li.i3').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.interviewContent li.i3').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top - headerHT });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('.magazine').offset().top});
            scrollDisable();
        }
    });
    //Interview 네번째 오브젝트 터치
    $('.interviewContent li.i4').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.interviewContent li.i4').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top - headerHT });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('.magazine').offset().top});
            scrollDisable();
        }
    });
    //Interview more 터치
    $('.interview a.more').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.interview a.more').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top - headerHT });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('.magazine').offset().top});
            scrollDisable();
        }
    });
    //Magazine
    //Magazine 첫번째 슬라이드
    $('.magazine .slide_fake1').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            $('.interview .interviewContent').addClass('isFocus');
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').prev('section').offset().top });
            $('.magazine .slide_fake1').css('z-index' , '2');
            $('.magazine .slide_fake2').css('z-index' , '1');
            $('.magazine .slide_fake3').css('z-index' , '1');
            $('.magazine button.prev').trigger('click');
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top });
            $('.magazine .slide_fake1').css('z-index' , '1');
            $('.magazine .slide_fake2').css('z-index' , '2');
            $('.magazine .slide_fake3').css('z-index' , '1');
            $('.magazine button.next').trigger('click');
            scrollDisable();
        }
    });
    //Magazine 두번째 슬라이드
    $('.magazine .slide_fake2').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            $('html, body').stop().animate({ scrollTop: $(this).offset().top });
            $('.magazine .slide_fake1').css('z-index' , '2');
            $('.magazine .slide_fake2').css('z-index' , '1');
            $('.magazine .slide_fake3').css('z-index' , '1');
            $('.magazine button.prev').trigger('click');
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top });
            $('.magazine .slide_fake1').css('z-index' , '1');
            $('.magazine .slide_fake2').css('z-index' , '1');
            $('.magazine .slide_fake3').css('z-index' , '2');
            $('.magazine button.next').trigger('click');
            scrollDisable();
        }
    });
    //Magazine 세번째 슬라이드
    $('.magazine .slide_fake3').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').offset().top });
            $('.magazine .slide_fake1').css('z-index' , '1');
            $('.magazine .slide_fake2').css('z-index' , '2');
            $('.magazine .slide_fake3').css('z-index' , '1');
            $('.magazine button.prev').trigger('click');
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top});
            $('.topScrollBtn').addClass('fixRemove');
            $('.idimpopup').addClass('fixRemove');
            $('.magazine .slide_fake1').css('z-index', '1');
            $('.magazine .slide_fake2').css('z-index', '1');
            $('.magazine .slide_fake3').css('z-index', '2');
            $('.appNletter .appDownload').animate({ 'left': 0 });
            $('.appNletter .newLetter').animate({ 'right': 0 });
            scrollDisable();
        }
    });
    //Magazine 모바일
    //Magazine 상단터치
    $('.magazine .commonTextArea').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.magazine .commonTextArea').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $('.interviewContent li.i4').offset().top - headerHT });
            scrollDisable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $('.magazineContent').offset().top - headerHT });
            scrollDisable();
        }
    });
    //Magazine 오브젝트 첫번째 터치
    $('.magazineContent').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.magazineContent').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $('.interviewContent li.i3').offset().top - headerHT });
            scrollAable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top});
            scrollDisable();
        }
    });
    //Magazine more 터치
    $('.magazine a.more').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.magazine a.more').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $('.interviewContent li.i3').offset().top - headerHT });
            scrollAable();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('html, body').stop().animate({ scrollTop: $(this).parents('section').next('section').offset().top});
            scrollDisable();
        }
    });
    //App & Newletter
    $('.appNletter').on(' mousewheel', function (event, delta) {
        var footerHT = $('footer').outerHeight();
        if (delta > 0) {//휠 위로올림
            $('.idimpopup').removeClass('fixRemove');
            $('.appNletter .appDownload').animate({ 'left': '-100%'});
            $('.appNletter .newLetter').animate({ 'right': '-100%' });
            $('.magazine .slide_fake1').css('z-index' , '1');
            $('.magazine .slide_fake2').css('z-index' , '1');
            $('.magazine .slide_fake3').css('z-index' , '2');
            $('html, body').stop().animate({ scrollTop: $(this).prev('section').offset().top });
            scrollDisable();
        } else if (delta < 1) {//휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $(this).parents('#wrap').find('footer').offset().top });
            if($('.idimpopup').hasClass('on') === true) {
                $('.topScrollBtn').addClass('fixRemove')
                $('.topScrollBtn').removeClass('letterFix')
            } else { 
                $('.topScrollBtn').addClass('letterFix')
                $('.topScrollBtn').removeClass('fixRemove')
                }
            scrollDisable();
        }
    });
    //App & Newletter(MO)
    $('.appNletter').on('touchstart', function (event) {
        startY = event.originalEvent.changedTouches[0].screenY;
    });
    $('.appNletter').on('touchend', function (event) {
        endY = event.originalEvent.changedTouches[0].screenY;
        if (endY - startY > 50) {//터치모션 위로 올라감
            $('html, body').stop().animate({ scrollTop: $(this).prev('.magazine').offset().top - headerHT});
            $('.topScrollBtn').removeClass('fixRemove');
            $('.topScrollBtn').css('bottom', $('.moAppButton').outerHeight() + 50)
            scrollAble();
        } else if (startY - endY > 50) {//터치모션 밑으로 내려감
            $('.topScrollBtn').addClass('fixRemove');
            $('.topScrollBtn').css('bottom', $('footer').height() + $('.moAppButton').outerHeight() + 150)
            scrollAble();
        }
    });
    //Footer 
    $('footer').on(' mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            $('.appNletter .appDownload').animate({ 'left': '0'});
            $('.appNletter .newLetter').animate({ 'right': '0' });
            $('html, body').stop().animate({ scrollTop: $(this).parents('#wrap').find('.appNletter').offset().top });
        } else if (delta < 1) {//휠 아래로 내림
            $('.topScrollBtn').css('bottom', $('footer').height() + $('.moAppButton').outerHeight() + 150)
            scrollDisable();
        }
    });
    var ww = $(window).width();
    if (ww > 720){
        var swiper2 = new Swiper(".magazine .mySwiper", {
        direction: "vertical",
        slidesPerView: 2.5,
        loop:false,
        navigation: {
            nextEl: '.magazine button.next',
            prevEl: '.magazine button.prev',
        },
    }); 
    }else if(ww <= 720 ) {
    }
    $('.idimpopup .close').click(function(){
        $('.idimpopup.on').removeClass('on')
        $('.topScrollBtn').addClass('letterFix')
    });
});
