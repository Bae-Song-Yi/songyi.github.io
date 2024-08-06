//설명글 더보기
document.querySelectorAll('.artworks .toggle-btn').forEach(function(moreToggleBtn) {
    moreToggleBtn.addEventListener('click', function() {
        var artworksDescParent = this.closest('.mb-100');

        if (artworksDescParent.classList.contains('on') === false) {
            this.querySelector('span').textContent = 'View less';
            artworksDescParent.classList.add('on');
        } else {
            this.querySelector('span').textContent = 'View more';
            artworksDescParent.classList.remove('on');
        }
        event.preventDefault();
    });
});

//상단 작품 디테일컷 슬라이드
const verticalGallerySwiper = new Swiper(".artworks .vertical-slide-wrap", {
    slidesPerView: 'auto',
    spaceBetween: 0,
    direction: 'vertical',
});

const verticalSlideWrap = document.querySelector('.artworks .vertical-slide-wrap');
const verticalSlideEle = verticalSlideWrap.querySelectorAll('.swiper-slide');

verticalSlideEle.forEach(function(slide, index) {
    slide.addEventListener('click', function() {
        verticalSlideWrap.querySelectorAll('.swiper-slide.on').forEach(function(el) {
            el.classList.remove('on');
        });

        slide.classList.add('on');
        gallerySwiper.slideTo(index + 1);

        event.preventDefault();
    });
});

const gallerySwiper = new Swiper(".artworks .gallery-slide-wrap > div", {
    slidesPerView: '1',
    spaceBetween: 0,
    loop: true,
    navigation : {
        nextEl : '.gallery-slide-wrap .next',
        prevEl : '.gallery-slide-wrap .prev',
    },
    on: {
        slideChange: function () {
            verticalSlideEle.forEach(function(slide) {
                slide.classList.remove('on');
            });
            verticalSlideEle[this.realIndex].classList.add('on');
        }
    }
});

//작가의 다른작품 슬라이드
const listSwiper = new Swiper(".artworks .list-slide-wrap", {
    slidesPerView: '2.38',
    spaceBetween: 8,
    slidesOffsetBefore: 20,
    scrollbar : {
        el : '.artworks .list-slide-wrap .scroll-bar',
        draggable: true,
    },
    breakpoints: {
        1281:{
            slidesPerView: 4,
            spaceBetween: 16,
            slidesOffsetBefore: 0,
        },
        721:{
            slidesPerView: 4,
            spaceBetween: 16,
            slidesOffsetBefore: 0,
        }
    }
});

//구매안내 ~ 제품문의 아코디언메뉴
const accordionMenu = document.querySelector('.artworks .accordion-menu');
accordionMenu.querySelectorAll('li').forEach(function(menu){
    menu.addEventListener('click', function() {
        if (menu.classList.contains('on') == false) {
            accordionMenu.querySelectorAll('li').forEach(function(el) {
                el.classList.remove('on');
            });

            menu.classList.add('on');
        } else {
            menu.classList.remove('on');
        }
        event.preventDefault();
    });
})





