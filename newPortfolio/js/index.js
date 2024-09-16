
const cursor = document.querySelector('.cursor'); 
document.addEventListener('mousemove',(e) => { 
    cursor.style.top = `${e.clientY}px`
    cursor.style.left = `${e.clientX}px`
    cursor.animate({
        top : `${e.clientY}px`, left : `${e.clientX}px`
    },1000)
});

const workItems = document.querySelectorAll('.project-wrap .list li');

workItems.forEach(item => {
    item.addEventListener('mouseover',()=>{ 
        cursor.classList.add('on');
    });
    
    item.addEventListener('mouseout',()=>{ 
        cursor.classList.remove('on');
    });
})

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 800);
});

gsap.ticker.lagSmoothing(0);

const split = gsap.utils.toArray(".split");
        
split.forEach(target => {
    let SplitClient = new SplitType(target, { type: "chars" });
    let lines = SplitClient.lines;
    let words = SplitClient.words;
    let chars = SplitClient.chars;

    gsap.from(chars, {
        yPercent: 100,
        autoAlpha: 0,
        delay: 0.5,
        duration: 1.3,
        ease: "circ.out",
        stagger: {
            amount: 1,
        },
        scrollTrigger: {
            trigger: target,
            start: "top bottom",
            end: "+=100",
        },
        onComplete: function() {
            target.parentElement.classList.add('on'); 
            document.body.classList.remove('none-scroll');
        }
    });
});

/* 스마일 아이콘 회전 */
const circle = document.querySelector(".smile");
const canvasWidth = document.querySelector(".intro-wrap .inner").offsetWidth;

const radius = 30; // 원의 반지름
const stopPoint = canvasWidth * 0.55; // 70% 지점
const centerPoint = canvasWidth / 2.15; // 중앙 지점

function animate() {
    const tl = gsap.timeline({ repeat: 0 });
    
    // 원을 70% 지점까지 이동
    tl.to(circle, {
        x: stopPoint - radius, // 이동할 거리 설정
        rotation: 360,
        duration: 1.5,
        ease: "power1.inOut",
        
        onComplete: function() {
            // 원을 중앙으로 이동
            gsap.to(circle, {
                x: centerPoint - radius, // 중앙 지점까지 이동
                rotation: 360,
                duration: 1,
                ease: "power1.inOut",
            });
        }
    });
}

animate();

window.addEventListener("resize", animate);

//마우스 위치에따라 그림자 위치 바뀜
const container = document.querySelector('.embossed-container');
const smile = document.querySelector('.smile-bottom');

let mouseX = 0, mouseY = 0;
let shadowX = 0, shadowY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function updateShadow() {
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    
    // 마우스와 중심의 차이값을 구함
    let offsetX = (mouseX - centerX) / 20;
    let offsetY = (mouseY - centerY) / 20;

    // 기존 그림자 좌표와 목표 그림자 좌표를 부드럽게 이동 (lerp를 사용한 보간법)
    shadowX += (offsetX - shadowX) * 0.1;
    shadowY += (offsetY - shadowY) * 0.1;

    // 그림자 스타일 업데이트
    container.style.boxShadow = `
        inset ${8 + shadowX}px ${8 + shadowY}px 16px #d98c96,
        inset ${-8 + shadowX}px ${-8 + shadowY}px 16px #ffa4b4
    `;

    smile.style.boxShadow = `
        inset ${4 + shadowX / 2}px ${4 + shadowY / 2}px 8px #d98c96,
        inset ${-4 + shadowX / 2}px ${-4 + shadowY / 2}px 8px #ffa4b4
    `;

    // 애니메이션 프레임 업데이트
    requestAnimationFrame(updateShadow);
}

// 처음 애니메이션 실행
updateShadow();

const introTitleText = new SplitType(".layer-tit", {
    types: "words",
  });
  

const media = gsap.matchMedia();
media.add("(min-width: 1001px)", () => {
let project1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".work1",
        start: "top 95%",
        end: "bottom 100%",
        scrub: 1,
    },
});

project1
.from(".work1", {rotate: -180, x: -20000}, "project1")
.from(".work2", {rotate: 180, x: 20000}, "project1")
.from(".work1 img", {rotate: 0, x: 0}, "project1")
.from(".work2 img", {rotate: 0, x: 0}, "project1")
.from(".layer-tit .word", {opacity: 0, yPercent: 120}, "project1");

// work3과 work4 애니메이션 설정
let project2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".work3", 
        start: "top 90%",
        end: "bottom 100%",
        scrub: 1,
    },
});

project2
.from(".work3", {rotate: -180, x: -20000}, "project2")
.from(".work4", {rotate: 180, x: 20000}, "project2")
.from(".work3 img", {rotate: 0, x: 0}, "project2")
.from(".work4 img", {rotate: 0, x: 0}, "project2");

//work5 애니메이션 설정
let project3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".work5",
        start: "top 95%",
        end: "bottom 100%",
        scrub: 1,
    },
});

project3
.from(".work5", {rotate: -180, x: -20000}, "project3")
.from(".work5 img", {rotate: 0, x: 0}, "project3")
.from(".work6", {rotate: 180, x: 20000}, "project3")
.from(".work6 img", {rotate: 0, x: 0}, "project3");


})

AOS.init();




       
                        
const white = ScrollTrigger.create({
    trigger: '.project-wrap',
    start: "0% 10%",
    end: "100% 45%",
    endTrigger: ".main-prj",
    toggleClass: {
        targets: "body",
        className: "black",
    },
});


const textElement = document.querySelector('.infinite-text');

function generateRandomText() {
    // 무한으로 텍스트 생성 (랜덤 문자열 예시)
    const randomText = 'PAST PROJECT';
    return randomText + "&nbsp;&nbsp;"; ;
}

function updateTextContent() {
    // 텍스트를 계속 추가해서 길이를 무한으로 증가
    textElement.innerHTML += generateRandomText(); 
    updateAnimationSpeed();
}

function updateAnimationSpeed() {
    // 텍스트 길이에 따라 애니메이션 속도 동적으로 조정
    const textWidth = textElement.offsetWidth;
    const viewportWidth = window.innerWidth;

    // 속도 계산: 텍스트 길이에 비례하여 속도를 고정
    const speed = (textWidth + viewportWidth) / 100; // 100은 속도를 조정하는 임의의 값
    textElement.style.animation = `scrollText ${speed}s linear infinite`;
}

for (let i = 0; i < 100; i++) {  // 시작 텍스트 길이
    updateTextContent();
}


// 무한으로 텍스트를 추가
setInterval(updateTextContent, 1000); // 1초마다 텍스트 추가
updateAnimationSpeed(); // 초기 애니메이션 속도 설정


//About
const aboutText = new SplitType(".about b", {
    types: "words, chars",
  })




