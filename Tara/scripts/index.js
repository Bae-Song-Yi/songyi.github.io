$(document).ready(function(){
    //Index Header Style
    $('header').addClass('mainType');
    function IndexHeaderType(){
        $('header').addClass('mainType');
        if ($(window).scrollTop() > 0) {
            $('header').removeClass('mainType');
        }else {
            $('header').addClass('mainType');
        }
    }
    IndexHeaderType();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('header').removeClass('mainType');
        }else {
            $('header').addClass('mainType');
        }
    });
    //Common Index Banner
    $('.IndexBanner').flexslider({
        animation: '',
        directionNav: false,
        animationLoop: true,
        controlNav: true,
        slideshow: false
    });
    function UserMSGpos(){
        var HeaderHT = $('header').outerHeight();
        $('.IndexBanner h4.user_msg').css({'top' : HeaderHT})
    }
    UserMSGpos()
    window.onresize = UserMSGpos;
    //My Menu
    $('.MyMenu article').flexslider({
        animation: '',
        directionNav: false,
        animationLoop: false,
        controlNav: false,
        slideshow: false,
        after: function(){
            if($('.MyMenu .slides li:nth-child(1)').hasClass('flex-active-slide')){
                $('.MyMenu a.ctrl.prev').removeClass('active');
                $('.MyMenu a.ctrl.prev').addClass('disabled');
            }
            if($('.MyMenu .slides li:nth-child(2)').hasClass('flex-active-slide')){
                $('.MyMenu a.ctrl.prev').addClass('active');
                $('.MyMenu a.ctrl.prev').removeClass('disabled');
                $('.MyMenu a.ctrl.next').removeClass('disabled');
                $('.MyMenu a.ctrl.next').addClass('active');
            }
            if($('.MyMenu .slides li:nth-child(3)').hasClass('flex-active-slide')){
                $('.MyMenu a.ctrl.next').removeClass('active');
                $('.MyMenu a.ctrl.next').addClass('disabled');
            }
        }
    });
    $(document).on("click", ".MyMenu a.ctrl.prev.active", function () {
        $('.MyMenu article').flexslider('prev');
        if($('.MyMenu .slides li:nth-child(1)').hasClass('flex-active-slide')){
            $('.MyMenu a.ctrl.prev').removeClass('active');
            $('.MyMenu a.ctrl.prev').addClass('disabled');
        }
        if($('.MyMenu .slides li:nth-child(2)').hasClass('flex-active-slide')){
            $('.MyMenu a.ctrl.next').removeClass('disabled');
            $('.MyMenu a.ctrl.next').addClass('active');
        }
        return false;
    });
    $(document).on("click", ".MyMenu a.ctrl.next.active", function () {
        $('.MyMenu article').flexslider('next');
        if($('.MyMenu .slides li:nth-child(2)').hasClass('flex-active-slide')){
            $('.MyMenu a.ctrl.prev').removeClass('disabled');
            $('.MyMenu a.ctrl.prev').addClass('active');
            $('.MyMenu a.ctrl.next').removeClass('disabled');
            $('.MyMenu a.ctrl.next').addClass('active');
        }
        if($('.MyMenu .slides li:nth-child(3)').hasClass('flex-active-slide')){
            $('.MyMenu a.ctrl.next').removeClass('active');
            $('.MyMenu a.ctrl.next').addClass('disabled');
        }
        return false;
    });
});