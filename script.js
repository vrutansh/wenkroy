var crs = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove", function(dets){
    crs.style.left = dets.x + 20 + "px";
    crs.style.top = dets.y + 20 + "px";
})

function init(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },

  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
init();

var tl = gsap.timeline({

          scrollTrigger:{
          trigger:".page1 h1",
          scroller:".main",
          start:"top 27%",
          end:"top 0",
          scrub:3

        },
});


tl.to(".page1 h1", {
  x:-100,
  
},"anim");

tl.to(".page1 h2", {
  x:100,

},"anim");

tl.to(".page1 video",{
  width:"94%",
},"anim")

var tl2 = gsap.timeline({

  scrollTrigger:{
  trigger:".page1 h1",
  scroller:".main",
  start:"top -115%",
  end:"top -120%",
  scrub:3

},
});

tl2.to(".main",{
    backgroundColor: "#fff"
})

var tl3 = gsap.timeline({

  scrollTrigger:{
  trigger:".page1 h1",
  scroller:".main",
  start:"top -280%",
  end:"top -300%",
  scrub:3

},
});

tl3.to(".main",{
  backgroundColor:"#0F0D0D",
})

var box = document.querySelectorAll(".box")
box.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
       var attr = elem.getAttribute("data-image")
       crs.style.width = "470px"
       crs.style.height = "370px"
       crs.style.borderRadius = "0"
       crs.style.backgroundImage = `url(${attr})`
    })

    elem.addEventListener("mouseleave",function(){
      elem.style.backgroundColor = "transparent"
      crs.style.width = "20px"
       crs.style.height = "20px"
       crs.style.borderRadius = "50%"
       crs.style.backgroundImage = `none`
   })
})

h4 = document.querySelectorAll("#nav h4")
var pup = document.querySelector("#purple")
h4.forEach(function(elem){
   elem.addEventListener("mouseenter",function(){
        pup.style.display = "block"
        pup.style.opacity = "1"
   })
   elem.addEventListener("mouseleave",function(){
    pup.style.display = "none"
    pup.style.opacity = "0"
})
})