// Exhibitions Common
function leftNavHT() {
    const artistLeftEle = document.querySelector('.artist-sec .left-wrap');
    const exRightEle = document.querySelector('.exhibitions .right-wrap');

    //null값 처리
    if (!artistLeftEle || !exRightEle) {
        return;
    }

    const rightHT = exRightEle.offsetHeight - 160;
    const windowWD = window.innerWidth;
    const isPc = windowWD > 1001;

    if (isPc) {
        artistLeftEle.style.height = `${rightHT}px`;
    } else {
        artistLeftEle.style.height = 'auto';
    }
}

leftNavHT();

/*
* 전시회 상세 페이지 
* 윈도우 스크롤 탭 영역에 도달했을경우 Fix
* 탭 Fix 됬을경우 부드러운 스크롤링을 보여주기 위해 Article영역에 탭 높이만큼 여백 추가
*/
function exhibitionElePos() {
    const artistLeftEle = document.querySelector('.artist-sec .left-wrap');
    const tabEle = document.querySelector('.exhibition-tab');
    const headerEle = document.querySelector('header');
    const article = document.querySelector('.exhibitions section article:nth-child(2)');
    const artistArticle = document.querySelector('.artist-sec article:nth-child(2)');

    if (!article) {
        return;
    }

    let tabOffsetTop = tabEle.getBoundingClientRect().top + window.scrollY;
    const tabHT = tabEle.offsetHeight;

    function handleScroll() {
        const windowScrlTop = window.scrollY;
        const headerHT = headerEle.offsetHeight;
        const windowWD = window.innerWidth;
        const isFixed = windowScrlTop > tabOffsetTop - headerHT;

        // Tab Fix
        if (isFixed) {
            tabEle.classList.add('fix');
            tabEle.style.top = `${headerHT}px`;
        } else {
            tabEle.classList.remove('fix');
            tabEle.style.top = '0';
        }

        // Window screen width
        if (windowWD > 721) {
            article.style.paddingTop = isFixed ? `${tabHT}px` : '0';

            if (artistLeftEle) {
                artistLeftEle.classList.remove('fix');
            }
        } else {
            article.style.paddingTop = isFixed ? `${tabHT + 16}px` : '0';

            if (artistLeftEle && artistArticle) {
                if (isFixed) {
                    artistLeftEle.classList.add('fix');
                    artistArticle.style.paddingTop = `${tabHT}px`;
                } else {
                    artistLeftEle.classList.remove('fix');
                    artistArticle.style.paddingTop = '0';
                }
            }
        }
    }

    window.addEventListener('scroll', handleScroll);

    handleScroll();
}

exhibitionElePos();

//상단 Poster 마우스커서
document.querySelector('.top-poster .swiper-wrapper').addEventListener('mousemove', function(e) {
    const pageX = e.pageX;
    const pageY = e.pageY;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const cursor = document.querySelector('.cursor');
    cursor.style.left = `${pageX - scrollX}px`;
    cursor.style.top = `${pageY - scrollY}px`;
});

//전시상세 > 상단 포스터 슬라이드
const posterSwiper = new Swiper(".top-poster", {
    slidesPerView: 'auto',
    spaceBetween: 8,
    pagination: {
        type: 'progressbar',
        el: '.custom-scrollbar',
    },
});

//전시상세 > 오버뷰 슬라이드
const instaSwiper = new Swiper(".exhibition-inner-slide", {
    slidesPerView: 1, //해상도 720이하
    spaceBetween: 0,
    observer: true,
    observeParents: true,
    navigation : {
        nextEl : '.exhibition-inner-slide .next',
        prevEl : '.exhibition-inner-slide .prev',
    },

    pagination: {
        el: ".exhibition-inner-slide .paging",
        type: "fraction",
        formatFractionCurrent: function (number) {
            return ('0' + number).slice(-2);
        },
        formatFractionTotal: function (number) {
            return ('0' + number).slice(-2);
        }
    }
});

//전시상세 > 마켓플레이스 무한스크롤
function infiniteScrl() {
    const artworkListEle = document.querySelectorAll('.marketplace-sec .work-grid-type li');
    const windowWD = window.innerWidth;

    artworkListEle.forEach(function(element, index) {
        if (windowWD > 721) {
            element.style.display = 'block';
            //document.querySelector('.marketplace-sec .loading').style.display = 'none';
            document.querySelector('.marketplace-sec .loading').classList.add = 'on'
        } else {
            if (index > 5) {
                element.style.display = 'none';
            }
            document.querySelector('.marketplace-sec .loading').classList.remove = 'on'
        }
    });
}

infiniteScrl();

window.addEventListener('resize', function(){
    leftNavHT();
    exhibitionElePos();
    infiniteScrl();
})


