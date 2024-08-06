$(document).ready(function(){
    //메인배너 슬라이드
    const mainBannerSwiper = new Swiper(".main-slide-area", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop:true,
        autoplay: {
            delay: 2000,
        },
        navigation : {
            prevEl : '.main-slide-area .prev',
            nextEl : '.main-slide-area .next',
        },
        pagination: {
            type: 'fraction',
            el: '.main-slide-area .paging',
        },
    });

    $('.main-banner .play').click(function(){
        if($(this).hasClass('on') == false){
            $(this).addClass('on');
            mainBannerSwiper.autoplay.stop();
        }else{
            $(this).removeClass('on');
            mainBannerSwiper.autoplay.start();
        }
        
        return false;
    })

    //Recent Exhibition
    const recentExhibitionSwiper = new Swiper(".exhibition-slide-wrap", {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade', // 페이드 효과 설정
        fadeEffect: {
            crossFade: true,
        },
        speed: 1500,

        loop : true, // 무한 반복

        navigation : {
            prevEl : '.exhibition-slide-wrap .prev',
            nextEl : '.exhibition-slide-wrap .next',
        },
        pagination: {
            type: 'fraction',
            el: '.exhibition-slide-wrap .paging',
        },
    });

    /*
    * Spotlight list 기본 노출 개수 
    * 해상도 1321 이상일경우 기본 6개 노출, list card 개수 6개 이하일경우 'view more' 버튼 숨김처리
    * 해상도 1001 이상일경우 기본 5개 노출, list card 개수 5개 이하일경우 'view more' 버튼 숨김처리
    * * 해상도 721 이상일경우 기본 3개 노출, list card 개수 3개 이하일경우 'view more' 버튼 숨김처리
    */
   
    function spotlightMore(){
        const spolightList = $('.main .work-grid-type li');
        const bottomMoreBtn = $('.spotlight .bottom-more-btn');
        const windowWD = $(window).width();

        spolightList.each(function(){
            const listLength = spolightList.length;
            const listIndex =  $(this).index();
            
            if(windowWD > 1320){
                if(listLength >= 6){
                    bottomMoreBtn.show();
                }else{
                    bottomMoreBtn.hide();
                }

                if(listIndex > 5){
                    $(this).hide();
                }else{
                    $(this).show();
                }

            } else if(windowWD > 1000){
                if(listLength >= 5){
                    bottomMoreBtn.show();
                }else{
                    bottomMoreBtn.hide();
                }

                if(listIndex > 4){
                    $(this).hide();
                }else{
                    $(this).show();
                }

            } else{
                if(listLength >= 4){
                    bottomMoreBtn.show();
                }else{
                    bottomMoreBtn.hide();
                }

                if(listIndex > 3){
                    $(this).hide();
                }else{
                    $(this).show();
                }
            } 
        })
    }

    spotlightMore();

    function spotlightMediaLength(){
        if($(window).width() > 1320){
            $('.main .work-grid-type li:hidden').slice(0, 6).show();
        } else if($(window).width() > 1000){
            $('.main .work-grid-type li:hidden').slice(0, 5).show();
        } else{
            $('.main .work-grid-type li:hidden').slice(0, 4).show();
        }
    }

    function spotlightBottomMoreInit(){
        const bottomMoreBtn = $('.spotlight .bottom-more-btn');

        bottomMoreBtn.removeClass('on');
        bottomMoreBtn.find('span').text('View more');
    }

    $(window).resize(function(){
        spotlightMore();
        spotlightBottomMoreInit();
    })


    $('.spotlight .bottom-more-btn').click(function(e){
        e.preventDefault();
        const bottomMoreBtnTxt = $(this).find('span');
        
        if($(this).hasClass('on') === false){
            $(this).addClass('on');
            bottomMoreBtnTxt.text('View less');
            
            spotlightMediaLength();
        }else{
            spotlightBottomMoreInit()
            spotlightMore();
        }
    });
    
    //arte k Now 슬라이드
    const nowSwiper = new Swiper(".now-slide-wrap", {
        slidesPerView: 'auto',
        //slidesPerGroup: 5,
        spaceBetween: 0,
        navigation : {
            prevEl : '.now-slide-wrap .prev',
            nextEl : '.now-slide-wrap .next',
        },
    });

    $('.arte-now .tab a').click(function(){
        const tabText = $(this).text();
        
        $('.arte-now .swiper-slide').each(function(){
            if(tabText === $(this).find('.sns-type').text()){
                $(this).show();
            }else{
                $(this).hide();
            }
        })

        nowSwiper.update();

        return false;
    })

    const newsBannerSwiper = new Swiper(".news-banner", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            type: 'fraction',
            el: '.news-banner .paging',
        },
    });
})