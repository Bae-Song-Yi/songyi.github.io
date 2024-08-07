$(document).ready(function(){
    /*--Main Pc--*/
    //초기화
    //$("html, body").animate({ scrollTop: 0 }, "slow");

    //Main Motion
    function mainPcSize(){
        var windowHT = $(window).height();
        $('.mainPc section article').css('height', windowHT);
    }
    mainPcSize();
    $(window).resize(function(){
        var windowHT = $(window).height();
        mainPcSize();
    })

    /*--Main Banner--*/
    //메인배너 슬라이드
    var swiper1 = new Swiper(".mainPc .mainBanner .slideWrap", {
        slidesPerView: 1,
        mousewheel: false,
        loop: true,
        resistance: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".mainPc .paging",
            type: "fraction",
        },
        navigation: {
            nextEl: ".mainPc .mainBanner .next",
            prevEl: ".mainPc .mainBanner .prev",
        },
    });
    $('.mainBanner .pause').click(function(){
        swiper1.autoplay.stop();
        $('.mainBanner .motionCtrl a.play').show();
        $('.mainBanner .motionCtrl a.pause').hide();
    });
    $('.mainBanner .play').click(function(){
        swiper1.autoplay.start();
        $('.mainBanner .motionCtrl a.play').hide();
        $('.mainBanner .motionCtrl a.pause').show();
    });
    //메인배너 Mousewheel
    $('.mainPc .mainBanner').on('mousewheel', function (event, delta) {
        if (delta < 1) { //휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.brand').offset().top});
        }
    });

    /*--Brand--*/
    //브랜드 > 소개 Mouse Active
    $('.mainPc .brand .intro .blank1').on('mousewheel', function (event, delta) {
        if (delta > 0) {//휠 위로올림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.mainBanner').offset().top});
        }else if (delta < 1) {//휠 아래로 내림
            $('.mainPc .brand .info .left').addClass('on');
            $('.mainPc .brand .intro .blank1').css('z-index', '2');
            $('.mainPc .brand .intro .blank2').css('z-index', '4');
            $('.mainPc .brand .intro .blank3').css('z-index', '3');
            setTimeout(function(){
                $('.mainPc .brand .phoneWrap .intro_img').addClass('on');
                $('.mainPc .brand .info li.txt1').stop().animate({'margin-top' : '0', 'opacity' : '1'},500)
            }, 400);
            setTimeout(function(){
                $('.mainPc .brand .info li.txt2').stop().animate({'opacity' : '1'})
            }, 600);
            setTimeout(function(){
                $('.mainPc .brand .info li.link').stop().animate({'opacity' : '1'});
                $('.mainPc .brand .intro .blank1').css('z-index', '3');
                $('.mainPc .brand .intro .blank2').css('z-index', '2');
                $('.mainPc .brand .intro .blank3').css('z-index', '4');
            }, 800);
        }
    });
    $('.mainPc .brand .intro .blank3').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.mainBanner').offset().top});
        }else if (delta < 1) { //휠 아래로 내림
            $('.mainPc .brand .proce').addClass('on');
            $('.mainPc .brand .proce .blank1').css('z-index', '2');
        }
    });
    $('.mainPc .brand .proce .blank1').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('.mainPc .brand .proce').removeClass('on');
        }else if (delta < 1) {//휠 아래로 내림
            $('.mainPc .brand .phoneWrap .proce_img1').addClass('on');
            $('.mainPc .brand .proce .blank1').css('z-index', '1');
            $('.mainPc .brand .proce .blank2').css('z-index', '2');
            setTimeout(function(){
                $('.mainPc .brand .proce .blank1').css('z-index', '1');
                $('.mainPc .brand .proce .blank2').css('z-index', '2');
                $('.mainPc .brand .proce .textPos li.txt1').stop().animate({'margin-top' : '0', 'opacity' : '1'},500);
                $('.mainPc .brand .proce .slideWrap').addClass('on');
            }, 400);
            setTimeout(function(){
                $('.mainPc .brand .proce .textPos li.txt2').addClass('on');
                $('.mainPc .brand .proce .textPos li.link').stop().animate({'opacity' : '1'});
                $('.mainPc .brand .proce .swiper-slide').addClass('endActive');
                $('.mainPc .brand .proce .swiper-slide div').stop().animate({'opacity' : '1'});
                $('.mainPc .brand .proce .swiper-slide a').stop().animate({'opacity' : '1'});
                $('.mainPc .brand .proce .hiddenArrow').css({'transition-delay':'1s','z-index': '3'});
            }, 600);
        }
    });
    //브랜드 > 사용방법_슬라이드
    var swiper2 = new Swiper(".mainPc .proce .slideWrap", {
        slidesPerView: 1.62,
        spaceBetween: 40,
        loop:false,
        centeredSlides: true,
        mousewheel: true,
        on:{
            init:function(){
                var nowIdx = this.activeIndex + 1;
                console.log(nowIdx)
                if(nowIdx == 1){
                    $('.mainPc .brand .proce .hiddenArrow').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                            $('.mainPc .brand .proce').removeClass('on');
                        }
                    });
                }
            },
            slideChange: function(){
                var activeStartIdx = this.activeIndex + 1;
                $('.mainPc .brand .phoneWrap .img img').attr('src','images/main/brand_proce_0' + activeStartIdx + '.jpg');
            },
            slideChangeTransitionEnd: function(){
                var activeEndIdx = this.activeIndex + 1;
                if(activeEndIdx == 5){
                    $('.mainPc .brand .proce .hiddenArrow').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                            $('.mainPc .brand .proce').addClass('on');
                        }else if (delta < 1) { //휠 아래로 내림
                            $('html, body').stop().animate({ scrollTop: $('.mainPc section.service').offset().top});
                            setTimeout(function(){
                                $('.mainPc .service').addClass('show');
                            }, 200);
                            setTimeout(function(){
                                $('.mainPc .service ul').addClass('on');
                            }, 600);
                        }
                    });
                }else if(activeEndIdx == 1){
                    $('.mainPc .brand .proce .hiddenArrow').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                            $('.mainPc .brand .proce').removeClass('on');
                        }else if (delta < 1) { //휠 아래로 내림
                            $('html, body').stop().animate({ scrollTop: $('.mainPc section.brand').offset().top});
                        }
                    });
                }else{
                    $('.mainPc .brand .proce .hiddenArrow').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                            $('.mainPc .brand .proce').addClass('on');
                        }else if (delta < 1) { //휠 아래로 내림
                            $('html, body').stop().animate({ scrollTop: $('.mainPc section.brand').offset().top});
                        }
                    });
                }
            }
        }
    }); 

    /*--Service--*/
    //서비스 Mouse Active
    $('.mainPc .service').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.brand').offset().top});
        }else if (delta < 1) { //휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.magazine').offset().top});
            setTimeout(function(){
                $('.mainPc .magazine .textPos h3').addClass('on');
                $('.mainPc .magazine .slideWrap').addClass('active');
            }, 400);
            setTimeout(function(){
                $('.mainPc .magazine .textPos div').addClass('on');
            }, 600);
        }
    });
    //서비스1 Hover
    $('.mainPc .service .service1 .fakeWrap').hover(function () {
        $('.mainPc .service').addClass('on')
        $('.mainPc .service .service1').addClass('isFocus'); 
        $('.mainPc .service .service2').addClass('isFocusOut'); 
        $('.mainPc .service .service3').addClass('isFocusOut'); 
        $('.mainPc .service .service4').addClass('isFocusOut'); 
    }, function () {
        $('.mainPc .service').removeClass('on')
        $('.mainPc .service .service1').removeClass('isFocus'); 
        $('.mainPc .service .service2').removeClass('isFocusOut'); 
        $('.mainPc .service .service3').removeClass('isFocusOut'); 
        $('.mainPc .service .service4').removeClass('isFocusOut'); 
    })
    //서비스2 Hover
    $('.mainPc .service .service2 .fakeWrap').hover(function () {
        $('.mainPc .service').addClass('on2')
        $('.mainPc .service .service1').addClass('isFocusOut'); 
        $('.mainPc .service .service2').addClass('isFocus'); 
        $('.mainPc .service .service3').addClass('isFocusOut'); 
        $('.mainPc .service .service4').addClass('isFocusOut'); 
    }, function () {
        $('.mainPc .service').removeClass('on2')
        $('.mainPc .service .service1').removeClass('isFocusOut'); 
        $('.mainPc .service .service2').removeClass('isFocus'); 
        $('.mainPc .service .service3').removeClass('isFocusOut'); 
        $('.mainPc .service .service4').removeClass('isFocusOut'); 
    })
    //서비스3 Hover
    $('.mainPc .service .service3 .fakeWrap').hover(function () {
        $('.mainPc .service').addClass('on3')
        $('.mainPc .service .service1').addClass('isFocusOut'); 
        $('.mainPc .service .service2').addClass('isFocusOut'); 
        $('.mainPc .service .service3').addClass('isFocus'); 
        $('.mainPc .service .service4').addClass('isFocusOut'); 
    }, function () {
        $('.mainPc .service').removeClass('on3')
        $('.mainPc .service .service1').removeClass('isFocusOut'); 
        $('.mainPc .service .service2').removeClass('isFocusOut'); 
        $('.mainPc .service .service3').removeClass('isFocus'); 
        $('.mainPc .service .service4').removeClass('isFocusOut'); 
    })
    //서비스4 Hover
    $('.mainPc .service .service4 .fakeWrap').hover(function () {
        $('.mainPc .service').addClass('on4')
        $('.mainPc .service .service1').addClass('isFocusOut'); 
        $('.mainPc .service .service2').addClass('isFocusOut'); 
        $('.mainPc .service .service3').addClass('isFocusOut'); 
        $('.mainPc .service .service4').addClass('isFocus'); 
    }, function () {
        $('.mainPc .service').removeClass('on4')
        $('.mainPc .service .service1').removeClass('isFocusOut'); 
        $('.mainPc .service .service2').removeClass('isFocusOut'); 
        $('.mainPc .service .service3').removeClass('isFocusOut'); 
        $('.mainPc .service .service4').removeClass('isFocus'); 
    })

    /*--Magazine--*/
    //매거진 Mouse Active
    $('.mainPc .magazine .blank1').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.service').offset().top});
        }else if (delta < 1) { //휠 아래로 내림
            $('.mainPc .magazine .textPos').addClass('on');
            $('.mainPc .magazine .slideWrap').addClass('on');
            $('.mainPc .magazine .blank1').css('z-index','1');
            $('.mainPc .magazine .blank2').css('z-index','3');
            $('.mainPc .magazine .blank3').css('z-index','2');
        }
    });
    $('.mainPc .magazine .blank2').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('.mainPc .magazine .slideWrap').removeClass('on');
            $('.mainPc .magazine .textPos').removeClass('on');
            $('.mainPc .magazine .blank1').css('z-index','3');
            $('.mainPc .magazine .blank2').css('z-index','2');
            $('.mainPc .magazine .blank3').css('z-index','1');
        }else if (delta < 1) { //휠 아래로 내림
            $('.mainPc .magazine .slideWrap').addClass('endActive');
            $('.mainPc .magazine .blank1').css('z-index','2');
            $('.mainPc .magazine .blank2').css('z-index','1');
            $('.mainPc .magazine .blank3').css('z-index','3');
        }
    });
    $('.mainPc .magazine .blank3').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('.mainPc .magazine .slideWrap').removeClass('endActive');
            $('.mainPc .magazine .blank1').css('z-index','1');
            $('.mainPc .magazine .blank2').css('z-index','3');
            $('.mainPc .magazine .blank3').css('z-index','2');
        }else if (delta < 1) { //휠 아래로 내림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.appDownload').offset().top});
            setTimeout(function(){
                $('.mainPc .appDownload article').addClass('on');
            }, 400);
            setTimeout(function(){
                $('.mainPc .appDownload article > h3').addClass('on');
            },800);
            setTimeout(function(){
                $('.mainPc .appDownload article div').addClass('on');
            },1000);
            setTimeout(function(){
                $('.mainPc .appDownload article div').addClass('on');
            },1000);
        }
    });
    
    /*--AppDownload--*/
    //앱다운로드 Mouse Active
    $('.mainPc .appDownload').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.magazine').offset().top});
        }else if (delta < 1) { //휠 아래로 내림
            var offsetBottom = ($('.mainPc').offset().top + $('.mainPc').outerHeight()) - $('.mainPc .newsLetter').outerHeight() - $('footer').outerHeight();
            console.log(offsetBottom)
            $('html, body').stop().animate({ scrollTop: offsetBottom});
            $('.mainPc .newsLetter .blank').show();
        }
    });

    /*--NewsLetter--*/
    //뉴스레터 Mouse Active
    $('.mainPc .newsLetter').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.appDownload').offset().top});
            $('.mainPc .newsLetter .blank').hide();
        }else if (delta < 1) { //휠 아래로 내림
            var scrollBottom = $(document).height();
            $('html, body').animate({ scrollTop: scrollBottom });
            $('.mainPc .newsLetter .blank').hide();
            
        }
    });
    /*--Footer--*/
    //푸터 Mouse Active
    $('footer').on('mousewheel', function (event, delta) {
        if (delta > 0) { //휠 위로올림
            $('html, body').stop().animate({ scrollTop: $('.mainPc section.appDownload').offset().top});
        }
    });
})