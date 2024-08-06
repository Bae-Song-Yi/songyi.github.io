window.addEventListener('load', function(){
    const load = document.querySelector('.loader-wrap');
    setTimeout(function() {
        load.classList.add('on');

        setTimeout(function() {
            load.style.display = 'none';
        }, 1000);
    }, 1000);
});

/* 마우스 커서 */
const cursor = document.querySelector('.cursor'); 
document.addEventListener('mousemove',(e) => { 
    cursor.style.top = `${e.clientY}px`
    cursor.style.left = `${e.clientX}px`
    cursor.animate({
        top : `${e.clientY}px`, left : `${e.clientX}px`
    },1000)
});

// 프로젝트 호버시 마우스 이미지 변경
let cursorImgBox = document.querySelector('.cursor .img-wrap');
let workItems = document.querySelectorAll('.work-sec .list li');

document.addEventListener('mousemove',(e) => { 
    cursorImgBox.style.top = `${e.clientY}px`
    cursorImgBox.style.left = `${e.clientX}px`
    cursorImgBox.animate({
        top : `${e.clientY}px`, left : `${e.clientX}px`
    },2000)
});

workItems.forEach(item => {
    imageUrl = $(item).attr('data-img');
    let cursorImg = document.querySelector(`${imageUrl}`);

    item.querySelector('.text-area').addEventListener('mouseover',()=>{ 
        cursor.classList.add('on');
        cursorImg.classList.add('on');
        cursorImgBox.classList.add('on');
    });
    
    item.addEventListener('mouseout',()=>{ 
        cursor.classList.remove('on');
        cursorImg.classList.remove('on');
        cursorImgBox.classList.remove('on');
    });
})



/* Intro Interaction */
const intro = gsap.timeline();
intro
    .from(".intro-sec p:first-child",{
        autoAlpha: 0,
        x: -180,
        delay: 1.5,
        duration: 0.3,
    })

    .from(".intro-sec p:nth-child(2)",{
        autoAlpha: 0,
        x: -90,
        delay: 0,
        duration: 0.3
    })

    .from(".intro-sec p:nth-child(3)",{
        autoAlpha: 0,
        x: -45,
        delay: 0,
        duration: 0.3
    })

    .from(".intro-sec .small-text",{
        autoAlpha: 0,
        y: 50,
        rotate: 5,
        delay: 0,
        duration: 0.3
    })

    .from(".intro-sec .top-particle", {
        rotate: 360,
        autoAlpha: 0,
        duration: 0.2,
        delay: 0,
    })
    
    .from(".intro-sec .bottom-particle",{
        rotate: -180,
        autoAlpha: 0,
        duration: 0.2,
        delay: 0,
    })
 

const aboutParticle = gsap.timeline();
aboutParticle
    .fromTo(".work-sec .particle1",{
        rotate: 180,
        xPercent: -100,
        yPercent: 200
    },{
        rotate: 20,
        xPercent: -10,
        yPercent: -10
    })

ScrollTrigger.create({
    animation: aboutParticle,
    trigger: ".intro-sec .particle-wrap",
    start: "top 80%",
    end: "top 15%",
    scrub: true,
    pin: false,
    markers: false
});