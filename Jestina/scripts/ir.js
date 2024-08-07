$(document).ready(function () {
    /*----------주가정보----------*/
    function priceToString(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    $('.stock .realTime .box span i').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                var realTimeNum = priceToString(Math.ceil(now));
                $(this).text(realTimeNum);
            }
        });
    });
});