$(document).ready(function () {
    /*매거진(Detail)*/
    //PC
    var swiper = new Swiper(".recommendSlide .slideWrap.pc", {
        slidesPerView:1,
        loop: false,
        resistance :true,
        navigation: {
            nextEl: '.ctrl a.next',
            prevEl: '.ctrl a.prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,         
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>';            
            },   
        }
    });
    //MO
    var swiper = new Swiper(".recommendSlide .moSlideWrap", {
        slidesPerView:1.89,
        spaceBetween: 40,
        loop: false,
        resistance :true,
    });
    //이벤트 & 공지 > 이벤트
    $('.eventGalleryList dl').each(function(){
        var listLength = $('.eventGalleryList dl').length;
        var listIndex =  $(this).index();
        if(listLength >= 6){
            $('.eventGalleryList .more').show();
        }else{
            $('.eventGalleryList .more').hide();
        }
        if(listIndex > 5){
            $(this).hide();
        }
    })
    $('.eventGalleryList .more').click(function(e){
        e.preventDefault();
        $('.eventGalleryList dl:hidden').slice(0, 6).show();
        if($('.eventGalleryList dl:hidden').length == 0){
            $('.eventGalleryList .more').hide();
        }
    });
    //R&D
    $('.RnD .listBoard dl').each(function(){
        var listLength = $('.RnD .listBoard dl').length;
        var listIndex =  $(this).index();
        if(listLength >= 6){
            $('.RnD .listBoard .more').show();
        }else{
            $('.RnD .listBoard .more').hide();
        }
        if(listIndex > 5){
            $(this).hide();
        }
    })
    $('.RnD .listBoard .btn').click(function(e){
        e.preventDefault();
        $('.RnD .listBoard dl:hidden').slice(0, 6).show();
        if($('.RnD .listBoard dl:hidden').length == 0){
            $('.RnD .listBoard .btn').hide();
        }
    });
    $('.RnD dl .thumb, .RnD dl dd').click(function(){
        $('.rndLayerPop').show();
        return false;
    })
    //제품
    var skinSwiper = undefined;
    function initSwiper() {
        var windowWD = $(window).width();
        if (windowWD < 721 && skinSwiper == undefined) {
            skinSwiper = new Swiper(".skinType .prdSlider", {
            slidesPerView: 1.8,
            spaceBetween: 20,
            centeredSlides: true,
            loop: false,
            pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
            });
        } else if (windowWD > 720 && skinSwiper != undefined) {
            skinSwiper.destroy();
            skinSwiper = undefined;
        }
    }
    initSwiper();
    
    //이용방법
    $('.method .proceFaq dt').click(function(){
        if($(this).parent('dl').hasClass('on') == false){
            $('.method .proceFaq dl').removeClass('on');
            $('.method .proceFaq dd').slideUp();
            $(this).parent('dl').addClass('on');
            $(this).next('dd').slideDown();
        }else{
            $(this).parent('dl').removeClass('on');
            $(this).next('dd').slideUp();
        }
        return false;
    })
    //브랜드소개
    function brandIntroSolution(){
        var windowHT = $(window).height();
        $('.brandIntro .solution > div').css('height', windowHT)
    }
    brandIntroSolution();
    $(window).resize(function(){
        initSwiper();
        brandIntroSolution();
    });
});