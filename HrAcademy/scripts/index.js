$(document).ready(function () {
    //Banner
    $('.main_banner').flexslider({
        animation: '',
        directionNav: false,
        animationLoop: true,
        controlNav: true
    });
    $('.main_banner a.prev').click(function () {
        $('.main_banner').flexslider('prev');
        return false;
    });
    $('.main_banner a.next').click(function () {
        $('.main_banner').flexslider('next');
        return false;
    });
    //Latest
    $('.news_wrap .tab li a').click(function () {
        $('.news_wrap .tab li a').removeClass('on');
        $(this).addClass('on');
        $('.info_wrap .info').hide();
        $($(this).attr('href')).show();
        return false;
    });
    $('.info_wrap li p').each(function () {
        var length = 42;
        $(this).each(function () {
            if ($(this).text().length >= length) {
                $(this).text($(this).text().substr(0, length) + '...');
            }
        });
    });
    //��õ��������
    const slide = new Swiper('.recommend .swiper-container', {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 20,
        autoplay: {
            delay: 4000,
            disableOnIteraction: false,
        },
        speed: 500,
        navigation: {
            nextEl: '.recommend .swiper-button-next',
            prevEl: '.recommend .swiper-button-prev'
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 1,
            }
        }
    });
    //�����ı�
    const slide2 = new Swiper('.review .swiper-container', {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 20,
        autoplay: {
            delay: 4000,
            disableOnIteraction: false,
        },
        speed: 500,
        navigation: {
            nextEl: '.review .swiper-button-next',
            prevEl: '.review .swiper-button-prev'
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 1,
            }
        }
    });
    //HR����
    const slide3 = new Swiper('.video .swiper-container', {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 20,

        autoplay: {
            delay: 4000,
            disableOnIteraction: false,
        },
        speed: 500,
        navigation: {
            nextEl: '.video .swiper-button-next',
            prevEl: '.video .swiper-button-prev'
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 1,
            }
        }
    });
    /*팝업*/
    cookiedata = document.cookie; 
    if (cookiedata.indexOf("ncookie=done") < 0) {
        $('.MainPopUp').css('display','block')
    } else {
        $('.MainPopUp').css('display', 'none')
    }
});
function setCookie( name, value, expiredays ){ 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
//팝업닫기(체크조건확인)
function closeWin() {
    if ($('input.day_chk:checked').is(":checked")) {
        todaycloseWin()
    } else {
        $('.MainPopUp').css('display', 'none')
    }
}
function todaycloseWin() {
    if ($('input.day_chk:checked').is(":checked")) {
        setCookie( "ncookie", "done" , 1 ); 
        $('.MainPopUp').css('display', 'none')
    } else {
        setCookie( "ncookie", "done" , 1 ); 
        $('.MainPopUp').css('display', 'none')
    }
}