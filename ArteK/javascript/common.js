/*---- 검색 인터렉션 ----*/

//Header영역의 검색창 열기
document.querySelector('header .search').addEventListener('click', function(e) {
    const searchForm = this.closest('header').querySelector('.search-form-wrap');
    const isActive = this.classList.toggle('on');
    
    searchForm.style.visibility = isActive ? 'visible' : 'hidden';
    searchForm.style.opacity = isActive ? '1' : '0';
    
    e.preventDefault();
});

document.querySelector('.sub-top .search-form .close').addEventListener('click', function() {
    const searchForm = document.querySelector('.sub-top .search-form');
    const searchFormWrap = document.querySelector('.sub-top .search-form-wrap');
    const inputRemove = searchForm.querySelector('.input-remove');

    searchForm.classList.remove('on');
    searchFormWrap.style.visibility = 'hidden';
    searchFormWrap.style.opacity = '0';
    inputRemove.style.display = 'none';
});

//검색영역 포커싱 됬을경우 해당 폼 노출
document.querySelector('.sub-top .input-area input').addEventListener('focus',function(){
    const searchForm = this.closest('.search-comp').querySelector('.search-form-wrap');
    const isValue = this.value === '';
    
    searchForm.style.visibility = 'visible';
    searchForm.style.opacity = '1';

    this.closest('.search-form').classList.add('on');
    this.closest('.search-form').querySelector('.input-remove').style.display = isValue ? 'none' : 'block';
});

//검색영역에 글자 입력 할 경우
function highlightText(text, inputText) {
    if (!inputText) {
        return text;
    }

    const regex = new RegExp(`(${inputText})`, 'gi');
    return text.replace(regex, '<i class="slice">$1</i>');
}

function updateText() {
    document.querySelectorAll('.result-form .item span').forEach(function(text){
        const originalText = text.textContent;
        const userInput = text.closest('.search-comp').querySelector('.input-area input').value;
        const modifiedText = highlightText(originalText, userInput);
        text.innerHTML = modifiedText;
    })
}

//검색어 입력할 경우
const searchInputs = document.querySelectorAll('.search-comp .input-area input');
searchInputs.forEach(function(search){
    search.addEventListener('input', function() {
        const searchParent = this.closest('.search-comp');
        const isInputEmpty = this.value === '';
        const isDevice = window.innerWidth > 820;

        if (isDevice && this.closest('header')) {
            document.querySelector('header .result-form').style.display = isInputEmpty ? 'none' : 'block';
        } else {
            searchParent.querySelector('.result-form').style.display = isInputEmpty ? 'none' : 'block';
        }
        
        searchParent.querySelector('.init-form').style.display = isInputEmpty ? 'block' : 'none';
        searchParent.querySelector('.input-remove').style.display = isInputEmpty ? 'none' : 'block';

        updateText();
    });
}) 


//--검색영역에 글자 입력 할 경우

//검색입력 텍스트 지우기
document.querySelectorAll('.search-comp .input-remove').forEach(function(inputRemove){
    inputRemove.addEventListener('click', function(e){
        const searchParents = this.closest('.search-comp');
    
        this.style.display = 'none';
        searchParents.querySelector('.input-area input').value = '';
        
        if($(window).width() > 820){
            document.querySelector('header .init-form').style.display = 'block';
            document.querySelector('header .result-form').style.display = 'none';
        }else{
            searchParents.querySelector('.init-form').style.display = 'block';
            searchParents.querySelector('.result-form').style.display = 'none';
        }
        
        e.preventDefault();
    })
})

//최근조회 각각 제거
document.querySelectorAll('.recent-search span').forEach(function(item){
    item.querySelector('.icon').addEventListener('click', function(e){
        this.parentElement.remove()
        e.preventDefault();
    })
})

//최근조회 전체삭제
document.querySelectorAll('.recent-search .remove-btn').forEach(function(itemAllRemoveBtn){
    itemAllRemoveBtn.addEventListener('click', function(e){
        const recentSearchWrap = this.closest('.recent-search');

        recentSearchWrap.querySelectorAll('span').forEach(function(items){
            items.remove();
            recentSearchWrap.querySelector('.no-data').style.display= 'block';
        })
        e.preventDefault();
    })
})

/*----// 검색 인터렉션 ----*/


//Footer
document.querySelector('footer .info-more').addEventListener('click', function() {
    const companyInfoList = document.querySelectorAll('footer .company-info dl');
    companyInfoList.forEach(function(companyInfo) {
        if (companyInfo.style.display === 'none' || companyInfo.style.display === '') {
            companyInfo.style.display = 'block';
        } else {
            companyInfo.style.display = 'none';
        }
    });
    event.preventDefault();
});

//Scroll Top
document.querySelector('.scrl-top').addEventListener('click', function() {
    window.scrollTo({
        top:0, 
        behavior:'smooth'
    });
    event.preventDefault();
});

/* const nullData = document.getElementById('nullData');
if( typeof nullData !== 'undefined' ){
    nullData.addEventListener('change', function() {
        console.log('변경된 데이터 : ', nullData);
    });
} */