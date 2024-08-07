gsap.registerPlugin(ScrollTrigger);
//초개인화 된 ~ 심플한
const pin_panels = gsap.utils.toArray('.solutionWrap .solution');
pin_panels.forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
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
        scrub: 1,
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
const txt = gsap.utils.toArray('.brandIntro .idIm span');
gsap.to('.brandIntro .idIm', {
    ease: 'none',
    scrollTrigger: {
        trigger: '.brandIntro .idIm',
        pin: true,
        end: () => "+=" + document.querySelector('.brandIntro .idIm').offsetHeight * 2,
        scrub: 1,
    }
});
var section1 = $('.section1').offset().top;
var sectionBottom1 = $('.section1').offset().top + $('.section1').height();
var sectionHalf1 = $('.section1').offset().top + ($('.section1').height() / 2);
var section2 = $('.section2').offset().top;
var sectionBottom2 = $('.section2').offset().top + $('.section2').height();
var sectionHalf2 = $('.section2').offset().top + ($('.section2').height() / 2);

var section3 = $('.section3').offset().top;
var sectionBottom3 = $('.section3').offset().top + $('.section3').height();
var sectionHalf3 = $('.section3').offset().top + ($('.section3').height() / 2);

var section4 = $('.section4').offset().top;
var sectionBottom4 = $('.section4').offset().top + $('.section4').height();
var sectionHalf4 = $('.section4').offset().top + ($('.section4').height() / 2);
var section6 = $('.idIm.section6').offset().top;

$(window).scroll(function () {
    if ($(window).scrollTop() > section1 && $(window).scrollTop() < section2) {
        console.log('section1')
        gsap.to('.slice', { rotationX: 0});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn1').show();
    }
    if ($(window).scrollTop() > section2 && $(window).scrollTop() < section3) {
        console.log('section2')
        gsap.to('.slice', { rotationX: -90});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn2').show();
    }
    if ($(window).scrollTop() > section3 && $(window).scrollTop() < section4) {
        console.log('section3')
        gsap.to('.slice', { rotationX: -180});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn3').show();
    }
    if ($(window).scrollTop() > section4) {
        console.log('section4')
        gsap.to('.slice', { rotationX: -270});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn4').show();
    }
    if($(window).scrollTop() > section6){
        $('.brandIntro .idIm').addClass('on');
        setTimeout(function(){
            $('.brandIntro .idIm div').addClass('on');
        }, 1000)
    }
})

/* $(window).scroll(function () {
    if ($(window).scrollTop() > section1 && $(window).scrollTop() < sectionHalf1) {
        gsap.to('.slice', { rotationX: 0});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn1').show();
    }
    else if ($(window).scrollTop() > sectionHalf1 && $(window).scrollTop() < sectionBottom1) {
        gsap.to('.slice', { rotationX: -90});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn2').show();
    }
    else if ($(window).scrollTop() > sectionHalf2 && $(window).scrollTop() < sectionBottom2) {
        gsap.to('.slice', { rotationX: -180});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn3').show();
    }
    else if ($(window).scrollTop() > sectionHalf3 && $(window).scrollTop() < sectionBottom3) {
        gsap.to('.slice', { rotationX: -270});
        $('.brandIntro .fixArea span i').hide();
        $('.brandIntro .fixArea span i.fadeIn4').show();
    }else if($(window).scrollTop() > section6){
        $('.brandIntro .idIm').addClass('on');
        setTimeout(function(){
            $('.brandIntro .idIm div').addClass('on');
        }, 1000)
    }
}) */