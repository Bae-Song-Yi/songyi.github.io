$(document).ready(function () {
    //회원등록/수정 팝업크기
    function memberRegPopupDataSize() {
        var windowHT = $(window).height();
        $('.layerPopup.memberReg .popData').css({
            'height': windowHT - 50,
        });
    }
    //회원등록/수정 팝업위치
    function memberRegPopupSize() {
        var popupDateWD = $('.layerPopup.memberReg .popData').outerWidth();
        var popupDateHT = $('.layerPopup.memberReg .popData').outerHeight();
        $('.layerPopup.memberReg .popData').css({
            'margin-left': - popupDateWD / 2,
            'margin-top': - popupDateHT / 2
        });
    }
    //권한관리 테이블 크기
    function authorityTableFun() {
        var popupDateHT = $('.layerPopup.memberReg .popData').outerHeight();
        var topFixHT = $('.layerPopup.memberReg .hasLeftTH').outerHeight();
        var titleFirHT = $('.layerPopup.memberReg h5:first-child').outerHeight();
        var titleSecHT = $('.layerPopup.memberReg h5:nth-child(3)').outerHeight();
        var buttonHT = $('.layerPopup.memberReg .button').outerHeight();
        $('.layerPopup.memberReg .popData > div.tb').css({
            'height': popupDateHT - topFixHT - titleFirHT - titleSecHT - buttonHT
        });
    }
    function authorityCellBodySize() {
        var authorityTableHT = $('.layerPopup.memberReg .popData > div.tb').outerHeight();
        $('.layerPopup.memberReg .cellBody').css({
            'max-height': authorityTableHT - 54
        })
    }
    //팝업호출
    $('.adminMgmt .reg').click(function () {
        $('.layerPopup.memberReg').show();
        $('tr.memID , tr.passwordChg').hide();
        $('tr.memIDReg , tr.password').css('display', 'table-row');
        $('.layerPopup.memberReg h5:first-child span.text').text('회원 정보등록');
        memberRegPopupSize();
        authorityTableFun();
        authorityCellBodySize();
        return false;
    });
    $('.adminMgmt .cellBody td a').click(function () {
        $('.layerPopup.memberReg').fadeIn();
        $('tr.memID , tr.passwordChg').css('display', 'table-row');
        $('tr.memIDReg , tr.password').hide();
        $('.layerPopup.memberReg h5:first-child span.text').text('회원 정보수정');
        memberRegPopupSize();
        authorityTableFun();
        authorityCellBodySize();
        return false;
    });
    //팝업닫기
    $('.layerPopup.memberReg .close , .layerPopup.memberReg a.cancle').click(function () {
        $('.layerPopup.memberReg').hide();
        $('.authAllCheck input').prop('checked', false);
        $('.authAllCheck input').removeAttr('checked', '');
        $('.checkBox.solo.partAll input').prop('checked', false);
        $('.checkBox.solo.partAll input').removeAttr('checked', '');
        $('.checkBox.solo.each input').prop('checked', false);
        $('.checkBox.solo.each input').removeAttr('checked', '');
        return false;
    });
    memberRegPopupDataSize();
    $(window).resize(function () {
        memberRegPopupDataSize();
        memberRegPopupSize();
        authorityTableFun();
        authorityCellBodySize();
    });
    //권한관리(전체선택)
    $('.memberReg .authAllCheck input').change(function () {
        if (this.checked) {
            $('.checkBox.solo.each input').prop('checked', true);
            $('.checkBox.solo.each input').attr('checked', 'checked');
            $('.checkBox.solo.partAll input').prop('checked', true);
            $('.checkBox.solo.partAll input').attr('checked', 'checked');
        } else {
            $('.checkBox.solo.each input').prop('checked', false);
            $('.checkBox.solo.each input').removeAttr('checked', '');
            $('.checkBox.solo.partAll input').prop('checked', false);
            $('.checkBox.solo.partAll input').removeAttr('checked', '');
        }
    });
    //권한관리(대메뉴전체)
    $('.memberReg .checkBox.partAll input').change(function () {
        var objAttrName = $(this).attr('name');
        var partAllCheckBoxEA = $('.checkBox.partAll').length
        var partAllCheckedEA = $('.checkBox.partAll input:checked').length
        if (partAllCheckBoxEA == partAllCheckedEA) {
            $('.memberReg .authAllCheck input').prop('checked', true);
            $('.memberReg .authAllCheck input').attr('checked', 'checked');
        } else {
            $('.memberReg .authAllCheck input').prop('checked', false);
            $('.memberReg .authAllCheck input').removeAttr('checked', '');
        }
        if (this.checked) {
            $('.checkBox.each input[name="' + objAttrName + '"]').prop('checked', true);
            $('.checkBox.each input[name="' + objAttrName + '"]').attr('checked', 'checked');
        } else {
            $('.checkBox.each input[name="' + objAttrName + '"]').prop('checked', false);
            $('.checkBox.each input[name="' + objAttrName + '"]').removeAttr('checked', '');
        }
    });
    //권한관리(개별)
    $('.memberReg .checkBox.each input').change(function () {
        var eachCheckBoxEA = $('.checkBox.each').length
        var eachCheckedEA = $('.checkBox.each input:checked').length
        var objAttrName = $(this).attr('name')
        var thisCheckBoxEA = $('.checkBox.each input[name="' + objAttrName + '"]').length
        var thisCheckedEA = $('.checkBox.each input[name="' + objAttrName + '"]:checked').length
        if (thisCheckBoxEA == thisCheckedEA) {
            $('.checkBox.partAll input[name="' + objAttrName + '"]').prop('checked', true);
            $('.checkBox.partAll input[name="' + objAttrName + '"]').attr('checked', 'checked');
        } else {
            $('.checkBox.partAll input[name="' + objAttrName + '"]').prop('checked', false);
            $('.checkBox.partAll input[name="' + objAttrName + '"]').removeAttr('checked', '');
        }
        if (eachCheckBoxEA == eachCheckedEA) {
            $('.memberReg .authAllCheck input').prop('checked', true);
            $('.memberReg .authAllCheck input').attr('checked', 'checked');
        } else {
            $('.memberReg .authAllCheck input').prop('checked', false);
            $('.memberReg .authAllCheck input').removeAttr('checked', '');
        }
    });
});