/* window.addEventListener('scroll', function(){
    const workListHidden = document.querySelector('.marketplace-sec .work-grid-type li:hidden')
    const iconLoad = document.querySelector('.marketplace-sec .loading');
    const windowWD = window.innerWidth;

    if(windowWD > 721){
        iconLoad.stop().fadeOut();
        workListHidden.fadeIn();
    }else{
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('footer').outerHeight()) {
            setTimeout(function(){
                iconLoad.stop().fadeOut();
                workListHidden.slice(0, 4).fadeIn();
            }, 1200)

            if(workListHidden.length == 0){
                iconLoad.stop().fadeOut();
            }else{
                iconLoad.stop().fadeIn(1000);
            }
        }else{
            return false;
        }
    }
})
 */

/* window.addEventListener('scroll', function(){
    //const workListHidden = document.querySelectorAll('.marketplace-sec .work-grid-type li:hidden');
    const workListHidden = document.querySelectorAll('.marketplace-sec .work-grid-type li[style*="display: none"]');
    const iconLoad = document.querySelector('.marketplace-sec .loading');
    const windowWD = window.innerWidth;

    if(windowWD > 721){
        iconLoad.classList.add('on');
        //workListHidden.fadeIn();
    }else{
        iconLoad.classList.remove('on');
    }
}) */

/* window.addEventListener('scroll', function() {
    const workListHidden = document.querySelectorAll('.marketplace-sec .work-grid-type li[style*="display: none"]');
    const iconLoad = document.querySelector('.marketplace-sec .loading');
    const windowWD = window.innerWidth;
    const windowHeight = window.innerHeight;
    //const scrollTop = window.pageYOffset;
    const scrollTop = this.window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const footerHeight = document.querySelector('footer').offsetHeight;

    if (windowWD > 721) {
        iconLoad.style.display = 'none';
        workListHidden.forEach(function(element) {
            element.style.display = 'list-item';
        });
    } else {
        if (scrollTop + windowHeight >= documentHeight - footerHeight) {
            setTimeout(function() {
                iconLoad.style.display = 'none';
                workListHidden.forEach(function(element, index) {
                    if (index < 4) {
                        element.style.display = 'list-item';
                    }
                });
            }, 1200);

            if (workListHidden.length === 0) {
                iconLoad.style.display = 'none';
            } else {
                iconLoad.style.display = 'block';
                iconLoad.style.opacity = 0;
                let fadeEffect = setInterval(function() {
                    if (!iconLoad.style.opacity) {
                        iconLoad.style.opacity = 1;
                    }
                    if (iconLoad.style.opacity > 0) {
                        iconLoad.style.opacity -= 0.1;
                    } else {
                        clearInterval(fadeEffect);
                    }
                }, 100);
            }
        }
    }
}); */



/* $(window).scroll(function () {
    const workListHidden = $('.marketplace-sec .work-grid-type li:hidden')
    const iconLoad = $('.marketplace-sec .loading');

    const windowWD = $(window).width();
    if(windowWD > 721){
        iconLoad.stop().fadeOut();
        workListHidden.fadeIn();
    }else{
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('footer').outerHeight()) {
            setTimeout(function(){
                iconLoad.stop().fadeOut();
                workListHidden.slice(0, 4).fadeIn();
            }, 1200)

            if(workListHidden.length == 0){
                iconLoad.stop().fadeOut();
            }else{
                iconLoad.stop().fadeIn(1000);
            }
        }else{
            return false;
        }
    }
}); */


