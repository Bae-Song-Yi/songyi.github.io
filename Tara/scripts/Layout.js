$(document).ready(function(){
    //Common Container Padding
    function ContainerPadding(){
        var BottomDocListHT = $('.Dock .MenuList').outerHeight();
        $('.Container').css('padding-bottom' , BottomDocListHT);
        $('.Dock .DepthList').css('padding-bottom' , BottomDocListHT);
    }
    //Common Boottom Dock Menu
    $('.Dock .MenuList li a').click(function(){
        if ($(this).hasClass('on')) {
            $('.Dock').removeClass('on');
            $('.Dock .MenuList').removeClass('active');
            $(this).removeClass('on');
            $($(this).attr('href')).stop().animate({'bottom' : '-100%'});
            $('.Dock .DockCloseBG').css({'bottom' : '-100%'});
        }else{
            $('.Dock').addClass('on');
            $('.Dock .MenuList').addClass('active');
            $('.Dock .MenuList li a').removeClass('on');
            $('.Dock .DepthList').stop().animate({'bottom' : '-100%'});
            $(this).addClass('on');
            $($(this).attr('href')).stop().animate({'bottom' : 0});
            $('.Dock .DockCloseBG').css({'bottom' : 0});
        }
        return false;
    });
    $('.Dock .DepthList h5 a, .Dock .DockCloseBG').click(function(){
        $('.Dock .MenuList').removeClass('active');
        $('.Dock .MenuList li a').removeClass('on');
        $('.Dock .DepthList').stop().animate({'bottom' : '-100%'});
        $('.Dock .DockCloseBG').css({'bottom' : '-100%'});
        return false;
    });
    //Common Side Menu
    function SideMenuNav(){
        var WindowHT = $(window).height();
        var SideTopHT = $('.sideMenu .infoSearch').outerHeight();
        $('nav').css({'height' : WindowHT - SideTopHT})
    }
    $('.sideMenu nav .menuList li a').click(function(){
        $('.sideMenu nav .menuList li a').removeClass('on');
        $('.sideMenu nav .depth').hide();
        $(this).addClass('on');
        $($(this).attr('href')).show()
        return false;
    });
    //Common Title
    function CommonTitlePos(){
        var HeaderHT = $('header').outerHeight();
        $('h3.CommonTitle').css('margin-top',HeaderHT);
    }
    $('h3.CommonTitle a.PageBack').click(function () {
        if ($('.Dock').hasClass('on')) {
            $('.Dock').removeClass('on');
            $('.Dock .MenuList').removeClass('active');
            $('.Dock .MenuList li a').removeClass('on');
            $('.Dock .DepthList').stop().animate({ 'bottom': '-100%' });
        } else {
            window.history.back();
        }
        return false
    })
    //Common Tab
    $('.carWarrIndiNew .Signal').eq(2).show();
    $('.common_tab li').click(function(){
        var TabNum = $(this).index();
        $(this).find('a').addClass('on');
        $(this).siblings('li').find('a').removeClass('on');
        $('.carWarrIndiNew .Signal').eq(TabNum).show();
        $('.carWarrIndiNew .Signal').eq(TabNum).siblings('.Signal').hide();
    })
	//Common Select
    $('.SelectBox select').change(function(){
        var OptionSelect = $(this).children('option:selected').text();
        $(this).prev('input.view').val(OptionSelect);
    })
    //회원가입(공통)
    function memberJoinFun(){
        var JoinButtonHT = $('.JoinButton').outerHeight();
        $('.memberJoin').css({'padding-bottom' : JoinButtonHT});
    }
    var AgreeTitle = $('.memberJoin .Agreement h5');
    var AgreeAllChk = $('.memberJoin .Agreement h5 i');
    var AgreeOpen = $('.memberJoin .Agreement h5 .open');
    var AgreeOpenWhite = $('.memberJoin .Agreement h5 .open_white');
    var AgreeClose = $('.memberJoin .Agreement h5 .view_close');
    var AgreeCloseBlue = $('.memberJoin .Agreement h5 .view_close_blue');

    //회원가입(약관 전체동의)
    AgreeAllChk.click(function () {
        $(this).toggleClass('on');
        AgreeTitle.toggleClass('chkON');
        if ($('.memberJoin .Agreement > div').css('display')=='block' && AgreeTitle.hasClass('chkON') && $(this).hasClass('on')) {
            AgreeOpen.hide();
            AgreeOpenWhite.hide();
            AgreeCloseBlue.hide();
            AgreeClose.show();
            AgreeTitle.find('input').attr('checked', 'checked');
            AgreeTitle.find('input').prop('checked', true);
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').addClass('on');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').attr('checked', 'checked');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').prop('checked', true);
        } else if (AgreeTitle.hasClass('chkON') && $(this).hasClass('on') && $('.memberJoin .Agreement > div').css('display') == 'none') {
            AgreeOpen.hide();
            AgreeOpenWhite.show();
            AgreeCloseBlue.hide();
            AgreeClose.hide();
            AgreeTitle.find('input').attr('checked', 'checked');
            AgreeTitle.find('input').prop('checked', true);
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').addClass('on');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').attr('checked', 'checked');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').prop('checked', true);
        } else if (AgreeTitle.hasClass('chkON') == false && $(this).hasClass('on') == false && $('.memberJoin .Agreement > div').css('display') == 'none') {
            AgreeOpen.show();
            AgreeOpenWhite.hide();
            AgreeCloseBlue.hide();
            AgreeClose.hide();
            AgreeTitle.find('input').removeAttr('checked', 'checked');
            AgreeTitle.find('input').prop('checked', false);
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').removeClass('on');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').removeAttr('checked', 'checked');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').prop('checked', false);
        } else if (AgreeTitle.hasClass('chkON') == false && $('.memberJoin .Agreement > div').css('display') == 'block' && $(this).hasClass('on')==false) {
            AgreeOpen.hide();
            AgreeOpenWhite.hide();
            AgreeCloseBlue.show();
            AgreeClose.hide();
            AgreeTitle.find('input').removeAttr('checked', 'checked');
            AgreeTitle.find('input').prop('checked', false);
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').removeClass('on');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').removeAttr('checked', 'checked');
            $('.memberJoin li.required, .memberJoin li.choice, .memberJoin .c_list th').find('input').prop('checked', false);
        } else {
            AgreeOpen.show();
            AgreeOpenWhite.hide();
            AgreeCloseBlue.hide();
            AgreeClose.hide();
        }
    });
    AgreeOpen.click(function () {
        $('.memberJoin .Agreement > div').slideDown();
        AgreeTitle.animate({
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }, 500)
        $(this).hide();
        AgreeCloseBlue.show();
    });
    AgreeOpenWhite.click(function () {
        $('.memberJoin .Agreement > div').slideDown();
        AgreeTitle.animate({
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        }, 500)
        $(this).hide();
        AgreeClose.show();
    })
    AgreeCloseBlue.click(function () {
        $('.memberJoin .Agreement > div').slideUp();
        AgreeTitle.animate({
            borderBottomLeftRadius: '1.4rem',
            borderBottomRightRadius: '1.4rem'
        }, 500)
        $(this).hide();
        AgreeOpen.show();
    });
    AgreeClose.click(function () {
        $('.memberJoin .Agreement > div').slideUp();
        AgreeTitle.animate({
            borderBottomLeftRadius: '1.4rem',
            borderBottomRightRadius: '1.4rem'
        }, 500)
        $(this).hide();
        AgreeOpenWhite.show();
    })
    $('.memberJoin li.required').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).find('input').removeAttr('checked', 'checked');
            $(this).find('input').prop('checked', false);
        } else {
            $(this).addClass('on');
            $(this).find('input').attr('checked', 'checked');
            $(this).find('input').prop('checked', true);
        }
        if ($('.memberJoin li.required.on').length == 2 && $('.memberJoin li.choice.on') == 1) {
            AgreeAllChk.addClass('on')
            AgreeAllChk.find('input').attr('checked', 'checked');
            AgreeAllChk.find('input').prop('checked', true);
        } else {
            AgreeAllChk.removeClass('on')
            AgreeAllChk.find('input').removeAttr('checked', 'checked');
            AgreeAllChk.find('input').prop('checked', false);
        }
    });
    function memberJoinAllCheck() {
        if ($('.memberJoin li.required.on').length == 2 && $('.memberJoin li.choice.on').length == 1) {
            AgreeAllChk.addClass('on');
            AgreeTitle.addClass('chkON')
            AgreeAllChk.find('input').attr('checked', 'checked');
            AgreeAllChk.find('input').prop('checked', true);
        } else {
            AgreeTitle.removeClass('chkON')
            AgreeAllChk.removeClass('on');
            AgreeAllChk.find('input').removeAttr('checked', 'checked');
            AgreeAllChk.find('input').prop('checked', false);
        }
        if (AgreeTitle.hasClass('chkON')) {
            AgreeOpen.hide();
            AgreeOpenWhite.hide();
            AgreeCloseBlue.hide();
            AgreeClose.show();
        } else {
            AgreeOpen.hide();
            AgreeOpenWhite.hide();
            AgreeCloseBlue.show();
            AgreeClose.hide();
        }
    }
    $('.memberJoin li.choice').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).find('input').removeAttr('checked', 'checked');
            $(this).find('input').prop('checked', false);
            $('.memberJoin .c_list th').removeClass('on')
            $('.memberJoin .c_list th input').removeAttr('checked', 'checked');
            $('.memberJoin .c_list th input').prop('checked', false);
        } else {
            $(this).addClass('on');
            $(this).find('input').attr('checked', 'checked');
            $(this).find('input').prop('checked', true);
            $('.memberJoin .c_list th').addClass('on')
            $('.memberJoin .c_list th input').attr('checked', 'checked');
            $('.memberJoin .c_list th input').prop('checked', true);
        }
        memberJoinAllCheck();
    });
    $('.memberJoin .c_list th').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).find('input').removeAttr('checked', 'checked');
            $(this).find('input').prop('checked', false);
        } else {
            $(this).addClass('on');
            $(this).find('input').attr('checked', 'checked');
            $(this).find('input').prop('checked', true);
        }
        if ($('.memberJoin .c_list th.on').length == 3) {
            $('.memberJoin li.choice').addClass('on');
            $('.memberJoin li.choice').attr('checked', 'checked');
            $('.memberJoin li.choice').prop('checked', true);
        } else {
            $('.memberJoin li.choice').removeClass('on');
            $('.memberJoin li.choice input').removeAttr('checked', 'checked');
            $('.memberJoin li.choice input').prop('checked', false);
        }
        memberJoinAllCheck();
    });
    //회원가입(회원정보 입력 목록토글, 자주가는 네트워크 등록 목록토글)
    $('.memberJoin .InfoEnter h5 , .memberJoin .NetworkReg h5').click(function(){
        $(this).toggleClass('on');
        $(this).next('div').toggleClass('selected');
        $(this).next('div').slideToggle();
        var ThisObjPos = $(this).parent('article').offset().top;
        var HeaderHT = $('header').outerHeight();
        var GoPosition = ThisObjPos - HeaderHT;
        $('html , body').animate({scrollTop : GoPosition})
        MemberEnterCommPhone()
        if($(this).next('div').hasClass('selected')){
            $(this).animate({
                borderBottomLeftRadius: 0, 
                borderBottomRightRadius: 0
            }, 500)
        }else{
            $(this).animate({
                borderBottomLeftRadius: '1.4rem', 
                borderBottomRightRadius: '1.4rem'
            }, 500)
        }
    });
    //회원가입(자주가는 네트워크 등록)
    $('.NetworkSearchMethod .tab a').click(function(){
        $('.NetworkSearchMethod .tab a').removeClass('on');
        $('.NetworkSearchMethod .Method').hide();
        $(this).addClass('on');
        $($(this).attr('href')).show()
        return false;
    })
    $('.memberJoin .SearchResult ul > li > a').click(function(){
        $(this).toggleClass('active');
        return false;
    })
    //차량정비이력
    function CarSelectDetails(){
        var WindowHTHalf = $(window).height() / 2;
        $('.carReprHistNew .CarSelect dd').css({'max-height' : WindowHTHalf})
    }
    $('.carReprHistNew .CarSelect dt').click(function(){
        $(this).parent('dl').toggleClass('selected');
        $(this).next('dd').slideToggle();
        if($(this).parent('dl').hasClass('selected')){
            $(this).animate({
                borderBottomLeftRadius: 0, 
                borderBottomRightRadius: 0
            }, 500)
        }else{
            $(this).animate({
                borderBottomLeftRadius: '1.4rem', 
                borderBottomRightRadius: '1.4rem'
            }, 500)
        }
    });
    $('.carReprHistNew .CarSelect dd a').click(function(){
        $(this).parents('dl').toggleClass('selected');
        $(this).parent('dd').slideToggle();
        var ThisChildrenTags = $(this).html()
        $(this).parents('dl').find('dt').html(ThisChildrenTags)
        if($(this).parent('dl').hasClass('selected')){
            $(this).parent('dd').prev('dt').animate({
                borderBottomLeftRadius: 0, 
                borderBottomRightRadius: 0
            }, 500)
        }else{
            $(this).parent('dd').prev('dt').animate({
                borderBottomLeftRadius: '1.4rem', 
                borderBottomRightRadius: '1.4rem'
            }, 500)
        }
    });
    $('.carReprHistNew .DataList dt').click(function(){
        var ThisObjPos = $(this).parent('dl').offset().top;
        var HeaderHT = $('header').outerHeight();
        var GoPosition = ThisObjPos - HeaderHT;
        if($(this).parent('dl').hasClass('selected') == false){
            $('html , body').animate({scrollTop : GoPosition})
            $('.carReprHistNew .DataList dl').removeClass('selected');
            $('.carReprHistNew .DataList dd').slideUp();
            $('.carReprHistNew .DataList dt').animate({
                borderBottomLeftRadius: '1.4rem', 
                borderBottomRightRadius: '1.4rem'
            }, 500)
            $(this).parent('dl').addClass('selected');
            $(this).next('dd').slideDown();
            $(this).animate({
                borderBottomLeftRadius: 0, 
                borderBottomRightRadius: 0
            }, 500);
        }else{
            $('html , body').animate({scrollTop : GoPosition})
            $('.carReprHistNew .DataList dl').removeClass('selected');
            $('.carReprHistNew .DataList dd').slideUp();
            $('.carReprHistNew .DataList dt').animate({
                borderBottomLeftRadius: '1.4rem',
                borderBottomRightRadius: '1.4rem'
            }, 500);
        }
        $(this).next('dd').flexslider({
            animation: '',
            directionNav: false,
            animationLoop: true,
            controlNav: true,
            slideshow: false,
            animationLoop: false
        });
    });
    /*회원정보(입력/수정 공통)*/
    function MemberEnterCommPhone(){
        var ButtonWidth = $('.MemberEnterComm .phone button').outerWidth();
        var ThisParentWidth = $('.MemberEnterComm .phone').width();
        $('.MemberEnterComm .phone input').css({'width' : ThisParentWidth - ButtonWidth})
        $('.MemberEnterComm .certnum input').css({'width' : $('.MemberEnterComm .phone input').outerWidth()})
    }
    /*나의정보수정*/
    $('.signInMngInfoNew td span').click(function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $(this).find('input').removeAttr('checked' , 'checked');
            $(this).find('input').prop('checked' , false);
            $(this).find('i').text('(선택)')
        }else{
            $(this).addClass('on');
            $(this).find('input').attr('checked' , 'checked');
            $(this).find('input').prop('checked' , true);
            $(this).find('i').text('(선택 완료)')
        }
    })
    $('.signInMngInfoNew td a.PolicyView').click(function(){
        $('.LayerPopup.PolicyPopup').show();
        return false
    });
    //아이디 / 비밀번호 찾기
    $('.findAccount .findTab li a').click(function(){
        $('.findAccount .findTab li a').removeClass('on');
        $('.findAccount article').hide();
        $(this).addClass('on');
        $($(this).attr('href')).show();
        return false;
    });
    /*소모품교환예정*/
    $('.suppReplPlanNew dl dt').click(function(){
        var ThisObjPos = $(this).parent('dl').offset().top;
        var HeaderHT = $('header').outerHeight();
        var GoPosition = ThisObjPos - HeaderHT;
        if($(this).parent('dl').hasClass('selected') == false){
            $('html , body').animate({scrollTop : GoPosition})
            $('.suppReplPlanNew dl').removeClass('selected');
            $('.suppReplPlanNew dl dd').slideUp();
            $('.suppReplPlanNew dl dt').animate({
                borderBottomLeftRadius: '1.4rem', 
            }, 500)
            $(this).parent('dl').addClass('selected');
            $(this).next('dd').slideDown();
            $(this).animate({
                borderBottomLeftRadius: 0, 
                borderBottomRightRadius: 0
            }, 500);
        }else{
            $('html , body').animate({scrollTop : GoPosition})
            $('.suppReplPlanNew dl').removeClass('selected');
            $('.suppReplPlanNew dl dd').slideUp();
            $('.suppReplPlanNew dl dt').animate({
                borderBottomLeftRadius: '1.4rem', 
                borderBottomRightRadius: '1.4rem'
            }, 500)
        }
    });
    /*전시장 찾기*/
    $('.saleCarCentFindNew .MapArea td.text a').click(function(){
        $('.saleCarCentFindNew .MapArea td.text').find('a').removeClass('on');
        $(this).addClass('on');
    })
	//네트워크 (정비예약)
    function reprResvNewNetworkTel(){
        var ParentWD = $('.reprResvNew dd.NetworkTel').width();
        var CallBtnWD = $('.reprResvNew dd.NetworkTel a').outerWidth();
        $('.reprResvNew dd.NetworkTel input').css('width',ParentWD - CallBtnWD - 25)
    }
    //정비예약 현황
    $('.reprResvCondition .tab a').click(function(){
        $('.reprResvCondition .tab a').removeClass('on');
        $('.reprResvCondition .ListData').hide();
        $('.reprResvCondition .Details').hide();
        $(this).addClass('on');
        $($(this).attr('href')).show()
        return false;
    })
    $('.reprResvCondition .ListSet > a').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).next('.Details').slideUp();
            $('html,body').stop().animate({scrollTop : $(this).parents('.ListSet').offset().top - $('header').outerHeight()})
        }else{
            $('.reprResvCondition .Details').hide()
            $('.reprResvCondition .ListSet > a').removeClass('active');
            $(this).addClass('active');
            $(this).next('.Details').slideDown();
            $('html,body').delay(500).animate({scrollTop : $(this).parents('.ListSet').offset().top - $('header').outerHeight()})
        }
        return false;
    });
    //나의차량정보2_1
    $('.myCarMngNewDrop h5').click(function () {
        if ($(this).hasClass('select') == true) {
            $(this).removeClass('select');
            $(this).next('.Detail').slideUp();
            $(this).find('.off').show();
            $(this).find('.on').hide();
            $(this).parent('article').find('.text').removeClass('select');
            $(this).animate({
                borderBottomLeftRadius: '0.6rem',
                borderBottomRightRadius: '0.6rem'
            }, 500);
            $('html,body').delay(500).animate({ scrollTop: $(this).parents('article').offset().top - $('header').outerHeight() })
        } else {
            $('.myCarMngNewDrop .Detail').slideUp();
            $('.myCarMngNewDrop h5').removeClass('select');
            $('.myCarMngNewDrop span.text').removeClass('select');
            $('.myCarMngNewDrop img.on').hide();
            $('.myCarMngNewDrop img.off').show();
            $('.myCarMngNewDrop h5').animate({
                borderBottomLeftRadius: '0.6rem',
                borderBottomRightRadius: '0.6rem'
            }, 500);
            $(this).addClass('select');
            $(this).next('.Detail').slideDown();
            $(this).find('.off').hide();
            $(this).find('.on').show();
            $(this).parent('article').find('.text').addClass('select');
            $(this).animate({
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0'
            }, 500);
            $('html,body').delay(500).animate({ scrollTop: $(this).parents('article').offset().top - $('header').outerHeight() })
        }
    });
    //네트워크 찾기
    function reprCentFindNewFunction() {
        var WindowHT = $(window).height() / 2;
        var HeaderHT = $('header').outerHeight();
        var MapAreaHeight = WindowHT - HeaderHT;
        var DockHT = $('.reprCentFindNew .Dock .MenuList').outerHeight();
        var NetworkListHT = WindowHT - HeaderHT - DockHT; 
        $('.reprCentFindNew .MapArea').height(MapAreaHeight);
        $('.reprCentFindNew .MapArea .MapData').height(MapAreaHeight);
        $('.reprCentFindNew .ListData').height(NetworkListHT)
    }
    //차량안전점검
    function vehicInspectMinHT() {
        var WindowHT = $(window).height();
        var HeaderHT = $('header').outerHeight();
        $('.vehicInspectList , .vehicInspect').css({ 'min-height': WindowHT - HeaderHT})
    }
    //차량 안전 점검표
    $('.vehicInspect .carInfo button.details').click(function () {
        $('.vehicInspect .carListPopup').show();
    });
    $('.vehicInspect .carListPopup h5 a').click(function () {
        $('.vehicInspect .carListPopup').hide();
        return false
    });
    //Layer Popup
    function LayerPopupFun(){
        var WindowHT = $(window).height();
        var HeaderHT = $('header').outerHeight();
        var LayerPopupTitle = $('.LayerPopup .tit').outerHeight();
        var PopupConMaxHeight = WindowHT - HeaderHT - LayerPopupTitle;
        $('.LayerPopup').css('top' , HeaderHT);
        $('.LayerPopup .PopContent').css('max-height' , PopupConMaxHeight);
    }
    $('.LayerPopup .tit a').click(function(){
        $('.LayerPopup').hide();
        return false;
    });
    //하단 독 숨김
    $('.vehicInspectList .termsDate td input.carNumenter, .myCarMngChange dl input, .myCarMngChange dl textarea, .myCarMngNewGrs form dd input, .myCarMngNewGrs form dd textarea').focus(function () {
        $('.Dock .MenuList').stop().animate({ 'bottom': '-100%' })
    });
    //Call Function
    ContainerPadding();
    SideMenuNav()
    CommonTitlePos();
    CarSelectDetails();
	MemberEnterCommPhone();
    memberJoinFun()
	reprResvNewNetworkTel()
    LayerPopupFun()
    reprCentFindNewFunction();
    vehicInspectMinHT()
    $(window).resize(function(){
        ContainerPadding();
        SideMenuNav()
        CommonTitlePos();
        CarSelectDetails();
        MemberEnterCommPhone();
        memberJoinFun();
        reprResvNewNetworkTel();
        LayerPopupFun();
        reprCentFindNewFunction();
        vehicInspectMinHT()
    })
});