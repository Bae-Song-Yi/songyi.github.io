$(document).ready(function() {
    // 현재 날짜를 가져오기
    var currentDate = new Date();

    // 달력 표시
    showCalendar(currentDate.getFullYear(), currentDate.getMonth());

    function showCalendar(year, month) {
        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);
        var weekCount = Math.ceil((lastDay.getDate() + firstDay.getDay()) / 7);

        $('.top-area #currentMonth').text(year + '. ' + (month + 1));
        $('.calendar-popup #currentMonth').text(year + '. ' + (month + 1));
        $('#calendar tbody').empty();
        var currentRow = $('<tr></tr>');
        var currentDate = new Date(firstDay);
        currentDate.setDate(currentDate.getDate() - firstDay.getDay()); // 첫째 주의 시작일로 이동


        for (var i = 0; i < weekCount; i++) {
            var currentRow = $('<tr></tr>');

            // 한 주에 7일씩 반복
            for (var j = 0; j < 7; j++) {
                var cell = $('<td></td>');

                // 현재 달의 날짜 표시
                if (currentDate.getMonth() === month) {
                    cell.append($("<span />").text(currentDate.getDate()));

                    // 오늘 날짜인 경우 스타일 적용
                    if (isToday(currentDate)) {
                        cell.addClass('today');
                    }
                }
                else { // 이전 달과 다음 달의 날짜 표시
                    if(i === 0 && j < firstDay){
                        cell.addClass('other-month');
                        if (isToday(currentDate)) {
                            cell.addClass('today');
                        }
                    }else{
                        cell.addClass('next-month');
                        $('.today').parent('tr').next('tr').find('td').addClass('next-week');
                    }
                    cell.append($("<span />").text(currentDate.getDate()));
                }

                cell.append('<div class="day-month">' + `${currentDate.getMonth() + 1}` + '</div>');

                if (j === 6) { //토요일
                    cell.addClass('sat');
                }

                if (j === 0) { //일요일
                    cell.addClass('sun');
                }

                // 다음 주에 해당하는 경우 'next-week' 클래스 추가
                /* var nextWeekStartDate = new Date();
                nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 5);
                var nextWeekEndDate = new Date();
                nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 10);

                if (currentDate >= nextWeekStartDate && currentDate <= nextWeekEndDate) {
                    cell.addClass('next-week');
                } */

                currentRow.append(cell);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            $('#calendar tbody').append(currentRow);
        }
    }

    // 날짜 클릭 이벤트
    $('.calendar').on('click', 'td', function() {
        var selectedDate = $(this).text();
    });

    // 이전 달 버튼 클릭 시
    $(document).on('click', '#prevMonth', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        showCalendar(currentDate.getFullYear(), currentDate.getMonth());
        applyDayData();
    });

    // 다음 달 버튼 클릭 시
    $(document).on('click', '#nextMonth', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        showCalendar(currentDate.getFullYear(), currentDate.getMonth());
        applyDayData();

    });

    function applyDayData(){
        $('.day-wrap i').each(function(){
            const day = $(this).attr('data-day');
            const month = $(this).attr('data-month');

            console.log($('.day-wrap i').length)
            $('.calendar td').filter(function() {
                const spanText = $(this).find('span').text();
                const divText = $(this).find('div').text();
                return spanText.trim() === day.trim() && divText.trim() === month.trim();
            }).addClass('on');

            $('.calendar td.on').parent('tr').addClass('multi-check');

        })
    }

    // 주어진 날짜가 오늘인지 확인하는 함수
    function isToday(date) {
        var today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }
});