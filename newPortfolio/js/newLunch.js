$(document).ready(function(){
    const calendarTab = $('.calendar .tab');
    const menu = $('.lunch-order .menu');

    //식단 초기화
    function cafeteriaInit(){
        const day = $('.calendar td');

        day.removeAttr('style')
        day.removeClass('on first last');

        $('.calendar tbody tr').removeAttr('class');
        $('.lunch-order .apply-btn').removeClass('on');
        $('.lunch-order .menu a').removeClass('on');
        $('.menu-check').remove();
        $('.lunch-order span i').remove();
        $('.lunch-order span').append($('<i class="today"/>'))
        today();
    }

    function getKoreanDayOfWeek() {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const today = new Date();
        const dayIndex = today.getDay();
    
        return daysOfWeek[dayIndex];
    }
    
    //오늘날짜 달력표시 
    function today(){
        const koreanDayOfWeek = getKoreanDayOfWeek();
        const today = $('.lunch-order .day-wrap .today');
        today.text(`${new Date().getDate()}(${koreanDayOfWeek})`)
        today.attr('data-day', new Date().getDate()).attr('data-month', new Date().getMonth() + 1);

        $('.calendar td.today').addClass('on');
        $('.calendar td.today').parent('tr').addClass('multi-check');
    }
    today();

    $(document).on('click', '.tab a', function() {
        const $this = $(this).attr('class');
        const tab = $('.tab a');

        tab.removeClass('on');
        $(`.${$this}`).addClass('on');

        cafeteriaInit();
        return false;
    })
    
    //달력 날짜 선택
    $(document).on('click', '.calendar td:not(".other-month")', function() {
        const applyDay = $('.lunch-order span');
        const dayText = $(this).find('span').text();
        const dayMonthText = $(this).find('.day-month').text();
        const nowMonth = new Date().getMonth() + 1;
        const activeMonth = Number(dayMonthText);
        const calendarTd = $('.calendar td');
        const calendarTr = $('.calendar tr');
        const calendarWeekTh = $('.calendar .week th');
    
        // 클릭된 td에 스타일 초기화
        calendarTd.removeAttr('style');
    
        if (calendarTab.find('a.one-day').hasClass('on') && !$(this).hasClass('next-month')) {
            handleOneDay($(this));
        } else if (calendarTab.find('a.one-week').hasClass('on')) {
            handleOneWeek($(this));
        }

        // 일별 이벤트 처리 함수
        function handleOneDay(element) {
            const eleParent = element.parent('tr');
            const weekDayText = calendarWeekTh.eq(element.index()).text();
            const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri'];
            const dayIndex = element.index();

            if (element.hasClass('on') === false) {
                //const activeMonth = Number(dayMonthText);

                element.addClass('on');
                eleParent.addClass('multi-check');

                if ($('.calendar tr.multi-check').length === 1) {
                    
                    //신청 날짜 텍스트 표시
                    
                    if (nowMonth === activeMonth) {
                        applyDay.append($('<i/>').text(`${dayText}(${weekDayText})`).attr('data-month', activeMonth).attr('data-day', dayText));
                    } else {
                        applyDay.append($('<i/>').text(`${dayMonthText}.${dayText}(${weekDayText})`).attr('data-month', activeMonth).attr('data-day', dayText));
                    }
                    
                }else{
                    //같은 주 선택 날짜 2개 이상일경우 다른 주의 날짜 선택시 alert창 출력
                    if($('.calendar .multi-check td.on').length > 2){ 
                    //if(applyDay.find('i').length > 1){ 
                        eleParent.removeClass('multi-check');
                        element.removeClass('on');
                        alert('다중선택은 같은 주의 날짜만 선택 가능합니다.');
                    }else{
                        applyDay.find('i').remove();

                        if (nowMonth === activeMonth) {
                            applyDay.append($('<i/>').text(`${dayText}(${weekDayText})`).attr('data-month', activeMonth).attr('data-day', dayText));
                            
                        } else {
                            applyDay.append($('<i/>').text(`${dayMonthText}.${dayText}(${weekDayText})`).attr('data-month', activeMonth).attr('data-day', dayText));
                        }
                        $('.calendar tr').removeClass('multi-check');
                        $('.calendar td').removeClass('on');
                        eleParent.addClass('multi-check');
                        element.addClass('on');
                    }
                }
            } else {
                element.removeClass('on');
    
                if ($('.calendar td.on').length === 0) {
                    cafeteriaInit();
                }
    
                applyDay.find(`i:contains(${dayText})`).remove();

                //클릭한 날짜 해지
                if (dayIndex >= 1 && dayIndex <= 5) {
                    const dayClass = daysOfWeek[dayIndex - 1];
                    $(`.apply-menu-detail .${dayClass}`).remove();
                }
            }

            //오늘 날짜 기준 다음주 날짜의 메뉴 체크 표시
            if(element.hasClass('next-week') === true){
                if (dayIndex >= 1 && dayIndex <= 6) {
                    const dayClass = daysOfWeek[dayIndex - 1];
                    $('.apply-menu-detail').append($('<img/>').attr('class', `menu-check ${dayClass}`).attr('src', 'img/icon_check.png'));
                }
            }
        }

        // 일주일 이벤트 처리 함수
        function handleOneWeek(element) {
            const dayParent = element.parent('tr');
    
            calendarTr.removeClass('one-week on');
            calendarTd.removeClass('on first last');
            
            dayParent.addClass('one-week on');
            dayParent.find('td').addClass('on');
            dayParent.find('td.sun, td.sat, .other-month').removeClass('on');
    
            dayParent.find('td.on').first().addClass('first');
            dayParent.find('td.on').last().addClass('last');

            const firstDay = $('.first span').text();
            const firstWeekDayText = calendarWeekTh.eq($('.first').index()).text();

            const lastDay = $('.last span').text();
            const lastWeekDayText = calendarWeekTh.eq($('.last').index()).text();

            applyDay.find('i').remove();

            let lastWeekMonth = '';
            let firstWeekMonth = '';

            if(nowMonth !== Number($('.first .day-month').text()) || nowMonth !== Number($('.last .day-month').text())){
                firstWeekMonth = `${$('.first .day-month').text()}.`
                lastWeekMonth = `${$('.last .day-month').text()}.`
            }else{
                firstWeekMonth = '';
                lastWeekMonth = '';
            }

            applyDay.append($('<i/>').text(`${firstWeekMonth}${firstDay}(${firstWeekDayText}) ~ ${lastWeekMonth}${lastDay}(${lastWeekDayText})`).attr('data-month', activeMonth).attr('data-day', dayText));
        }
    });

    //식단 선택
    menu.find('a').click(function(){
        const menuDetail = $('.apply-menu-detail');
        const luchorderBtn = $('.lunch-order .apply-btn');
        
        if($('.day-wrap i').length === 0){
            alert('날짜를 선택해주세요');
        }else{
            menu.find('a').removeClass('on');
            $(this).addClass('on');
            menuDetail.show();
            luchorderBtn.addClass('on')
            findDay();

            if($(this).parent('li').hasClass('rice') === true){ //일반식
                //menuDetail.text('갈비치킨 치즈볼 백미밥 모둠 어묵탕 배추김치 계란말이');

            }else if($(this).parent('li').hasClass('salad') === true){ //샐러드
                //menuDetail.text('리코타치즈 샐러드');

            }else if($(this).parent('li').hasClass('sandwich') === true){ //샐러드&샌드위치
                //menuDetail.text('리코타치즈 샐러드 & 케이준 치킨텐더 랩');
            }
        }
        return false;
    })
    
    //선택한 식단날짜 텍스트 설정
    function findDay(){
        const dayActive = $('.calendar td.on');
        
        const firstDayActive = dayActive.first();
        const lastDayActive = dayActive.last();

        const firstWeek = $('.week th').eq(firstDayActive.index()).text();
        const lastWeek = $('.week th').eq(lastDayActive.index()).text();

        const firstDay = firstDayActive.find('span').text();
        const lastDay = lastDayActive.find('span').text();

        const firstdayMonth = firstDayActive.find('.day-month').text();
        const lastdayMonth = lastDayActive.find('.day-month').text();

        if (calendarTab.find('a.one-day').hasClass('on')) { // 일일
            $('.lunch-order b').hide();
        } 
    }

    //달력 펼치기
    $('.lunch-order .day-wrap').click(function(){
        $('.calendar-popup').show();
    })

    //달력 확인버튼 
    $('.calendar-popup button').click(function(){
        $('.calendar-popup').hide()
    })

    //달력 초기화버튼 
    $('.calendar-popup .reset').click(function(){
        cafeteriaInit();
        return false;
    })

    function tabDraw(){
        $('.calendar-data .tab').html($('.apply-wrap .tab').html())
    }
    tabDraw()
})