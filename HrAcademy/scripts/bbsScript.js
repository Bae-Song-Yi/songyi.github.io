$(document).ready(function () {
    //Sub Content Control(Common)
    $('.sub .cntnControl .views li a').click(function () {
        $('.sub .cntnControl .views li a').removeClass('on');
        $(this).addClass('on');
        $('.commBoardList .listData').hide();
        $($(this).attr('href')).show();
        if ($('.commBoardList .listData.typeImg').css('display') == 'none') {
            $('.sub .depMenu > ul').hide();
        } else {
            $('.sub .depMenu > ul').css('display', 'inline-block');
        }
        return false;
    });
    //게시판-이미지형 목록(공통-이미지형-제목)
    $('.commBoardList .listData.typeImg .tit span').each(function () {
        var length = 40;
        $(this).each(function () {
            if ($(this).text().length >= length) {
                $(this).text($(this).text().substr(0, length) + '...');
            }
        });
    });
    //게시판-상세-답글
    $('.commBoardDetails .reply td.text a').click(function () {
        var scrollPos = $(this).parents('tr').offset().top;
        $(this).parents('tr').next('tr').find('.re_reply').slideDown();
        $('html, body').animate({ scrollTop: scrollPos - 100 }, 600);
        return false;
    });
    //댓글 Table Cell
    $('.commBoardDetails .reply tr').each(function () {
        var tdLength = $(this).children('td').length;
        if (tdLength == 1) {
            $(this).find('.text').attr('colspan', 2);
        }
    })
    //HR컨텐츠(Depth메뉴)
    var subDepthTags = $('.sub.hrCntn .depMenu > ul').html();
    $('.hrCntn .listData.typeList .listDepth ul').html(subDepthTags);
    //Faq
    $('.academyNews .faq tr.question').click(function () {
        var objTitle = $(this).children('td.tit');
        if (objTitle.hasClass('on')) {
            objTitle.removeClass('on');
            $(this).next('tr.answer').find('div').slideUp();
        } else {
            objTitle.addClass('on');
            $(this).next('tr.answer').find('div').slideDown();
        }
    });
    function faqFunction() {
        if ($(window).width() <= 520) {
            $('.academyNews .faq tr.answer td').removeAttr('colspan');
        } else {
            $('.academyNews .faq tr.answer td').attr('colspan' , 3);
        }
    }
    faqFunction();
    //말줄임표
    function Ellipsis(){
        if ($(window).width() > 769) {
            var length = 58;
            $('.ellipsis').each(function () {
                if ($('.ellipsis').text().length >= length) {
                    $('.ellipsis').text($('.ellipsis').text().substr(0, length) + '...');
                }
            });
        }else {
            $('.ellipsis').each(function () {
                var length = 123;
                if ($('.ellipsis').text().length >= length) {
                    $('.ellipsis').text($('.ellipsis').text().substr(0, length) + '...');
                }
            });
        }  
    }
    Ellipsis();
    $(window).resize(function () {
        faqFunction();
        Ellipsis();
    });
    //첨부파일
    $('.commBoardWrite .addFile .hidden_btn').on('change', function () {
        var addFileName = $(this).val();
        $(this).parent('.addFile').find('.fileName').val(addFileName);
    });
    //과정검색(팝업)
    $('.recEdit .tit a').click(function () {
        $('.recommendPopup').show();
        return false;
    });
    $('.recommendPopup .recData .close, .recEdit .cell_body td a.sel').click(function () {
        $('.recommendPopup').hide();
        return false;
    });
    //수강생 교육후기 평점
    $('.eduReviewWrite p.score .star').click(function () {
        $(this).addClass('on')
        $(this).prevAll('.star').addClass('on')
        $(this).nextAll('.star').removeClass('on')
    });
});