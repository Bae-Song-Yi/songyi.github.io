$(document).ready(function () {
    /*----------뉴스----------*/
    $('.news .commBoardList .typeGallery li.thumb a').each(function () {
        var objSRCpc = $(this).find('img').attr('src');
        $(this).css('background-image', 'url(' + objSRCpc + ')');
    });
});