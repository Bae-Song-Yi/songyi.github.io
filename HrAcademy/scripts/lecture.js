$(document).ready(function () {
    //리스트 보기방식(탭)
    $('.lectureList .cntnControl .views li a').click(function () {
        $('.lectureList .listData').attr('style', 'display:none!important');
        $($(this).attr('href')).attr('style', 'display:block!important');
        if($('.lectureList .listData.allView').attr('style') == 'display:block!important'){
            $('.sub .cntnControl.allViewControl').show();
            $('.sub .cntnControl.detailsControl').hide();
        }else{
            $('.sub .cntnControl.allViewControl').hide();
            $('.sub .cntnControl.detailsControl').show();
        }
        return false;
    });
    //결제
    $('.payment .tab li a').click(function () {
        $('.payment .tab li a').removeClass('on');
        $(this).addClass('on');
        $('.payment .tabData').hide();
        $($(this).attr('href')).show();
        if ($('.payment .tab li:nth-child(2) a').hasClass('on')) {
            $('.payment .tab li:first-child a').css('border-right', 'none');
        } else {
            $('.payment .tab li:first-child a').css('border-right', '2px solid #ffae3e');
        }
        return false;
    });
    //리뷰작성(상세)
    $('.lectureDetails .review .review_btn a').click(function () {
        $('.lectureDetails .review').hide();
        $('.lectureDetails .reviewWrite').show();
        return false;
    });
    $('.lectureDetails .reviewWrite .bottom_btn a.cancel').click(function () {
        $('.lectureDetails .review').show();
        $('.lectureDetails .reviewWrite').hide();
        return false;
    });
    //리뷰작성(상세) 평점
    $('.lectureDetails .reviewWrite p.score .star').click(function () {
        $(this).addClass('on')
        $(this).prevAll('.star').addClass('on')
        $(this).nextAll('.star').removeClass('on')
    });
    //세금계산서 첨부
    $('.lectureApply .payInfo .addFile .hidden_btn').change(function () {
        var thisValue = $(this).val();
        $(this).next('.fileName').val(thisValue)
    });
    //약관보기
    $('.lectureApply ul.terms li .checkBox a').click(function () {
        $($(this).attr('href')).show();
        return false;
    });
    //무통장입금
    $('.lectureApply .payInfo .radioButton.method').click(function () {
        var checked = $(this).find('input.bank').is(':checked');
        if (checked) {
            $('.lectureApply .payInfo ul li p.end_day').hide();
            $('.lectureApply .payInfo ul li div.info').show();
            $('.lectureApply .payInfo td.bill .cash').show();
        } else {
            $('.lectureApply .payInfo ul li p.end_day').show();
            $('.lectureApply .payInfo ul li div.info').hide();
            $('.lectureApply .payInfo td.bill .cash').hide();
        }
    });
    //세금계산서 체크
    $('.lectureApply .checkCell .checkBox').click(function () {
        var checked = $(this).find('input').is(':checked');
        if (checked) {
            $('.lectureApply .payInfo td.bill .checkInfo').show();
        } else {
            $('.lectureApply .payInfo td.bill .checkInfo').hide();
        }
    });
});