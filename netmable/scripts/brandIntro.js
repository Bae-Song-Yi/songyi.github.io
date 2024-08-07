gsap.registerPlugin(ScrollTrigger);
//초개인화 된 ~ 심플한
const solutions = gsap.utils.toArray('.solutionWrap .solution');
solutions.forEach((section, i) => {
    ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing: false,
        start: 'top top',
    });
});

//방법
const scroll = gsap.utils.toArray('.brandIntro .betterWay li');
gsap.to(scroll, {
    ease: 'none',
    scrollTrigger: {
        trigger: '.betterWay',
        pin: true,
        end: () => "+=" + document.querySelector('.betterWay ul').offsetHeight * scroll.length,
        scrub: 4,
    }
});
ScrollTrigger.create({
    trigger: '.brandIntro .betterWay li.way2',
    toggleClass: 'opacity',
    start: function start() {
        return "+=".concat(document.querySelector('.betterWay li').offsetHeight / 2);
    },
    end: function end() {
        return "+=".concat(document.querySelector('footer').offsetTop);
    },
    scrub: 1,
    duration: 1
})
//Identity Iam
/* gsap.to('.brandIntro .idIm', {
    ease: 'none',
    scrollTrigger: {
        trigger: '.brandIntro .idIm',
        pin: true,
        end: () => "+=" + document.querySelector('.brandIntro .idIm').offsetHeight,
        scrub:1,
    }
}); */
var section1 = $('.section1').offset().top;
var section2 = $('.section2').offset().top - 300;
var section3 = $('.section3').offset().top - 300;
var section4 = $('.section4').offset().top - 300;
var section6 = $('.idIm.section6').offset().top;

$(window).scroll(function () {
    if ($(window).scrollTop() > section1 && $(window).scrollTop() < section2) {
        gsap.to('.slice', { rotationX: 0});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn1').show();
    }
    if ($(window).scrollTop() > section2 && $(window).scrollTop() < section3) {
        gsap.to('.slice', { rotationX: -90});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn2').show();
    }
    if ($(window).scrollTop() > section3 && $(window).scrollTop() < section4) {
        gsap.to('.slice', { rotationX: -180});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn3').show();
    }
    if ($(window).scrollTop() > section4) {
        gsap.to('.slice', { rotationX: -270});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn4').show();
    }
    if($(window).scrollTop() > section6){
        $('.brandIntro .idIm').addClass('on');
        setTimeout(function(){
            $('.brandIntro .idIm div').addClass('on');
        }, 1300)
    }
})
