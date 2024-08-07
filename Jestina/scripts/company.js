$(document).ready(function () {
    /*----------연혁----------*/
    $('.history .yearSelectWrap dt').click(function () {
        $(this).toggleClass('on');
        $(this).next('dd').slideToggle();
    });
    $('.history .yearSelectWrap dd').mouseleave(function () {
        $('.history .yearSelectWrap dt').removeClass('on');
        $(this).slideUp();
    });
    $('.history .yearSelectWrap dd a').click(function () {
        $('.history .yearSelectWrap dt').removeClass('on');
        $('.history .yearSelectWrap dd').slideUp();
        $('.history .yearData').hide();
        $($(this).attr('href')).show();
        var thisYearText = $(this).text();
        $('.history .yearSelectWrap dt span i').text(thisYearText)
        return false;
    });
    $('.history .yearInfo h5 i.prev').click(function () {
        var thisParent = $(this).parents('.yearData');
        var thisYear = thisParent.next('.yearData').find('h5 b').text();
        thisParent.hide();
        thisParent.next('.yearData').show();
        $('.history .yearSelectWrap dt span i').text(thisYear);
    });
    $('.history .yearInfo h5 i.next').click(function () {
        var thisParent = $(this).parents('.yearData');
        var thisYear = thisParent.prev('.yearData').find('h5 b').text();
        thisParent.hide();
        thisParent.prev('.yearData').show();
        $('.history .yearSelectWrap dt span i').text(thisYear);
    });
    var startX, endX;
    $(".history .yearData").on('touchstart',function(event){
        startX = event.originalEvent.changedTouches[0].screenX;
    });
    $(".history .yearData").on('touchend',function(event){
        endX=event.originalEvent.changedTouches[0].screenX;
        if(startX-endX>50){
            $(this).find('h5 .next').trigger('click')
        }else if(endX-startX>50){
            $(this).find('h5 .prev').trigger('click')
        }
    });
    $(window).scroll(function () {
        var historyContentPos = $('.history .content').offset().top;
        var headerHT = $('header').outerHeight();
        if ($(window).scrollTop() > historyContentPos) {
            $('.history .yearSelectWrap dl').addClass('fix');
            $('.history .yearSelectWrap dl').css('top', headerHT)
        }
        else {
            $('.history .yearSelectWrap dl').removeClass('fix');
            $('.history .yearSelectWrap dl').css('top', 0)
        }
    });
});