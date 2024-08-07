$(document).ready(function(){
    /*--Main Pc--*/

    //Fix Btn
    $('.main .fixBtn .idim .close').click(function(){
        $('.main .idim').hide();
        return false;
    })
    $('.main .scrollTop').click(function(){
        $('html, body').stop().animate({ scrollTop: 0 });
        return false;
    })

    //Scroll Motion Stop/Play Common
    function scrollDisable() {
        $.fn.fullpage.setMouseWheelScrolling(false); 
        $.fn.fullpage.setAllowScrolling(false);
    }
    function scrollAble() {
        $.fn.fullpage.setMouseWheelScrolling(true); 
        $.fn.fullpage.setAllowScrolling(true);
    }

    //Main Motion
    $('.main .mainPc').fullpage({
        scrollingSpeed: 800,
        slidesNavigation: true,
        afterLoad: function (anchor, index, event) {
            if (index == 2) { //브랜드소개
                scrollDisable();
                $('.main h1 img').addClass('black');
                $('.main nav li a').addClass('black');
            /*브랜드 > 소개*/
                $('.mainPc .brand .intro .blank1').on('mousewheel', function (event, delta) {
                    if (delta > 0) { //휠 위로올림
                        setTimeout(function(){
                            scrollAble();
                        })
                    }else if (delta < 1) {//휠 아래로 내림
                        $('.main h1 img').removeClass('black');
                        $('.mainPc .brand .info .left').addClass('on');
                        setTimeout(function(){
                            $('.mainPc .brand .introPhone .intro_img').addClass('on');
                            $('.mainPc .brand .info li.txt1').stop().animate({'margin-top' : '0', 'opacity' : '1'},500);
                        }, 400);
                        setTimeout(function(){
                            $('.mainPc .brand .info li.txt2').stop().animate({'opacity' : '1'});
                        }, 600);
                        setTimeout(function(){
                            $('.mainPc .brand .info li.link').stop().animate({'opacity' : '1'});
                            $('.mainPc .brand .intro .blank1').css('z-index', '4');
                            $('.mainPc .brand .intro .blank2').css('z-index', '5');
                        }, 800)
                        scrollDisable();
                    }
                });
                $('.mainPc .brand .intro .blank2').on('mousewheel', function (event, delta) {
                    if(delta > 0){ //휠 위로 올림
                        scrollAble();
                    }else if(delta < 1){ //휠 아래로 내림
                        $('.main h1 img').addClass('black');
                        $('.mainPc .brand .proce').addClass('on');
                        $('.mainPc .brand .introPhone proce_img1').addClass('on');
                        $('.mainPc .brand .introPhone ul').css('z-index', '6');
                        
                        setTimeout(function(){
                            $('.mainPc .brand .introPhone ul').css('z-index', '0');
                            $('.mainPc .brand .procePhone').html($('.mainPc .brand .introPhone').html());
                            $('.mainPc .brand .procePhone').addClass('show');
                        }, 600)
                    }
                });
            /*브랜드 > 사용방법*/
                $('.mainPc .brand .proce .blank1').on('mousewheel', function (event, delta) {
                    if(delta > 0){ //휠 위로 올림
                        setTimeout(function(){
                            $('.mainPc .brand .proce').removeClass('on');
                            $('.mainPc .brand .introPhone ul').css('z-index', '6');
                            $('.mainPc .brand .procePhone').removeClass('show');
                            $('.main h1 img').removeClass('black');
                        }, 200);
                        setTimeout(function(){
                            $('.mainPc .brand .introPhone ul').css('z-index', '5');
                        }, 600)
                        scrollDisable();
                    }else if(delta < 1){ //휠 아래로 내림
                        $('.mainPc .brand .introPhone .proce_img1').addClass('on');
                        $('.mainPc .brand .procePhone .proce_img1').addClass('on');
                        $('.mainPc .brand .proce .blank1').css('z-index', '2');
                        setTimeout(function(){
                            $('.mainPc .brand .proce .textPos li.txt1').stop().animate({'margin-top' : '0', 'opacity' : '1'},500);
                            $('.mainPc .brand .proce .slideWrap').addClass('on');
                        }, 400);
                        setTimeout(function(){
                            $('.mainPc .brand .proce .textPos li.txt2').addClass('on');
                            $('.mainPc .brand .proce .textPos li.link').stop().animate({'opacity' : '1'});
                            $('.mainPc .brand .proce .swiper-slide').addClass('endActive');
                            $('.mainPc .brand .proce .swiper-slide div').stop().animate({'opacity' : '1'});
                            $('.mainPc .brand .proce .swiper-slide a').stop().animate({'opacity' : '1'});
                        }, 800)
                        setTimeout(function(){
                            $('.mainPc .brand .proce .hiddenArrow').css({'z-index': '3'});
                        }, 1000)
                    }
                })
                $('.mainPc .brand .proce .hiddenArrow').on('mousewheel', function (event, delta) {
                    if($('.mainPc .brand .proce .first').hasClass('swiper-slide-active') == true){
                        if(delta > 0){ //휠 위로 올림
                            setTimeout(function(){
                                $('.mainPc .brand .proce').removeClass('on');
                                $('.mainPc .brand .introPhone ul').css('z-index', '6');
                                $('.mainPc .brand .procePhone').removeClass('show');
                                $('.main h1 img').removeClass('black');
                            }, 400);
                            setTimeout(function(){
                                $('.mainPc .brand .introPhone ul').css('z-index', '5');
                            }, 600)  
                        }
                    }else if($('.mainPc .brand .proce .swiper-slide').hasClass('event') == true){
                        if(delta > 0){ //휠 위로 올림
                            setTimeout(function(){
                                $('.mainPc .brand .proce').removeClass('on');
                                $('.mainPc .brand .introPhone ul').css('z-index', '6');
                                $('.mainPc .brand .procePhone').removeClass('show');
                            }, 200)
                            setTimeout(function(){
                                $('.mainPc .brand .introPhone ul').css('z-index', '5');
                            }, 600)  
                        }
                    }else if($('.mainPc .brand .proce .swiper-slide').hasClass('last') == true){
                        if(delta < 1){ //휠 아래로 내림
                            scrollAble();
                        }
                    }
                })
            }
            if (index == 3) { //서비스
                scrollDisable();
                $('.main h1 img').removeClass('black');
                $('.main nav li a').removeClass('black');
                setTimeout(function(){
                    $('.mainPc .service').addClass('show');
                }, 200);
                setTimeout(function(){
                    $('.mainPc .service ul').addClass('on');
                }, 600);
                setTimeout(function(){
                    scrollAble();
                }, 800);
            }
            if (index == 4) { //매거진
                scrollDisable();
                $('.main h1 img').addClass('black');
                $('.main nav li a').addClass('black');
                $('.mainPc .newsLetter .blank').hide();
                setTimeout(function(){
                    $('.mainPc .magazine .textPos h3').addClass('on');
                    $('.mainPc .magazine .swiper-wrapper').addClass('active');
                });
                setTimeout(function(){
                    $('.mainPc .magazine .textPos div').addClass('on');
                }, 600);
                $('.mainPc .magazine .blank1').on('mousewheel', function (event, delta) {
                    if (delta > 0) { //휠 위로올림
                        scrollAble();
                    }else if (delta < 1) { //휠 아래로 내림
                        $('.mainPc .magazine .blank1').css('z-index', '1');
                        $('.mainPc .magazine .hiddenArrow').css('z-index', '2');
                        $('.mainPc .magazine .textPos').addClass('on');
                        $('.mainPc .magazine .swiper-wrapper').addClass('slide');
                    }
                });
            }
            if (index == 5) { // 앱다운로드
                scrollDisable();
                $('.main h1 img').removeClass('black');
                $('.main nav li a').removeClass('black');
                console.log('view5')
                setTimeout(function(){
                    $('.appDownload article').addClass('on');
                });
                setTimeout(function(){
                    $('.appDownload article div').addClass('on');
                },600);
           
                $('.mainPc .appDownload').on('mousewheel', function (event, delta) {
                    if (delta > 0){
                        scrollAble();
                    }else if (delta < 1) { //휠 아래로 내림
                        scrollAble();
                        $('.mainPc .newsLetter .blank').show();
                    }
                });
            }
            if (index == 6) { //뉴스레터
                console.log('view6')
                $('.mainFixBtn.fixBtn').hide();
                $('.newsLetter article .fixBtn').show();
                $('.newsLetter article .fixBtn').addClass('fixRemove');
                $('.newsLetter article .fixBtn .scrollTop').show();
                $('.mainPc .newsLetter .blank').on('mousewheel', function (event, delta) {
                    if (delta > 0){ //휠 위로 올림
                        $('.mainFixBtn.fixBtn').show();
                        $('.newsLetter article .fixBtn').hide();
                        $('.newsLetter article .fixBtn').removeClass('fixRemove');
                        $('.mainPc .newsLetter .blank').hide();
                        $('.newsLetter article .fixBtn .scrollTop').hide();
                    }else if (delta < 1) { //휠 아래로 내림
                        $('.main h1 img').addClass('black');
                        $('.main nav li a').addClass('black');
                    }
                });
            }
            if (index == 7) { //푸터
                console.log('view7');
                $('.mainPc .newsLetter .blank').on('mousewheel', function (event, delta) {
                    if (delta > 0){ //휠 위로 올림
                        $('.mainFixBtn.fixBtn').hide();
                        $('.newsLetter article .fixBtn').show();
                        $('.newsLetter article .fixBtn').addClass('fixRemove');
                        $('.mainPc .newsLetter .blank').show();
                        $('.newsLetter article .fixBtn .scrollTop').show();
                    }
                });
            }
        }
    });
    function mainPcSize(){
        var windowHT = $(window).height();
        $('.mainPc section article').css('height', windowHT);
    }
    mainPcSize();
    $(window).resize(function(){
        var windowHT = $(window).height();
        mainPcSize();
    })

    //Main Banner
    var swiper1 = new Swiper(".mainBanner .slideWrap", {
        slidesPerView: 1,
        mousewheel: false,
        loop: true,
        resistance: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".paging",
            type: "fraction",
        },
        navigation: {
            nextEl: ".mainBanner .next",
            prevEl: ".mainBanner .prev",
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

    //Brand Proce
    var swiper2 = new Swiper(".mainPc .proce .slideWrap", {
        slidesPerView: 1.62,
        spaceBetween: 40,
        loop:false,
        centeredSlides: true,
        mousewheel: true,
        on: {
            slideChange: function(){
                var activeStartIdx = this.activeIndex + 1;
                $('.mainPc .brand .phoneWrap .img img').attr('src','images/main/brand_proce_0' + activeStartIdx + '.jpg');
            },
            slideChangeTransitionEnd: function(){
                var activeEndIdx = this.activeIndex + 1;
                if(activeEndIdx == 1){
                    $('.mainPc .brand .proce .slideWrap .swiper-slide:nth-child(1)').addClass('event');
                    $('.mainPc .brand .proce .slideWrap .swiper-slide:nth-child(1)').removeClass('first');
                }else if(activeEndIdx == 6){
                    $('.mainPc .brand .proce .swiper-slide:nth-child(5)').addClass('last');
                }else{
                    $('.mainPc .brand .proce .slideWrap .swiper-slide:nth-child(1)').removeClass('event');
                    $('.mainPc .brand .proce .swiper-slide:nth-child(6)').removeClass('last');
                }
            }
        }
    }); 

    /*Service*/
    //Service1 hover
    $('.service .service1 .fakeWrap').hover(function () {
        $('.service').addClass('on')
        $('.service .service1').addClass('isFocus'); 
        $('.service .service2').addClass('isFocusOut'); 
        $('.service .service3').addClass('isFocusOut'); 
        $('.service .service4').addClass('isFocusOut'); 
    }, function () {
        $('.service').removeClass('on')
        $('.service .service1').removeClass('isFocus'); 
        $('.service .service2').removeClass('isFocusOut'); 
        $('.service .service3').removeClass('isFocusOut'); 
        $('.service .service4').removeClass('isFocusOut'); 
    })
    //Service2 hover
    $('.service .service2 .fakeWrap').hover(function () {
        $('.service').addClass('on2')
        $('.service .service1').addClass('isFocusOut'); 
        $('.service .service2').addClass('isFocus'); 
        $('.service .service3').addClass('isFocusOut'); 
        $('.service .service4').addClass('isFocusOut'); 
    }, function () {
        $('.service').removeClass('on2')
        $('.service .service1').removeClass('isFocusOut'); 
        $('.service .service2').removeClass('isFocus'); 
        $('.service .service3').removeClass('isFocusOut'); 
        $('.service .service4').removeClass('isFocusOut'); 
    })
    //Service3 hover
    $('.service .service3 .fakeWrap').hover(function () {
        $('.service').addClass('on3')
        $('.service .service1').addClass('isFocusOut'); 
        $('.service .service2').addClass('isFocusOut'); 
        $('.service .service3').addClass('isFocus'); 
        $('.service .service4').addClass('isFocusOut'); 
    }, function () {
        $('.service').removeClass('on3')
        $('.service .service1').removeClass('isFocusOut'); 
        $('.service .service2').removeClass('isFocusOut'); 
        $('.service .service3').removeClass('isFocus'); 
        $('.service .service4').removeClass('isFocusOut'); 
    })
    //Service4 hover
    $('.service .service4 .fakeWrap').hover(function () {
        $('.service').addClass('on4')
        $('.service .service1').addClass('isFocusOut'); 
        $('.service .service2').addClass('isFocusOut'); 
        $('.service .service3').addClass('isFocusOut'); 
        $('.service .service4').addClass('isFocus'); 
    }, function () {
        $('.service').removeClass('on4')
        $('.service .service1').removeClass('isFocusOut'); 
        $('.service .service2').removeClass('isFocusOut'); 
        $('.service .service3').removeClass('isFocusOut'); 
        $('.service .service4').removeClass('isFocus'); 
    })

    /*--Magazine--*/
    //매거진 Slide
    var swiper3 = new Swiper(".mainPc .magazine .slideWrap", {
        slidesPerView: 2.3,
        spaceBetween: 40,
        loop:false,
        mousewheel: true,
        on: {
            init:function(){
                var nowIdx = this.activeIndex + 1;
                if(nowIdx == 1){
                    $('.mainPc .magazine .slideWrap').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                           scrollAble();
                        }else if (delta < 1) { //휠 아래로 내림
                            scrollDisable();
                        }
                    });
                }
            },
            slideChangeTransitionEnd: function(){
                var activeEndIdx = this.activeIndex + 1;
                if(activeEndIdx == 4){
                    console.log('slide4')
                    $('.mainPc .magazine .slideWrap').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                            scrollDisable();
                        }else if (delta < 1) { //휠 아래로 내림
                            scrollAble();
                        }
                    });
                }else if(activeEndIdx == 1){
                    console.log('slide1')
                    $('.mainPc .magazine .slideWrap').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                            scrollAble();
                        }else if (delta < 1) { //휠 아래로 내림
                            scrollDisable();
                        }
                    });
                }else{
                    $('.mainPc .magazine .slideWrap').on('mousewheel', function (event, delta) {
                        if (delta > 0) { //휠 위로올림
                            scrollDisable();
                        }else if (delta < 1) { //휠 아래로 내림
                            scrollDisable();
                        }
                    });
                }
            }
        }
    }); 
})