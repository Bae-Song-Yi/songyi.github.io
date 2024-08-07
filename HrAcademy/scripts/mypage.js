$(document).ready(function () {
    //수신 설정
    $('.myPage .rcptSet .toggle span').click(function () {
        if ($(this).hasClass('on') == false) {
            $(this).addClass('on');
            $(this).find('i').animate({ 'left': 29 });
            $(this).find('input.check').prop('checked', true);
            $(this).find('input.check').attr('checked', 'checked');
            $(this).find('input.uncheck').prop('checked', false);
            $(this).find('input.uncheck').removeAttr('checked', '');
        } else {
            $(this).removeClass('on');
            $(this).find('i').animate({ 'left': 6 });
            $(this).find('input.check').prop('checked', false);
            $(this).find('input.check').removeAttr('checked', '');
            $(this).find('input.uncheck').prop('checked', true);
            $(this).find('input.uncheck').attr('checked', 'checked');
        }
        return false;
    });
    $('.myPage .rcptSet .toggle input.check').each(function () {
        if ($(this).attr('checked') == 'checked') {
            $(this).parent('span').addClass('on');
            $(this).prev('i').css({ 'left' : 29})
        }
    });
});