$(document).ready(function () {
    //Login
    $('.loginWrap input.logEnter').focusout(function () {
        if ($(this).val() == false) {
            $(this).removeClass('on');
        } else {
            $(this).addClass('on');
        }
    });
    //Header
    $('header .ctrl a').click(function () {
        if ($(this).hasClass('off')) {
            $(this).removeClass('off');
            $('#container').stop().animate({ 'padding-left': 278 });
            $('nav div.depth2').stop().animate({ 'left': 78 });
        } else {
            $(this).addClass('off');
            $('#container').stop().animate({ 'padding-left': 78 });
            $('nav div.depth2').stop().animate({ 'left': '-200px' });
        }
        return false;
    });
    //회원정보변경
    $('header a.change').click(function () {
        $('.layerPopup.infoChange').fadeIn();
        var popupSizeWD = $('.infoChange .popData').outerWidth();
        var popupSizeHT = $('.infoChange .popData').outerHeight();
        $('.infoChange .popData').css({
            'margin-left': - popupSizeWD / 2,
            'margin-top': - popupSizeHT / 2
        })
        return false;
    });
    $('.layerPopup.infoChange .close, .layerPopup.infoChange a.cancle').click(function () {
        $('.layerPopup.infoChange').fadeOut();
        return false;
    });
    //GNB
    function menuSize() {
        var windowHT = $(window).height();
        var headerHT = $('header').outerHeight();
        var footerHT = $('footer').outerHeight();
        $('nav ul.depth1').css('height', windowHT - headerHT);
        $('nav div.depth2 , nav div.depth2 dl').css('height', windowHT - headerHT - footerHT);
    }
    $('nav ul.depth1 li a').click(function () {
        $('nav ul.depth1 li a').removeClass('on');
        $(this).addClass('on');
        $('nav div.depth2 dl').stop().animate({ 'left': '-100%' })
        $($(this).attr('href')).stop().animate({ 'left': 0 });
        var containerPL = parseInt($('#container').css('padding-left'));
        if (containerPL == 78) {
            $('header .ctrl a').removeClass('off');
            $('#container').stop().animate({ 'padding-left': 278 });
            $('nav div.depth2').stop().animate({ 'left': 78 });
        }
        return false;
    });
    $('nav div.depth2 dd > a.hasDepth').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).next('.depth3').slideUp();
        } else {
            $('nav div.depth2 dd .depth3').slideUp();
            $('nav div.depth2 dd > a.hasDepth').removeClass('on');
            $(this).addClass('on');
            $(this).next('.depth3').slideDown();
        }
        return false;
    })

    //Container
    function containerSize() {
        var windowHT = $(window).height();
        var headerHT = $('header').outerHeight();
        var footerHT = $('footer').outerHeight();
        $('#container').css({
            'margin-top': headerHT,
            'height': windowHT - headerHT - footerHT
        });
    }
    //Common Table(상단헤더)
    $('.hasTopTH').each(function () {
        var cellSizeGroup = $(this).find('.cellHeader table colgroup')[0].outerHTML;
        $(this).find('.cellBody table').prepend(cellSizeGroup); 
    });
    function hasTopCellHeaderTable() {
        var containerHT = $('#container').outerHeight();
        var topContentHT = $('.topCntn').outerHeight();
        var boardControl = $('.bodyCntn .boardCtrl').outerHeight();
        var cellHeaderHT = $('.hasTopTH .cellHeader').outerHeight();
        var pagingHT = $('.paging').outerHeight();
        var CellBodySize = containerHT - (topContentHT + boardControl + cellHeaderHT + pagingHT);
        $('.hasTopTH .cellBody').css('max-height', CellBodySize);
        if (CellBodySize <= $('.hasTopTH .cellBody table').height()) {
            $('.hasTopTH .cellHeader').css('padding-right', 7);
        }
    }
    menuSize();
    containerSize();
    hasTopCellHeaderTable();
    $(window).resize(function () {
        menuSize();
        containerSize();
        hasTopCellHeaderTable();
    });
    //Menu ON
    function menuOnfun() {
        //기본설정(공통)
        if ($('#container').hasClass('basicMgmt')) {
            $('nav .depth1 li.dep1-1 a').addClass('on');
            $('nav .depth2 .dep2-1').addClass('view');
        }
        //기본설정(메인 배너관리)
        if ($('#container').hasClass('mainBannerMgmt') || $('#container').hasClass('mainBannerReg')) {
            $('nav .depth2 .dep2-1 dd > a:first-child').addClass('on');
        }
        //기본설정(메인브랜드 배너관리)
        if ($('#container').hasClass('mainBrandMgmt')) {
            $('nav .depth2 .dep2-1 dd > a:nth-child(2)').addClass('on');
        }
        //기본설정(팝업관리)
        if ($('#container').hasClass('popupMgmt') || $('#container').hasClass('popupReg')) {
            $('nav .depth2 .dep2-1 dd > a:nth-child(3)').addClass('on');
        }
        //브랜드관리(공통)
        if ($('#container').hasClass('brandMgmt')) {
            $('nav .depth1 li.dep1-2 a').addClass('on');
            $('nav .depth2 .dep2-2').addClass('view');
        }
        //브랜드관리(브랜드배너관리-공통)
        if ($('#container').hasClass('brandBannerMgmt')) {
            $('nav .depth2 .dep2-2 dd > a:first-child').addClass('on');
            $('.depth3.dep3-1').addClass('view');
        }
        //브랜드관리(브랜드배너관리-KR)
        if ($('#container').hasClass('brandBannerMgmt KR')) {
            $('.depth3.dep3-1 > a:first-child').addClass('on');
        }
        //브랜드관리(브랜드배너관리-EN)
        if ($('#container').hasClass('brandBannerMgmt EN')) {
            $('.depth3.dep3-1 > a:nth-child(2)').addClass('on');
        }
        //브랜드관리(브랜드배너관리-CN)
        if ($('#container').hasClass('brandBannerMgmt CN')) {
            $('.depth3.dep3-1 > a:nth-child(3)').addClass('on');
        }
        //브랜드관리(로만손 제품 관리-공통)
        if ($('#container').hasClass('romansonMgmt')) {
            $('nav .depth2 .dep2-2 dd > a:nth-child(3)').addClass('on');
            $('.depth3.dep3-2').addClass('view');
        }
        //브랜드관리(로만손 제품 관리-카테고리 관리)
        if ($('#container').hasClass('romansonMgmt category')) {
            $('.depth3.dep3-2 > a:first-child').addClass('on');
        }
        //브랜드관리(로만손 제품 관리-카테고리 관리)
        if ($('#container').hasClass('romansonMgmt productList') || $('#container').hasClass('romansonMgmt productReg')) {
            $('.depth3.dep3-2 >a:nth-child(2)').addClass('on');
        }
        //브랜드관리(뮤즈관리)
        if ($('#container').hasClass('museMgmt') || $('#container').hasClass('museReg')) {
            $('nav .depth2 .dep2-2 dd > a:nth-child(5)').addClass('on');
        }
        //브랜드관리(매장관리-공통)
        if ($('#container').hasClass('shopMgmt')) {
            $('nav .depth2 .dep2-2 dd > a:nth-child(6)').addClass('on');
            $('.depth3.dep3-3').addClass('view');
        }
        //브랜드관리(매장관리-국내)
        if ($('#container').hasClass('shopMgmt domestic') || $('#container').hasClass('shopMgmt domesticReg')) {
            $('.depth3.dep3-3 > a:first-child').addClass('on');
        }
        //브랜드관리(매장관리-국내)
        if ($('#container').hasClass('shopMgmt overseas') || $('#container').hasClass('shopMgmt overseasReg')) {
            $('.depth3.dep3-3 > a:nth-child(2)').addClass('on');
        }
        //게시판관리(공통)
        if ($('#container').hasClass('bbsMgmt')) {
            $('nav .depth1 li.dep1-3 a').addClass('on');
            $('nav .depth2 .dep2-3').addClass('view');
        }
        //게시판관리(공고)
        if ($('#container').hasClass('notifMgmt') || $('#container').hasClass('notifReg')) {
            $('nav .depth2 .dep2-3 dd > a:first-child').addClass('on');
        }
        //게시판관리(공지사항)
        if ($('#container').hasClass('noticeMgmt') || $('#container').hasClass('noticeReg')) {
            $('nav .depth2 .dep2-3 dd > a:nth-child(2)').addClass('on');
        }
        //게시판관리(뉴스)
        if ($('#container').hasClass('newsMgmt') || $('#container').hasClass('newsReg')) {
            $('nav .depth2 .dep2-3 dd > a:nth-child(3)').addClass('on');
        }
        //채용(공통)
        if ($('#container').hasClass('recruitMgmt')) {
            $('nav .depth1 li.dep1-4 a').addClass('on');
            $('nav .depth2 .dep2-4').addClass('view');
        }
        //채용(공고)
        if ($('#container').hasClass('recruitList') || $('#container').hasClass('recruitReg')) {
            $('nav .depth2 .dep2-4 dd > a:first-child').addClass('on');
        }
        //채용(FAQ)
        if ($('#container').hasClass('faqList') || $('#container').hasClass('faqReg')) {
            $('nav .depth2 .dep2-4 dd > a:nth-child(2)').addClass('on');
        }
        //관리자관리
        if ($('#container').hasClass('adminMgmt')) {
            $('nav .depth1 li.dep1-5 a').addClass('on');
            $('nav .depth2 .dep2-5').addClass('view');
            $('nav .depth2 .dep2-5 dd > a:first-child').addClass('on');
        }
        //페이지 경로
        var onDepthText = $('nav .depth1 > li > a.on span').text();
        var twoDepthText = $('nav .depth2 dd > a.on').text();
        var threeDepthText = $('nav .depth2 dl .depth3.view a.on').text();
        if ($('nav .depth2 dl .depth3').hasClass('view')) {
            $('header .location').prepend('<li>' + onDepthText + '</li><li>' + twoDepthText + '</li><li>' + threeDepthText + '</li>')
        } else {
            $('header .location').prepend('<li>' + onDepthText + '</li><li>' + twoDepthText + '</li>')
        } 
    }
    menuOnfun();
    //jQuery Datepicker
    $('.datepicker.oneDay').each(function () {
        $(this).find('.selectDate').datepicker({
            showOn: 'both',
            dateFormat: 'yy-mm-dd',
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['.01', '.02', '.03', '.04', '.05', '.06', '.07', '.08', '.09', '.10', '.11', '.12'],
            showMonthAfterYear: true,
            beforeShow: function () {
                var topPos = $(this).offset().top + $(this).outerHeight();
                var leftPos = $(this).offset().left - 1;
                setTimeout(function () {
                    $('.ui-datepicker').css({
                        'top': topPos,
                        'left': leftPos
                    })
                })
            }
        });
    });
    //jQuery Datepicker(기간선택)
    $('div.termDate').each(function () {
        $(this).find('.startDate input.start').datepicker({
            showOn: 'both',
            dateFormat: 'yy-mm-dd',
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['.01', '.02', '.03', '.04', '.05', '.06', '.07', '.08', '.09', '.10', '.11', '.12'],
            showMonthAfterYear: true,
            beforeShow: function () {
                var topPos = $(this).offset().top + $(this).outerHeight();
                var leftPos = $(this).offset().left - 1;
                setTimeout(function () {
                    $('.ui-datepicker').css({
                        'top': topPos,
                        'left': leftPos
                    })
                })
            },
            onClose: function (selectDate) {
                $(this).parents('div.termDate').find('.endDate input.end').datepicker('option', 'minDate', selectDate)
            }
        });
        $(this).find('.endDate input.end').datepicker({
            showOn: 'both',
            dateFormat: 'yy-mm-dd',
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNames: ['.01', '.02', '.03', '.04', '.05', '.06', '.07', '.08', '.09', '.10', '.11', '.12'],
            showMonthAfterYear: true,
            beforeShow: function () {
                 var topPos = $(this).offset().top + $(this).outerHeight();
                var leftPos = $(this).offset().left - 1;
                setTimeout(function () {
                    $('.ui-datepicker').css({
                        'top': topPos,
                        'left': leftPos
                    })
                })
            },
            onClose: function (selectDate) {
                $(this).parents('div.termDate').find('.startDate input.start').datepicker('option', 'maxDate', selectDate)
            }
        });
    });
    //기간 자동선택
    function autoDateButton() {
        //기간 자동선택(공통)
        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth() + 1
        var nowDay = nowDate.getDate();
        var oneWeekCount = new Date(Date.parse(nowDate) + 7 * 1000 * 60 * 60 * 24);
        var oneMonthCount = new Date(Date.parse(nowDate) + 30 * 1000 * 60 * 60 * 24);
        var twoMonthCount = new Date(Date.parse(nowDate) + 60 * 1000 * 60 * 60 * 24);
        //오늘날짜 입력
        $('.autoDateBtn a.commBtn').click(function () {
            if (nowDay <= 9 && nowMonth > 9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.startDate input.start').val(nowYear + '-' + nowMonth + '-' + '0' + nowDay)
            } else if (nowDay <= 9 && nowMonth <= 9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.startDate input.start').val(nowYear + '-' + '0'+nowMonth + '-' + '0' + nowDay)
            } else {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.startDate input.start').val(nowYear + '-' + nowMonth + '-' + nowDay)
            }
        });
        //일주일
        $('.autoDateBtn a.oneWeek').click(function () {
            if (oneWeekCount.getDate() <= 9 && oneWeekCount.getMonth() + 1 > 9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(oneWeekCount.getFullYear() + '-' + (oneWeekCount.getMonth()+1) + '-' + '0' + oneWeekCount.getDate())
            } else if (oneWeekCount.getDate() <= 9 && oneWeekCount.getMonth() + 1<=9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(oneWeekCount.getFullYear() + '-' + '0' + (oneWeekCount.getMonth()+1) + '-' + '0' + oneWeekCount.getDate())
            } else {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(oneWeekCount.getFullYear() + '-' + (oneWeekCount.getMonth()+1) + '-' + oneWeekCount.getDate())
            }
            return false;
        });
        //한달
        $('.autoDateBtn a.oneMonth').click(function () {
            if (oneMonthCount.getDate() <= 9 && oneMonthCount.getMonth() + 1 > 9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(oneMonthCount.getFullYear() + '-' + (oneMonthCount.getMonth() + 1) + '-' + '0' + oneMonthCount.getDate())
            } else if (oneMonthCount.getDate() <= 9 && oneMonthCount.getMonth() + 1 <= 9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(oneMonthCount.getFullYear() + '-' + '0' + (oneMonthCount.getMonth() + 1) + '-' + '0' + oneMonthCount.getDate())
            } else {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(oneMonthCount.getFullYear() + '-' + (oneMonthCount.getMonth() + 1) + '-' + oneMonthCount.getDate())
            }
            return false;
        });
        //두달
        $('.autoDateBtn a.twoMonths').click(function () {
            if (twoMonthCount.getDate() <= 9 && twoMonthCount.getMonth() + 1 > 9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(twoMonthCount.getFullYear() + '-' + (twoMonthCount.getMonth() + 1) + '-' + '0' + twoMonthCount.getDate())
            } else if (twoMonthCount.getDate() <= 9 && twoMonthCount.getMonth() + 1 <= 9) {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(twoMonthCount.getFullYear() + '-' + '0' + (twoMonthCount.getMonth() + 1) + '-' + '0' + twoMonthCount.getDate())
            } else {
                $(this).parents('.autoDateBtn').prev('.termDate').find('.endDate input.end').val(twoMonthCount.getFullYear() + '-' + (twoMonthCount.getMonth() + 1) + '-' + twoMonthCount.getDate())
            }
            return false;
        });
    }
    autoDateButton();
    //첨부파일
    $('.fileField .action').on('change', function () {
        if (window.FileReader) {
            var addFileName = $(this).val().split('/').pop().split('\\').pop();
        } else {
            var addFileName = $(this).val().split('/').pop().split('\\').pop();
        }
        var fileSize = this.files[0].size;
        var fileSizeKB = fileSize / 1024
        var outputFileSize = Math.ceil(fileSizeKB)
        $(this).parent('.fileField').find('.viewInfo .name').html(addFileName);
        $(this).parent('.fileField').find('.viewInfo .size').html('('+outputFileSize + 'KB)');
        $(this).parent('.fileField').find('.viewInfo').addClass('infile');
        $(this).parent('.fileField').find('.delBtn').show();
    });
    //카테고리 추가
    $('.romansonMgmt.caegory .commBtn.black , .romansonMgmt.productReg td.cate button.cateBtn').click(function () {
        $('.layerPopup.categoryAdd').fadeIn();
        var popupSizeWD = $('.categoryAdd .popData').outerWidth();
        var popupSizeHT = $('.categoryAdd .popData').outerHeight();
        $('.categoryAdd .popData').css({
            'margin-left': - popupSizeWD / 2,
            'margin-top': - popupSizeHT / 2
        })
        return false;
    });
    $('.layerPopup.categoryAdd .close, .layerPopup.categoryAdd a.cancle').click(function () {
        $('.layerPopup.categoryAdd').fadeOut();
        return false;
    });
});
//날짜입력패턴
function directDate(obj) {
    if (event.keyCode != 8) {
        if (obj.value.replace(/[0-9 \-]/g, "").length == 0) {
            let number = obj.value.replace(/[^0-9]/g, "");
            let ymd = "";
            if (number.length < 4) {
                return number;
            } else if (number.length < 6) {
                ymd += number.substr(0, 4);
                ymd += "-";
                ymd += number.substr(4);
            } else {
                ymd += number.substr(0, 4);
                ymd += "-";
                ymd += number.substr(4, 2);
                ymd += "-";
                ymd += number.substr(6);
            }
            obj.value = ymd;
        } else {
            alert("숫자 이외의 값은 입력하실 수 없습니다.");
            obj.value = obj.value.replace(/[^0-9 ^\-]/g, "");
            return false;
        }
    } else {
        return false;
    }
}
