$(document).ready(function () {
    /*----------채용공고----------*/
    //목록 제목
    $('.recruit.jobOpening .listWrap li.tit').each(function () {
        var length = 25;
        $(this).each(function () {
            if ($(this).text().length >= length) {
                $(this).text($(this).text().substr(0, length) + '...');
            }
        });
    });
    //FAQ
    $('.recruit.jobOpening .faqWrap dt').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).next('dd').stop().slideUp();
            $(this).next('dd').scrollTop(0);
        } else {
            $('.jobOpening .faqWrap dt').removeClass('on');
            $('.jobOpening .faqWrap dd').stop().slideUp();
            $(this).next('dd').stop().slideDown();
            $(this).addClass('on');
        }
    });
    /*----------입사지원----------*/
    //첨부파일
    $('.application .addFile .fileField input').MultiFile({
        accept: 'doc|docx|xls|xlsx|ppt|pptx|pdf',
        list: '.application .addFile .viewWrap',
        STRING: {
            duplicate: '$file 은 이미 추가된 파일입니다.'
        }
    });
});