$(document).ready(function(){
    /* const artistLeftEle = $('.artist-sec .left-wrap');
    const exRightEle = $('.exhibitions .right-wrap');

    // Exhibitions Common
    function leftNavHT(){
        const rightHT = exRightEle.outerHeight() - 160;
        const windowWD = $(window).width();
        const isPc = windowWD > 1001;

        artistLeftEle.css('height', isPc ? rightHT : 'auto');
    }
    leftNavHT(); */

    //Exhibitions Common Tab Position
    /* function exhibitionElePos(){
        const tabEle = $('.exhibition-tab');
        const tabOffsetTop = tabEle.offset().top;
        const tabHT = tabEle.outerHeight();
        const windowWD = $(window).width();

        const headerEle = $('header');
        const artistLeftELE = $('.artist-sec .left-wrap');

        $(window).scroll(function(){
            const windowScrlTop = $(window).scrollTop();
            const isFixed = windowScrlTop > tabOffsetTop - headerEle.outerHeight();

            tabEle.toggleClass('fix', isFixed);

            if(windowWD > 721){
                $('.exhibitions section article:nth-child(2)').css('padding-top', isFixed ? tabHT: 0);
                artistLeftELE.removeClass('fix');

            }else{
                $('.exhibitions section article:nth-child(2)').css('padding-top', isFixed ? tabHT + 16 : 0);
                $('.artist-sec article:nth-child(2)').css('padding-top', isFixed ? tabHT : 0);
                artistLeftELE.toggleClass('fix', isFixed);
            }
        })
    }
    exhibitionElePos(); */

    $(window).resize(function(){
        //leftNavHT();
        //exhibitionElePos();
        //infiniteScrl();
    })

    //상단 Poster 드래그 스크롤 (Exhibitions Common)
    /* function topPosterDragScrl() {
        const  posterEle = $('.top-poster');

        posterEle.mousemove(function (e) {
            const pageX = e.pageX;
            const pageY = e.pageY;
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
        
            const cursor = $('.cursor');
            cursor.css({'left': pageX - scrollX, 'top': pageY - scrollY});
        });
    }

    topPosterDragScrl(); */

    //전시상세 > 상단 포스터 슬라이드
    /* const posterSwiper = new Swiper(".top-poster", {
        slidesPerView: 'auto',
        spaceBetween: 8,
        pagination: {
            type: 'progressbar',
            el: '.custom-scrollbar',
        },
    }); */

    //전시상세 > 오버뷰 슬라이드
    /* const instaSwiper = new Swiper(".exhibition-inner-slide", {
        slidesPerView: 1, //해상도 720이하
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        navigation : {
            nextEl : '.exhibition-inner-slide .next',
            prevEl : '.exhibition-inner-slide .prev',
        },

        pagination: {
            el: ".exhibition-inner-slide .paging",
            type: "fraction",
            formatFractionCurrent: function (number) {
                return ('0' + number).slice(-2);
            },
            formatFractionTotal: function (number) {
                return ('0' + number).slice(-2);
            }
        }
    }); */

    //전시상세 > 마켓플레이스 무한스크롤
    /* function infiniteScrl(){
        const artworkListEle = $('.marketplace-sec .work-grid-type li');

        artworkListEle.each(function(){
            const listIndex =  $(this).index();
            const windowWD = $(window).width();
        
            if(windowWD > 721){
                $(this).show();
                $('.marketplace-sec .loading').hide();
            }else{
                if(listIndex > 5){
                    $(this).hide();
                }
            }
            
            
        })
    }
    infiniteScrl(); */

    /* $(window).scroll(function () {
        const workListHidden = $('.marketplace-sec .work-grid-type li:hidden')
        const iconLoad = $('.marketplace-sec .loading');

        const windowWD = $(window).width();
        if(windowWD > 721){
            iconLoad.stop().fadeOut();
            workListHidden.fadeIn();
        }else{
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - $('footer').outerHeight()) {
                setTimeout(function(){
                    iconLoad.stop().fadeOut();
                    workListHidden.slice(0, 4).fadeIn();
                }, 1200)
    
                if(workListHidden.length == 0){
                    iconLoad.stop().fadeOut();
                }else{
                    iconLoad.stop().fadeIn(1000);
                }
            }else{
                return false;
            }
        }
    }); */

    //전시상세 > 아티스트 좌측 작가 포커스
    const artistFocusCtrl = $('.artist-sec .left-wrap .focus-ctrl')
    function leftNavStyle(){
        if($('.artist-sec .left-wrap li').length < 2){
            artistFocusCtrl.hide();
        }
    }
    leftNavStyle();

    artistFocusCtrl.click(function(){
        const tabEle = $('.exhibition-tab');
        const tabHT = tabEle.outerHeight();
        const focusLink = $(this).attr('data-link');

        artistFocusCtrl.removeClass('on');
        $('.artist-sec .follow').hide();
        $(this).addClass('on');
        $(this).siblings('.follow').show();
        $('html, body').animate({'scrollTop': $(`.${focusLink}`).offset().top - tabHT * 2 - 16}, 1000);
        //leftNavHT();

        return false;
    })

    $('.artist-sec .mo-more-btn').click(function(){
        if($(this).hasClass('on') === false){
            $(this).addClass('on');
            $('.artist-sec .left-wrap').addClass('noneBg');
            $('.artist-sec .left-wrap .mo').addClass('on');
        }else{
            $(this).removeClass('on');
            $('.artist-sec .left-wrap').removeClass('noneBg');
            $('.artist-sec .left-wrap .mo').removeClass('on');
        }
        
        return false;
    })

    const artistWorkListSwiper = new Swiper(".artwork-slide-wrap", {
        slidesPerView: 2.38, //해상도 720이하
        spaceBetween: 16,
        breakpoints: {
            721:{
                slidesPerView: 4
            }
        }
    });









    
})