
var isKor = "True";
var verifyRequestExistYn = "";

function readURL(obj) {
    let reader = new FileReader();
    if(!obj.files.length) {
        return;
    }
    reader.readAsDataURL(obj.files[0]);
    reader.onload = function (e) {
        let img = $('<img />');
        $(img).attr('src', e.target.result);
        $('.modal-document-evidence .masking-wrap > img').remove();
        $('.masking .masking-wrap').append(img);
        $('.img-wrap ul').hide();
        $('.editor_btn').addClass('on');
        $('.tooltip').hide();
        $('.file-ctrl').hide();
    }
}

$(document).ready(function(){
    const submitBtn = $('.document-evidence-btn .submit-btn');
    const maskingTool = $('.masking-tool');
    const typeName = $("#work_type").length > 0 ? $("#work_type").val() : "modify";
    
    let device = '';
    function isDevice(){
        if($(window).width() > 820){
            device = '';
        }else{
            device = '.mo';
        }
    }

    $('.mask-pc .submit-btn').click(function(){
        isDevice();

        html2canvas(document.querySelector(`.masking .masking-wrap${device}`)).then(canvas => {
            var myImage = canvas.toDataURL();
            saveImg(canvas.toDataURL('image/png'),"capture-test.png"); //마스킹 영역 테스트 하기위한 코드
            $(`.masking .masking-wrap${device}`).attr('src', myImage);
        });
    })
        
    const authPopResize = $('#modal-document-evidence-box, .self-auth-popup .modal-dialog');

    //본인인증 팝업 닫기
    $(".self-auth-popup .self-overlay").click(function(){
        $(".self-auth-popup").modal('hide');
        $("#authentication-modal").modal('hide');
        $('#modal-document-evidence').modal('hide');
        $('body').css('overflow', 'auto');
        authPopResize.removeClass('resize');
        $('.masking-cnt').hide();
        $('.masking').show();
    });
    
    //홈페이지 영문일경우 이미지 파일명에 '_en'붙이기 위함
    let lang = '';
    let country = '';
    function language(){
        if (isKor === "True") {
            lang = '';
            country = 'Domestic';
        }else{
            lang = '_en';
            country = 'International';
            //영문 요소들 위치 수정
            enComponetPos();
        }
    }

    const maskingNoti = $('.masking .masking-noti');
    const maskingSampleImg = $('.masking .upload-img .sample-img');
    const maskingTit = $('.masking h5');
    let maskImg = '';
    const imgSrc = 'img/detail/masking/img/gif/';

    function maskAuthSetting(){
        var companyType = $("#company_type").val();
        if (companyType === '001') {
            maskImg = `${imgSrc}Identification.gif`;

            maskingSampleImg.attr('src', maskImg);
            $("#certificate_type").val("Identification");
            $(".file-select").attr("href", "javascript:$('#temp-identification-file').click()");
        }else if(companyType === '003'){
            maskImg = `${imgSrc}bizSample.png`;

            maskingSampleImg.attr('src', maskImg);
            $('.masking .img-wrap').addClass('biz');
            $("#certificate_type").val("CompanyIdentification");
            $(".file-select").attr("href", "javascript:$('#temp-companyidentification-file').click()");
        } else {
            maskImg = `${imgSrc}passport${lang}.png`;
            $("#certificate_type").val("Identification");
            if ($("#change_type").length > 0)
                $(".file-select").attr("href", "javascript:$('#company-identification-file').click()");
            else
                $(".file-select").attr("href", "javascript:$('#temp-identification-file').click()");
            maskingSampleImg.attr('src', maskImg)
        }
    }
    maskAuthSetting();

    //영문일경우 요소들의 위치, 크기 조절
    function enComponetPos(){
        const maskingNotiText = $('.modal-document-evidence .img-wrap ul');
        const tooltip = $('.masking-tool .tooltip');
        if(isKor === "False"){
            tooltip.css({'top': '-75px', 'left': '90px', 'width': '200px'});
        }
        
        if(isKor === "False" && $(window).width() < 420){
            $('.modal-document-evidence .modal-evidence-close').css({'top': '10px', 'right': '10px'});
            maskingNotiText.css({'justify-content': 'start', 'top': '0', 'transform': 'translateY(0)'});
            tooltip.css({'left': '70px'});
        }else{
            maskingNotiText.css({'justify-content': 'center', 'top': '50%', 'transform': 'translateY(-50%)'});
        }
    }

    $(window).resize(function(){
        enComponetPos();
        isDevice();
    })
/*--마스킹--*/

    // 캡쳐된 파일을 저장하는 함수
    function saveImg(uri, filename) { 
        var link = document.createElement('a'); 
        if (typeof link.download === 'string') { 
            link.href = uri; 
            link.download = filename; 
            document.body.appendChild(link); 
            link.click(); 
            document.body.removeChild(link); 
        } else { 
            window.open(uri); 
        } 
    }
    
    const upload = $(".masking .upload-img");
    const editorBtn = $('.masking-tool .editor_btn');
    const maskingWrap = $('.masking .masking-wrap');
    const moMaskingWrap = $('.masking .mo.masking-wrap');

    //PC 마스킹 마우스 이벤트
    var isDrawing = false;
    var prevX, prevY;

    maskingWrap.on("mousedown", function(event) {
        if (editorBtn.hasClass('on') === true) {
            isDrawing = true;
            var rect = this.getBoundingClientRect();
            var mouseY = event.clientY + $(this).scrollTop();
            prevX = (event.clientX - rect.left) / $(this).width() * 100;
            prevY = (mouseY - rect.top) / $(this).height() * 100;
            $("<div>")
                .addClass("highlighter")
                .css({ left: prevX + '%', top: prevY + '%' })
                .appendTo(".masking .pc .masking-wrap");

            $("<div>")
                .addClass("highlighter")
                .css({ left: prevX + '%', top: prevY + '%' })
                .appendTo(".masking .mo.masking-wrap");
        } else {
            return false;
        }
    });

    maskingWrap.on("mousemove", function(event) {
        if (editorBtn.hasClass('on') === true && isDrawing) {
            var rect = this.getBoundingClientRect();
            var mouseY = event.clientY + $(this).scrollTop();
            var x = (event.clientX - rect.left) / $(this).width() * 100;
            var y = (mouseY - rect.top) / $(this).height() * 100;
            var width = x - prevX;
            var height = y - prevY;
            $(".pc .highlighter:last").css({
                width: width + '%',
                height: height + '%',
            });
            $(".mo .highlighter:last").css({
                width: width + '%',
                height: height + '%',
            });
        } else {
            return false;
        }
    });

    maskingWrap.on("mouseup", function() {
        if(editorBtn.hasClass('on') === true){
            isDrawing = false;
        }else{
            return false;
        }
    });

    //MO 제출하기 활성화
    function submitActive(){
        if(upload.find('div').hasClass('highlighter') === true){
            submitBtn.addClass('on');
        }
    }

    //MO 마스킹 터치 이벤트
    maskingWrap.on("touchstart", function(event) {
        if (editorBtn.hasClass('on') === true && event.originalEvent.touches.length !== 2) {
            isDrawing = true;
            prevX = (event.originalEvent.touches[0].pageX - $(this).offset().left) / $(this).width() * 100;
            prevY = (event.originalEvent.touches[0].pageY - $(this).offset().top) / $(this).height() * 100;
            $("<div>")
                .addClass("highlighter")
                .css({ left: prevX + '%', top: prevY + '%' })
                .appendTo(".masking .pc .masking-wrap");

            $("<div>")
                .addClass("highlighter")
                .css({ left: prevX + '%', top: prevY + '%' })
                .appendTo(".mo.masking-wrap");
        }
    });

    maskingWrap.on("touchmove", function(event) {
        if (isDrawing && event.originalEvent.touches.length !== 2) {
            event.preventDefault(); //마스킹하고있을경우 스크롤 동작 차단

            // 마스킹 작업 코드
            var x = (event.originalEvent.touches[0].pageX - $(this).offset().left) / $(this).width() * 100;
            var y = (event.originalEvent.touches[0].pageY - $(this).offset().top) / $(this).height() * 100;
            var width = x - prevX;
            var height = y - prevY;
            $(".pc .highlighter:last").css({
                width: width + '%',
                height: height + '%',
            });

            $(".mo .highlighter:last").css({
                width: width + '%',
                height: height + '%',
            });
        }
    });

    maskingWrap.on("touchend", function(event) {
        isDrawing = false;
        submitActive();
        event.stopPropagation();
    });
    
    //마스킹 펜 활성화
    editorBtn.click(function(){
        const maskingToast = $('.masking-active-toast');

        if($(this).hasClass('on') === false){
            $(this).addClass('on');
            maskingToast.toast('show');
        }else{
            $(this).removeClass('on');
            maskingToast.toast('show');
        }
        
        return false;
    })
    

    //마스킹 초기화
    maskingTool.find('.reset').click(function(){
        $('.masking .highlighter').remove();
        return false;
    })

    //마스킹 샘플 이미지 활성화
    const sampleImg = upload.find('.sample-img');
    const maskingImg = upload.find(' > img');
    const sampleBtn = maskingTool.find('.sample-btn');
    
    sampleBtn.click(function(){
        if($(this).hasClass('on') === false){
            $(this).addClass('on');
            $('.modal-document-evidence .upload-img').addClass('on');
        }else{
            $(this).removeClass('on');
            $('.modal-document-evidence .upload-img').removeClass('on');
        }
        return false;
    })

    //마스킹 하나라도 되어있을 경우 제출버튼 활성화
    upload.click(function(){
        submitActive();
        return false;
    })

    //파일선택의 툴팁 hide기능 딜레이 시키기
    function tooltipHide(){
        setTimeout(function() {
            maskingTool.find('.tooltip').fadeOut();
        }, 3000);
    }
    //tooltipHide();

    maskingTool.find('.file-select').hover(function(){
        $(this).next('div').fadeIn();
        tooltipHide()
    }, function(){
        $(this).next('div').fadeOut();
    })

    //샘플이미지 영역 클릭시 Hide
    $('.modal-document-evidence .upload-img').click(function(){
        $(this).removeClass('on');
        sampleBtn.removeClass('on');
        return false;
    })

    //pc 마스킹 팝업 클래스 추가
    function reseizeAddClass(){
        if($(window).width() > 820){
            $('.modal-document-evidence').addClass('mask-pc');
        }else{
            $('.modal-document-evidence').removeClass('mask-pc');
        }   
    }

    reseizeAddClass();

    $(window).resize(function(){
        reseizeAddClass();
    })

    //pc 마스킹 팝업 클래스 추가

})
