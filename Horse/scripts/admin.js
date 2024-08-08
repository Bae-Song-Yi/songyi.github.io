$(document).ready(function(){
    //Container Min Height
    function ContentMinHeight(){
        var WindowHT = $(window).height() - 80;
        $('.Container').css({'min-height' : WindowHT})
    }
    ContentMinHeight();
    window.onresize = ContentMinHeight;
    //첨부파일
    $('.AddFile .HiddenFile').on('change', function(){
        var FileName = $(this).val();
        $(this).next('.ViewFile').find('span').text(FileName);
        $(this).next('.ViewFile').find('.AddFileDel').css('display' , 'inline-block');
    });
    $('.AddFile a.AddFileDel').click(function(){
        $(this).hide();
        $(this).prev('span').html('&nbsp;');
        $(this).parent('.ViewFile').prev('.HiddenFile').val('');
    });
    //초기화관리
    $('.ResetMgmt a').click(function () {
        if ($(this).hasClass('chk')) {
            $(this).removeClass('chk');
            $(this).find('input').removeAttr('checked', 'checked');
            $(this).find('input').prop("checked", false);
        } else {
            $(this).addClass('chk');
            $(this).find('input').attr('checked', 'checked');
            $(this).find('input').prop("checked", true);
        }
        return false;
    });
});