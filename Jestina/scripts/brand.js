$(document).ready(function () {
    /*----------Common----------*/
    function brandCommFun() {
        var windowHT = $(window).height();
        var headerHT = $('header').outerHeight();
        $('.brand .subTop').css('top', headerHT);
        $('.brandVisual, .brandVisual > article').css('height', windowHT - headerHT);

        if ($(window).width() <= 812) {
            $('.brand .commImgArea').each(function () {
                var objSRCmobile = $(this).find('img.forMobile').attr('src');
                $(this).css('background-image', 'url(' + objSRCmobile + ')');
            });
        } else {
            $('.brand .commImgArea').each(function () {
                var objSRCpc = $(this).find('img.forPC').attr('src');
                $(this).css('background-image', 'url(' + objSRCpc + ')');
            });
        }
    };

    function loadPageFun() {
        if ($('.brand .content').hasClass('brandVisual')) {
            $('header').removeClass('subHeader');
            $('footer').css('margin-top', '-1px');
            $('.brandVisual .textWrap').stop().animate({ 'top': '50%' }, 1000);
            $('.brandVisual .textWrap h5').stop().animate({ 'opacity': 1 }, 1000);
            $('.brandVisual .textWrap span').stop().delay(500).animate({ 'opacity': 1 }, 1000);
            $('.brandVisual .textWrap a').stop().delay(1000).animate({ 'opacity': 1 }, 1000);
        };
    };
    function MobileBrandText() {
        var textTags = $('.brandVisual .textWrap').html();
        $('.moTextWrap').append(textTags);
    };
    brandCommFun();
    loadPageFun();
    MobileBrandText();
    $(window).resize(function () {
        brandCommFun();
    });
    /*----------ROMANSON----------*/
    function romansonLoadFun() {
        var onListText = $('.romanson .topText dd a.on').text();
        $('.romanson .topText dt i').text(onListText);
    };
    romansonLoadFun();
    /* function romansonThumbImg() {
        $('.romanson .productList .photo img').load(function () {
            $(this).each(function () {
                var thisWD = $(this).width();
                var thisHT = $(this).height();
                $(this).css({
                    'margin-left': - thisWD / 2,
                    'margin-top': - thisHT / 2
                });
            })
        })
    };
    romansonThumbImg();
    $(window).resize(function () {
        $('.romanson .productList .photo img').each(function () {
            var thisWD = $(this).width();
            var thisHT = $(this).height();
            $(this).css({
                'margin-left': - thisWD / 2,
                'margin-top': - thisHT / 2
            });
        })
    }); */
    $('.romanson .topText dt').click(function () {
        $(this).toggleClass('on');
        $(this).next('dd').slideToggle();
    });
    $('.romanson .topText dd').mouseleave(function () {
        $('.romanson .topText dt').removeClass('on');
        $('.romanson .topText dd').slideUp();
    });
    $('.romanson .topText dd a').click(function () {
        $('.romanson .topText dd a').removeClass('on');
        $(this).addClass('on');
        $('.romanson .topText dt').removeClass('on');
        $('.romanson .topText dd').slideUp();
        var onText = $(this).text();
        $('.romanson .topText dt i').text(onText);
        return false;
    });
    $(window).scroll(function () {
        var prdListPos = $('.romanson .topText').offset().top;
        var headerHT = $('header').outerHeight();
        if ($(window).scrollTop() > prdListPos) {
            $('.romanson .topText dl').addClass('fix');
            $('.romanson .topText dl').css('top', headerHT)
        }
        else {
            $('.romanson .topText dl').removeClass('fix');
            $('.romanson .topText dl').css('top', 0)
        }
    });

    $('.romanson .productDetail .photo').flexslider({
        animation: '',
        directionNav: false,
        animationLoop: true,
        controlNav: false,
        slideshow: false,
        controlNav: 'thumbnails',
        controlsContainer: '.romanson .productDetail .info .thumb',
        start: function () {
            $('.romanson .productDetail .thumb li img.flex-active').parent('li').addClass('active');
            $(".romanson .productDetail .thumb li").hover(function () {
                $(this).find('img').click();
            });
        },
        after: function () {
            $('.romanson .productDetail .thumb li img.flex-active').parent('li').addClass('active');
        },
        before: function () {
            $('.romanson .productDetail .thumb li img').parent('li').removeClass('active');
        }
    });

    function productDetailPhoto() {
        setTimeout(function () {
            $('.romanson .productDetail .photo .slides li').each(function () {
                var objImgWD = $(this).find('img').width();
                var objImgHT = $(this).find('img').height();
                $(this).find('img').css({
                    'margin-left': -objImgWD / 2,
                    'margin-top': -objImgHT / 2,
                });
            });
        })
    }
    productDetailPhoto();
    $(window).resize(function () {
        productDetailPhoto();
    });
    /*----------Archive----------*/
    function archiveLoadFun() {
        var windowHT = $(window).height();
        var headerHT = $('header').outerHeight();
        $('.archive .categoryWrap .slides > li').css('height', windowHT - headerHT);
        $('.archive .categoryWrap').css('height', windowHT - headerHT);
    };
    archiveLoadFun();
    function brandImgFun() {
        if ($(window).width() <= 812) {
            $('.archive .categoryWrap .slides > li').each(function () {
                var objSRCmobile = $(this).find('img.forMobile').attr('src');
                $(this).css('background-image', 'url(' + objSRCmobile + ')');
            });
        } else {
            $('.archive .categoryWrap .slides > li').each(function () {
                var objSRCpc = $(this).find('img.forPC').attr('src');
                $(this).css('background-image', 'url(' + objSRCpc + ')');
            });
        }
    }
    brandImgFun();
    $('.archive .yearWrap').each(function () {
        //스크롤 표시
        var categoryLength = $(this).find('.categoryWrap').length;
        if (categoryLength >= 2) {
            $(this).find('.categoryWrap').each(function () {
                $(this).addClass('eachObj');
                var nextCateText = $(this).next('.categoryWrap').find('.slides li:first-child h6 span').html();
                var prevCateText = $(this).prev('.categoryWrap').find('.slides li:first-child h6 span').html();
                $(this).append('<span class="scroll next"><i>' + nextCateText + '</i></span>');
                $(this).append('<span class="scroll prev"><i>' + prevCateText + '</i></span>');
            });
            $(this).find('.categoryWrap:first-child').each(function () {
                $(this).removeClass('eachObj');
                $(this).addClass('firstObj');
                $(this).find('.scroll').remove();
                var nextCateText = $(this).next('.categoryWrap').find('.slides li:first-child h6 span').html();
                $(this).append('<span class="scroll next"><i>' + nextCateText + '</i></span>');
            });
            $(this).find('.categoryWrap:last-child').each(function () {
                $(this).removeClass('eachObj');
                $(this).addClass('lastObj');
                $(this).find('.scroll').remove();
                var prevCateText = $(this).prev('.categoryWrap').find('.slides li:first-child h6 span').html();
                $(this).append('<span class="scroll prev"><img src="/images/icon_ban_arrow_scroll3.svg"/><i>' + prevCateText + '</i></span>');
            });
        }
        //년도 정렬
        var yearData = $(this).find('.categoryWrap:first-child .slides li:first-child h5 span').html();
        $(this).attr('data-sort', yearData);
        $(this).addClass('year' + yearData);
        $('.archive .content').html($('.archive .content > .yearWrap').sort(sortLiElements));
        function sortLiElements(a, b) {
            return parseInt($(b).data('sort')) - parseInt($(a).data('sort'));
        }
    });
    //년도 버튼생성
    function YearList() {
        var yearLength = $('.archive .yearWrap').length;
        for (var i = 0; i < yearLength; i++) {
            var yearText = $('.archive .yearWrap').eq(i).attr('data-sort');
            $('.archive .yearList .list').append('<a href=".year' + yearText + '"><span>' + yearText + '</span></a>')
        }
        $('.archive .yearWrap').eq(0).addClass('active');
        $('.archive .yearList .list a').eq(0).addClass('on')
    }
    YearList();
    //이전/다음 년도 표시
    function prevlastYear() {
        var yearListEA = $('.archive .yearList a').length;
        var lastYear = $('.archive .yearList .list a:last-child').text();
        var lastPrevYear = $('.archive .yearList .list a:last-child').prev('a').text();
        var listOverYear1 = $('.archive .yearList .list a').eq(10).text();
        var listOverYear2 = $('.archive .yearList .list a').eq(11).text();
        var listOverYear3 = $('.archive .yearList .list a:first-child').text();
        var listOverYear4 = $('.archive .yearList .list a:first-child').next('a').text();
        if (yearListEA >= 10) {
            $('.archive .prevYearList').html('<b>' + lastPrevYear + '</b>' + '<b>' + lastYear + '</b>');
            $('.archive .nextYearList').html('<b>' + listOverYear1 + '</b>' + '<b>' + listOverYear2 + '</b>');
        } else {
            $('.archive .prevYearList').html('<b>' + lastPrevYear + '</b>' + '<b>' + lastYear + '</b>');
            $('.archive .nextYearList').html('<b>' + listOverYear4 + '</b>' + '<b>' + listOverYear3 + '</b>');
        }
    }
    prevlastYear();
    function resizeYearSlectClass() {
        if ($(window).width() > 812) {
            $('.archive .yearList').addClass('forPC');
            $('.archive .yearList').removeClass('forMobile');
        } else {
            $('.archive .yearList').addClass('forMobile');
            $('.archive .yearList').removeClass('forPC');
        }
    }
    resizeYearSlectClass();
    //년도 버튼 이벤트
    $('.archive .yearList a').click(function () {
        $('.archive .yearList a').removeClass('on');
        $(this).addClass('on');
        $('.archive .yearWrap').hide();
        $($(this).attr('href')).show();
        $('.archive .yearWrap').removeClass('active');
        $($(this).attr('href')).addClass('active');
        $('html,body').stop().animate({ scrollTop: 0 });
        $('.flex-viewport').resize();
        prevlastYear();
        return false;
    });
    $('.archive .yearList.forPC a').click(function () {
        if ($('.archive .yearList a').eq(9).hasClass('on') || $('.archive .yearList a:last-child').hasClass('on')) {
            var prevLinks = $(this).prevAll().length
            for (var i = 0; i < prevLinks; i++) {
                $('.archive .yearList .list').append($('.archive .yearList .list a').eq(0))
            }
        }
    });
    $('.archive .yearList.forMobile a').click(function () {
        if ($('.archive .yearList a').eq(2).hasClass('on') || $('.archive .yearList a:last-child').hasClass('on')) {
            var prevLinks = $(this).prevAll().length
            for (var i = 0; i < prevLinks; i++) {
                $('.archive .yearList .list').append($('.archive .yearList .list a').eq(0))
            }
        }
    });
    //이전/다음 이벤트
    $('.archive .controller a.yearPrev').click(function () {
        if ($('.archive .yearList a:first-child').hasClass('on')) {
            $('.archive .yearList a:last-child').trigger('click');
        } else {
            $('.archive .yearList a.on').prev('a').trigger('click');
        }
        return false;
    });
    $('.archive .controller a.yearNext').click(function () {
        $('.archive .yearList a.on').next('a').trigger('click');
        return false;
    });
    //카테고리 스크롤 이벤트
    $('.archive .categoryWrap.firstObj .scroll.next').click(function () {
        var headerHT = $('header').outerHeight();
        var objNextCate = $(this).parents('.categoryWrap').next('.categoryWrap').offset().top;
        $('html,body').stop().animate({ scrollTop: objNextCate - headerHT });
        var lastScrollSize = $(this).parents('.yearWrap').find('.categoryWrap.lastObj .scroll.prev i').outerWidth();
        $(this).parents('.yearWrap').find('.categoryWrap.lastObj .scroll.prev').css({
            'bottom': lastScrollSize + 116
        })
        return false;
    });
    $('.archive .categoryWrap.eachObj .scroll.next').click(function () {
        var headerHT = $('header').outerHeight();
        var objNextCate = $(this).parents('.categoryWrap').next('.categoryWrap').offset().top;
        $('html,body').stop().animate({ scrollTop: objNextCate - headerHT });
        return false;
    });
    $('.archive .categoryWrap.eachObj .scroll.prev').click(function () {
        var headerHT = $('header').outerHeight();
        var objprevCate = $(this).parents('.categoryWrap').prev('.categoryWrap').offset().top;
        $('html,body').stop().animate({ scrollTop: objprevCate - headerHT });
        return false;
    });
    $('.archive .categoryWrap.lastObj .scroll.prev').click(function () {
        var headerHT = $('header').outerHeight();
        var objprevCate = $(this).parents('.categoryWrap').prev('.categoryWrap').offset().top;
        $('html,body').stop().animate({ scrollTop: objprevCate - headerHT });
        return false;
    });
    //카테고리 슬라이드
    $('.archive .categoryWrap').each(function () {
        $(this).flexslider({
            animation: '',
            directionNav: true,
            animationLoop: false,
            controlNav: true,
            slideshow: false,
            start: function () {
                $('.archive .categoryWrap').each(function () {
                    var objEA = $(this).find('.slides li').length;
                    if (objEA == 1) {
                        $(this).find('ul.flex-direction-nav').hide()
                    } else {
                        $(this).find('ul.flex-direction-nav').show()
                    }
                })
            }
        });
    });
    $(window).resize(function () {
        archiveLoadFun();
        brandImgFun();
        resizeYearSlectClass();
    });
    //모바일 Go top
    $('.archive .controller a.moTop').click(function () {
        $('html,body').stop().animate({ scrollTop: 0 });
        return false;
    });
});
$(window).scroll(function () {
    $('.archive .yearWrap').each(function () {
        var lastScrollSize = $(this).find('.categoryWrap.lastObj .scroll.prev i').outerWidth();
        $(this).find('.categoryWrap.lastObj .scroll.prev').css({
            'bottom': lastScrollSize + 116
        })
    })
})