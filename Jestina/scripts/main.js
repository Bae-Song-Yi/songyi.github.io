$(document).ready(function () {
    /*----------Main Banner----------*/
    //��ʿ��� Size
    function mainBannerSize() {
        var windowHT = $(window).height();
        var headerHT = $('header').outerHeight();
        $('.mainBanner').css('height', windowHT - headerHT);
        $('.mainBanner .slides > li').css('height', windowHT - headerHT);
        $('.mainBanner .slides > li > a').css('height', windowHT - headerHT);
        $('.mainBanner li.typeVideo .bg').css('height', windowHT - headerHT);
        $('.mainBanner li.typeImage .bg').css('height', windowHT - headerHT);
    };
    //Ÿ��Ʋ ��ġ
    function bannerTitlePos() {
        $('.mainBanner li .tit').each(function () {
            var titleHT = $(this).outerHeight();
            $(this).css('margin-top', -titleHT);
        })
    };
    mainBannerSize();
    bannerTitlePos();
    $(window).resize(function () {
        mainBannerSize();
        bannerTitlePos();
    });
    //Action
    $('.mainBanner').flexslider({
        animation: '',
        directionNav: false,
        animationLoop: true,
        controlNav: true,
        slideshow: true,
        pausePlay: true,
        start: function () {
            $('.mainBanner .slides > li:nth-child(2) video').get(0).play();
            var activeNumber = $('.mainBanner .controller > ol > li a.flex-active span').html();
            if (activeNumber >= 10) {
                $('.mainBanner .controller > span.activeNO').html(activeNumber);
            } else {
                $('.mainBanner .controller > span.activeNO').html('0' + activeNumber);
            };
            $('.mainBanner .controller > ol > li a.flex-active span').stop().animate({ 'width': '100%' });
            function ctrlAction() {
                var bannerEA = $('.mainBanner .slides > li').length - 2;
                var pagingSize = $('.mainBanner .controller > ol').outerWidth();
                $('.mainBanner .controller > ol > li').css('width', pagingSize / bannerEA);
                if (bannerEA >= 10) {
                    $('.mainBanner .controller > span.totalNO').text(bannerEA);
                } else {
                    $('.mainBanner .controller > span.totalNO').text('0' + bannerEA);
                };
            };
            ctrlAction();
        },
        after: function () {
            if ($('.mainBanner .slides > li').hasClass('flex-active-slide')) {
                $('.mainBanner .slides > li video').get(0).pause();
                $('.mainBanner .slides > li.flex-active-slide video').get(0).play();
            }
        },
        before: function () {
            setTimeout(function () {
                var activeObj = $('.mainBanner .controller > ol > li a.flex-active');
                var activeObjSpan = $('.mainBanner .controller > ol > li a.flex-active span');
                var activeNumber = activeObjSpan.text()
                if (activeNumber >= 10) {
                    $('.mainBanner .controller > span.activeNO').text(activeNumber);
                } else {
                    ;
                    $('.mainBanner .controller > span.activeNO').text('0' + activeNumber);
                }
                if ($('.mainBanner .controller > ol > li:first-child a').hasClass('flex-active')) {
                    $('.mainBanner .controller > ol > li:first-child').nextAll('li').find('a span').css('width', 0);
                    $('.mainBanner .controller > ol > li:nth-child(2) a span').css('width', '100%');
                    $('.mainBanner .controller > ol > li:nth-child(2) a span').stop().animate({ 'width': 0 });
                } else if ($('.mainBanner .controller > ol > li:last-child a').hasClass('flex-active')) {
                    $('.mainBanner .controller > ol > li:last-child').prevAll('li').find('a span').css('width', '100%');
                    $('.mainBanner .controller > ol > li:last-child a span').css('width', '0');
                    $('.mainBanner .controller > ol > li:last-child a span').stop().animate({ 'width': '100%' });
                } else {
                    activeObj.parent('li').prev('li').find('a').addClass('end');
                    activeObjSpan.stop().animate({ 'width': '100%' });
                    activeObj.parent('li').next('li').find('a').removeClass('end');
                    activeObj.parent('li').next('li').find('a span').stop().animate({ 'width': 0 });
                };
            });
        },
        controlsContainer: $(".controller")
    });
    function ctrlAction() {
        var bannerEA = $('.mainBanner .slides > li').length - 2;
        var pagingSize = $('.mainBanner .controller > ol').outerWidth();
        $('.mainBanner .controller > ol > li').css('width', pagingSize / bannerEA);
        if (bannerEA >= 10) {
            $('.mainBanner .controller > span.totalNO').text(bannerEA);
        } else {
            $('.mainBanner .controller > span.totalNO').text('0' + bannerEA);
        };
    }
    ctrlAction();
    //��Ʈ�ѷ�
    $('.mainBanner a.ctrlBtn.prev').click(function () {
        $('.mainBanner').flexslider('prev');
        return false;
    });
    $('.mainBanner a.ctrlBtn.next').click(function () {
        $('.mainBanner').flexslider('next');
        return false;
    });
    //����� ����������
    $('.mainBanner li.typeVideo video').each(function () {
        var videoRoot = $(this).find('source').attr('src');
        $(this).append('<input type="hidden" value="' + videoRoot + '"/>');
        var hiddenValue = $(this).find('input').val();
        if ($(window).width() <= 812) {
            $(this).find('source').attr('src', '');
        } else {;
            $(this).find('source').attr('src', hiddenValue);
        }
    });
    //������ ����Ͽ� �̹���
    function mainBannerVideoType() {
        $('.mainBanner li.typeVideo').each(function () {
            var objSRCmobile = $(this).find('img.forMobile').attr('src');
            $(this).css('background-image', 'url(' + objSRCmobile + ')');
        });
    };
    mainBannerVideoType();
    //�̹��� Ÿ��
    function mainBannerImageType() {
        $('.mainBanner li.typeImage').each(function () {
            var objSRCpc = $(this).find('img.forPC').attr('src');
            var objSRCmobile = $(this).find('img.forMobile').attr('src');
            if ($(window).width() > 812) {
                $(this).css('background-image', 'url(' + objSRCpc + ')');
            } else {
                $(this).css('background-image', 'url(' + objSRCmobile + ')');
            }
        }); 
    };
    mainBannerImageType();
    $(window).resize(function () {
        mainBannerImageType();
        $('.mainBanner').flexslider();
        $('.mainBanner li.typeVideo video').each(function () {
            var hiddenValue = $(this).find('input').val();
            if ($(window).width() <= 812) {
                $(this).find('source').attr('src', '');
            } else {
                $(this).find('source').attr('src', hiddenValue);
            }
        });
        ctrlAction();
    });
    /*----------About J��ESTINA----------*/
    $(window).scroll(function () {
        var headerHT = $('header').outerHeight()
        var mainBannerPos = $('.mainBanner').offset().top;
        var brandIntro = $('.brandIntro').offset().top;
        var scroll = $(window).scrollTop();
        if (scroll >= mainBannerPos / 2) {
            $('.aboutJestina .textArea > div').stop().animate({ 'top': '50%' });
            $('.aboutJestina .textArea h5').stop().animate({
                'margin-top': '40px',
                'margin-bottom': '50px',
                'opacity': 1
            });
            $('.aboutJestina .textArea h6').stop().animate({ 'opacity': 1 });
            $('.aboutJestina .textArea span').stop().animate({ 'opacity': 1 });
        };
        if (scroll <= mainBannerPos) {
            $('.aboutJestina .textArea > div').stop().animate({ 'top': '35%' });
            $('.aboutJestina .textArea h5').stop().animate({
                'margin-top': 0,
                'margin-bottom': 0,
                'opacity': 0
            });
            $('.aboutJestina .textArea h6').stop().animate({ 'opacity': 0 });
            $('.aboutJestina .textArea span').stop().animate({ 'opacity': 0 });
        };
        if (scroll >= brandIntro - headerHT) {
            $('.aboutJestina .textArea > div').stop().animate({ 'top': '65%' });
            $('.aboutJestina .textArea h5').stop().animate({
                'margin-top': 0,
                'margin-bottom': 0,
                'opacity': 0
            });
            $('.aboutJestina .textArea h6').stop().animate({ 'opacity': 0 });
            $('.aboutJestina .textArea span').stop().animate({ 'opacity': 0 });
        };
    });
    /*----------Brand 소개----------*/
    function productFun() {
        $('.brandIntro .imgPhoto').each(function () {
            var prdImgSec = $(this).find('img.forMobile').attr('src');
            $(this).css('background-image', 'url(' + prdImgSec + ')');
        });
    };
    productFun();
    function brandMotion(){
        var brandJewelryPos = $('.brandIntro .jewelry').offset().top - 200;
        var brandHandbagPos = $('.brandIntro .handbag').offset().top - 200;
        var brandRomansonPos = $('.brandIntro .romanson').offset().top -200;
        var aboutJestinaPos = $('.aboutJestina article').offset().top - 200;
        var aboutJestinaParentPos = $('.aboutJestina').offset().top - 200;
        var latestPos = $('.latestArea').offset().top;
        var scroll = $(window).scrollTop();
        if (scroll > aboutJestinaPos) {
            $('.brandIntro .jewelry .imgPhoto .blind').addClass('showObj');
            $('.brandIntro .jewelry .cate').stop().animate({ 'opacity': 1 });
            $('.brandIntro .jewelry .name').stop().animate({ 'margin-top': '23px', 'opacity': 1});
            $('.brandIntro .jewelry .text').stop().animate({ 'margin-top': '37px', 'opacity': 1 });
            $('.brandIntro .jewelry .more').stop().animate({ 'opacity': 1});
            $('.brandIntro .jewelry .more a').stop().animate({'margin-right' : 0 });
        };
        if (scroll > brandJewelryPos) {
            $('.brandIntro .handbag .imgPhoto .blind').addClass('showObj');
            $('.brandIntro .handbag .cate').stop().animate({ 'opacity': 1 });
            $('.brandIntro .handbag .name').stop().animate({ 'margin-top': '23px', 'opacity': 1 });
            $('.brandIntro .handbag .text').stop().animate({ 'margin-top': '37px', 'opacity': 1 });
            $('.brandIntro .handbag .more').stop().animate({ 'opacity': 1});
            $('.brandIntro .handbag .more a').stop().animate({'margin-right': 0  });
        };
        if (scroll > brandHandbagPos) {
            $('.brandIntro .romanson .imgPhoto .blind').addClass('showObj');
            $('.brandIntro .romanson .cate').stop().animate({ 'opacity': 1 });
            $('.brandIntro .romanson .name').stop().animate({ 'margin-top': '23px', 'opacity': 1 });
            $('.brandIntro .romanson .text').stop().animate({ 'margin-top': '37px', 'opacity': 1 });
            $('.brandIntro .romanson .more').stop().animate({ 'opacity': 1});
            $('.brandIntro .romanson .more a').stop().animate({'margin-right': 0  });
            $('.brandIntro .jewelry .imgPhoto .blind').removeClass('showObj');
            $('.brandIntro .jewelry .cate').stop().animate({ 'opacity': 0 });
            $('.brandIntro .jewelry .name').stop().animate({ 'margin-top': '-23px', 'opacity': 0 });
            $('.brandIntro .jewelry .text').stop().animate({ 'margin-top': '-37px', 'opacity': 0 });
            $('.brandIntro .jewelry .more').stop().animate({ 'opacity': 0});
            $('.brandIntro .jewelry .more a').stop().animate({'margin-right': '40px'  });
        };
        if (scroll > brandRomansonPos) {
            $('.brandIntro .handbag .imgPhoto .blind').removeClass('showObj');
            $('.brandIntro .handbag .cate').stop().animate({ 'opacity': 0 });
            $('.brandIntro .handbag .name').stop().animate({ 'margin-top': '-23px', 'opacity': 0 });
            $('.brandIntro .handbag .text').stop().animate({ 'margin-top': '-37px', 'opacity': 0 });
            $('.brandIntro .handbag .more').stop().animate({ 'opacity': 0});
            $('.brandIntro .handbag .more a').stop().animate({'margin-right': '40px' });
        };
        if (scroll < aboutJestinaParentPos || scroll > latestPos) {
            $('.brandIntro .imgPhoto .blind').removeClass('showObj');
            $('.brandIntro .info .cate').stop().animate({ 'opacity': 0 });
            $('.brandIntro .info .name').stop().animate({ 'margin-top': '-23px', 'opacity': 0 });
            $('.brandIntro .info .text').stop().animate({ 'margin-top': '-37px', 'opacity': 0 });
            $('.brandIntro .info .more').stop().animate({ 'opacity': 0});
            $('.brandIntro .info .more a').stop().animate({'margin-right': '40px' });
        };
    }
    brandMotion();
    $(window).scroll(function () {
        brandMotion()
    });
    /*----------Brand 소개(모바일)----------*/
    $('.moBrandIntro .imgPhoto img').load(function () {
        function mobileProductFun() {
            $('.moBrandIntro .prdPhoto').each(function () {
                var prdImgSec = $(this).find('img').attr('src');
                $(this).css('background-image', 'url(' + prdImgSec + ')');
            });
        };
        mobileProductFun();
    })
    /*----------Latest----------*/
    $('.latestArea ul .text a').each(function () {
        var length = 37;
        $(this).each(function () {
            if ($(this).text().length >= length) {
                $(this).text($(this).text().substr(0, length) + '...');
            }
        });
    });
    /*----------Social Media----------*/
    $('.socialMedia li a').each(function () {
        var prdImgSec = $(this).find('img.loadImg').attr('src');
        $(this).css('background-image', 'url(' + prdImgSec + ')');
    });
    /*----------Bottom Menu----------*/
    function buttomMenufun() {
        var navTags = $('nav .menuList').html();
        $('.bottomMenu').prepend(navTags);
    };
    buttomMenufun();
});