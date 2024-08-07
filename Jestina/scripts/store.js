$(document).ready(function () {
    $('.store.domestic .commBoardList td.name').each(function () {
        var telNum = $(this).parent('tr').find('.tel').html();
        $(this).find('span').append(telNum)
    });
    $('.store.overseas .commBoardList td.area').each(function () {
        var areaText = $(this).html();
        $(this).parent('tr').find('.name span').append(areaText)
    });
});