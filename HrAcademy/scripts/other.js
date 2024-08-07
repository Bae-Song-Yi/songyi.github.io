$(document).ready(function () {
    //공통탭
    $('.sub .centerLink a,.sub .depMenu .mo_menu a').click(function () {
        $('section.content').hide();
        var objLink = $(this).attr('href');
        var objText = $(this).text();
        $(objLink).show();
        $('.sub .topBanner .nowPage span').text(objText);
        $('.sub .depMenu .mo_menu ul').slideUp();
        return false;
    });
    //위탁교육 문의하기
    $('.consignment .info .btns a.btn2').click(function () {
        var scrollPos = $(this).parents('.btns').offset().top;
        $('html, body').animate({ scrollTop: scrollPos }, 600);
        $($(this).attr('href')).slideToggle();
        return false;
    })
});