document.addEventListener("DOMContentLoaded", function () {
    // Initialize Lenis
    const lenis = new Lenis();
  
    lenis.on('scroll', (e) => {
      console.log(e);
    });
  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  
    // GSAP Animations
    let t1 = gsap.timeline({ paused: true });
  
    t1.to(".menu-overlay", {
      duration: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power2.out",
    });
  
    t1.from(
      ".menu-link, .btn",
      {
        opacity: 0,
        y: 60,
        stagger: 0.05,
        duration: 0.75,
        ease: "power1.inOut",
      },
      "<"
    );
  
    t1.to(
      ".video-preview",
      {
        duration: 1,
        height: "200px",
        ease: "power2.out",
      },
      "<"
    );
  
    t1.to(
      ".menu-divider",
      {
        duration: 2,
        width: "100%",
        ease: "power4.out",
      },
      "<"
    );
  
    function openMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "all";
      t1.play();
    }
  
    function closeMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "none";
      t1.reverse();
    }
  
    document.querySelector(".menu-open-btn").addEventListener("click", openMenu);
    document.querySelector(".menu-close-btn").addEventListener("click", closeMenu);
  
    // Centering GSAP effect
    gsap.fromTo(
      "nav",
      { opacity: 0, y: "-50%" },
      { opacity: 1, y: "0%", duration: 1 }
    );
  
    // Additional animations
    
    gsap.fromTo(
      ".header",
      { opacity: 0, y: "50%" },
      { opacity: 1, y: "0%", duration: 1, delay: 1 }
    );
  
    const menuOpenBtn = document.querySelector(".menu-open-btn");
    const menuCloseBtn = document.querySelector(".menu-close-btn");
  
    menuOpenBtn.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
      menuOpenBtn.classList.add("hidden");
      menuCloseBtn.classList.remove("hidden"); 
    });
  
    menuCloseBtn.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
      menuOpenBtn.classList.remove("hidden");
      menuCloseBtn.classList.add("hidden");
    });
  
    // Audio Controls
    let soundButton = document.querySelector(".soundbutton"),
      audio = document.querySelector(".audio");
  
    soundButton.addEventListener("click", (e) => {
      soundButton.classList.toggle("paused");
      audio.paused ? audio.play() : audio.pause();
    });
  
    window.onfocus = function () {
      soundButton.classList.contains("paused") ? audio.pause() : audio.play();
    };
  
    window.onblur = function () {
      audio.pause();
    };
  
    // Image Upload
    const dropArea = document.getElementById("drop-area");
    const inputFile = document.getElementById("input-file");
    const imageView = document.getElementById("img-view");
  
    inputFile.addEventListener("change", uploadImage);
  
    function uploadImage() {
      let imgLink = URL.createObjectURL(inputFile.files[0]);
      imageView.style.backgroundImage = `url(${imgLink})`;
      imageView.textContent = "";
      imageView.style.border = 0;
    }
  
    dropArea.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
  
    dropArea.addEventListener("drop", function (e) {
      e.preventDefault();
      inputFile.files = e.dataTransfer.files;
      uploadImage();
    });
  
    // Scroll animations with GSAP and Lenis
    const selector = {
      paragraph: Splitting({
        target: '.hero_paragraph_text',
        by: 'words',
      }),
      image: document.querySelector('.hero_background'),
      navItems: document.querySelectorAll('.nav_item'),
    };
  
    const initLenis = () => {
      const lenis = new Lenis({
        lerp: 0.05,
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      initScroll();
    };
  
    const initScroll = () => {
      gsap.set(selector.image, { autoAlpha: 1, scale: 1, yPercent: 0 });
      gsap.set('.word', { autoAlpha: 0.4 });
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
  
      tl.to('.word', {
        duration: 2,
        autoAlpha: 1,
        stagger: 1,
      })
        .to(
          selector.image,
          {
            duration: 20,
            scale: 0.95,
            autoAlpha: 0,
            yPercent: -5,
          },
          0
        )
        .to(
          [selector.navItems[1], selector.navItems[2]],
          {
            duration: 20,
            yPercent: -100,
            autoAlpha: 0,
          },
          0
        );
    };
  
    window.addEventListener('DOMContentLoaded', initLenis);
  });
  
  //scrolling text 
  document.addEventListener("DOMContentLoaded", function () {
    const imageSources = [
        "https://i.pinimg.com/564x/8d/5f/f9/8d5ff9b8731e696eee5281419e33f259.jpg",
        "https://i.pinimg.com/564x/0d/e4/e8/0de4e8a2f9bd3dc62104a05cd755ad5a.jpg",
        "https://i.pinimg.com/736x/f0/e0/e0/f0e0e0d0874e9b4fc5013e6f2e168d97.jpg",
        "https://i.pinimg.com/564x/67/2a/17/672a1785c613432ab2cbda86d6f89920.jpg",
        "https://i.pinimg.com/564x/10/98/31/109831056ba090841e14db43649d50aa.jpg",
    ];

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {
        const copyElements = item.querySelectorAll(".info, .name, .tag");

        copyElements.forEach((div) => {
            const copy = div.querySelector("p");

            if (copy) {
                const duplicateCopy = document.createElement("p");
                duplicateCopy.textContent = copy.textContent;
                div.appendChild(duplicateCopy);
            }
        });
    });

    const appendImages = (src) => {
        const preview1 = document.querySelector(".preview-img-1");
        const preview2 = document.querySelector(".preview-img-2");

        const img1 = document.createElement("img");
        const img2 = document.createElement("img");

        img1.src = src;
        img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        img2.src = src;
        img2.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

        preview1.appendChild(img1);
        preview2.appendChild(img2);

        gsap.to([img1, img2], {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
            onComplete: function () {
                removeExtraImages(preview1);
                removeExtraImages(preview2);
            },
        });
    };

    function removeExtraImages(container) {
        while (container.children.length > 10) {
            container.removeChild(container.firstChild);
        }
    }

    document.querySelectorAll(".menu-item").forEach((item, index) => {
        item.addEventListener("mouseover", () => {
            mouseOverAnimation(item);
            appendImages(imageSources[index]);
        });

        item.addEventListener("mouseout", () => {
            mouseOutAnimation(item);
        });
    });

    const mouseOverAnimation = (elem) => {
        gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
            top: "-100%",
            duration: 0.3,
        });
        gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
            top: "0%",
            duration: 0.3,
        });
    };

    const mouseOutAnimation = (elem) => {
        gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
            top: "0%",
            duration: 0.3,
        });
        gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
            top: "100%",
            duration: 0.3,
        });
    };

    document.querySelector(".menu").addEventListener("mouseout", function () {
        gsap.to(".preview-img img", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
        });
    });

    document.addEventListener("mousemove", function (e) {
        const preview = document.querySelector(".preview");
        gsap.to(preview, {
            x: e.clientX + 300,
            y: e.clientY,
            duration: 1,
            ease: "power3.out",
        });
    });
});



//left //right
document.querySelector(".left")
.addEventListener("mousemove", function(){
    document.querySelector(".c-center-one").style.height = "100vh"
    document.querySelector("#btn-lft").style.backgroundColor = "#333"
    document.querySelector("#btn-lft").style.color = "#fff"
    document.querySelector("#btn-lft").style.border = "none"
    document.querySelector(".left").style.cursor = "pointer"
    document.querySelector("#one").style.width = "25vw"
    document.querySelector("#one").style.height = "25vh"
    document.querySelector("#one").style.opacity = "1"
    document.querySelector("#one").style.filter= "blur(0.5px)"
    document.querySelector("#two").style.width = "15vw"
    document.querySelector("#two").style.height = "17vh"
    document.querySelector("#two").style.opacity = "1"
    document.querySelector("#two").style.filter= "blur(5px)"
    document.querySelector("#three").style.width = "10vw"
    document.querySelector("#three").style.height = "12vh"
    document.querySelector("#three").style.opacity = "0.5"
    document.querySelector("#three").style.filter= "blur(20px)"
    document.querySelector("#four").style.width = "7vw"
    document.querySelector("#four").style.height = "7vh"
    document.querySelector("#four").style.opacity = "0.3"
    document.querySelector("#four").style.filter= "blur(20px)"

})

document.querySelector(".left")
.addEventListener("mouseleave", function(){
    document.querySelector(".c-center-one").style.height = "0vh"
    document.querySelector("#btn-lft").style.backgroundColor = "initial"
    document.querySelector("#btn-lft").style.border = "1px solid #333"
    document.querySelector("#btn-lft").style.color = "initial"
    document.querySelector("#one").style.width = "15vw"
    document.querySelector("#one").style.height = "10vh"
    document.querySelector("#one").style.opacity= "0"
    document.querySelector("#one").style.filter= "blur(10px)"
    document.querySelector("#two").style.width = "10vw"
    document.querySelector("#two").style.height = "10vh"
    document.querySelector("#two").style.opacity= "0"
    document.querySelector("#two").style.filter= "blur(10px)"
    document.querySelector("#three").style.width = "7vw"
    document.querySelector("#three").style.height = "9vh"
    document.querySelector("#three").style.opacity= "0"
    document.querySelector("#three").style.filter= "blur(50px)"
    document.querySelector("#four").style.width = "5vw"
    document.querySelector("#four").style.height = "5vh"
    document.querySelector("#four").style.opacity= "0"
    document.querySelector("#four").style.filter= "blur(50px)"
})


document.querySelector(".right")
.addEventListener("mousemove", function(){
    document.querySelector(".c-center-two").style.height = "100vh"
    document.querySelector("#btn-rght").style.backgroundColor = "#333"
    document.querySelector("#btn-rght").style.color = "#fff"
    document.querySelector("#btn-rght").style.border = "none"
    document.querySelector(".right").style.cursor = "pointer"
    document.querySelector("#five").style.width = "25vw"
    document.querySelector("#five").style.height = "25vh"
    document.querySelector("#five").style.opacity = "1"
    document.querySelector("#five").style.filter= "blur(0.5px)"
    document.querySelector("#six").style.width = "15vw"
    document.querySelector("#six").style.height = "17vh"
    document.querySelector("#six").style.opacity = "1"
    document.querySelector("#six").style.filter= "blur(5px)"
    document.querySelector("#seven").style.width = "10vw"
    document.querySelector("#seven").style.height = "12vh"
    document.querySelector("#seven").style.opacity = "0.5"
    document.querySelector("#seven").style.filter= "blur(20px)"
    document.querySelector("#eight").style.width = "7vw"
    document.querySelector("#eight").style.height = "7vh"
    document.querySelector("#eight").style.opacity = "0.3"
    document.querySelector("#eight").style.filter= "blur(20px)"
})

document.querySelector(".right")
.addEventListener("mouseleave", function(){
    document.querySelector(".c-center-two").style.height = "0vh"
    document.querySelector("#btn-rght").style.backgroundColor = "initial"
    document.querySelector("#btn-rght").style.border = "1px solid #333"
    document.querySelector("#btn-rght").style.color = "initial"
    document.querySelector("#five").style.width = "15vw"
    document.querySelector("#five").style.height = "10vh"
    document.querySelector("#five").style.opacity= "0"
    document.querySelector("#five").style.filter= "blur(10px)"
    document.querySelector("#six").style.width = "10vw"
    document.querySelector("#six").style.height = "10vh"
    document.querySelector("#six").style.opacity= "0"
    document.querySelector("#six").style.filter= "blur(10px)"
    document.querySelector("#seven").style.width = "7vw"
    document.querySelector("#seven").style.height = "9vh"
    document.querySelector("#seven").style.opacity= "0"
    document.querySelector("#seven").style.filter= "blur(50px)"
    document.querySelector("#eight").style.width = "5vw"
    document.querySelector("#eight").style.height = "5vh"
    document.querySelector("#eight").style.opacity= "0"
    document.querySelector("#eight").style.filter= "blur(50px)"
})

//image reveal




  CustomEase.create("cubic", "0.83, 0, 0.17, 1");
let isAnimating = false;

function splitTextIntoSpans (selector) {
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
            .split("")
            .map(function (char) {
                return`<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`;
            })
            .join("");
        element.innerHTML = splitText;
    });
}

function initializeCards() {
    let cards = Array.from(document.querySelectorAll(".card"));
    gsap.to(cards, {
      y:(i) => 15 + 15 * i + "%",
      z:(i) => 15 * i,
      duration: 1,
      ease: "cubic",
      stagger: -0.1,
    });
}

document.addEventListener("DOMContentLoaded", function () {
    splitTextIntoSpans(".copy h1");
    initializeCards();

    gsap.set("h1 span", { y: -200 });
    gsap.set(".slider.card:last-child h1 span", { y: 0 });
});

    document.addEventListener("click", function () { 
        if (isAnimating) return;
        
        isAnimating = true;

        let slider = document.querySelector(".slider");
        let cards = Array.from(slider.querySelectorAll(".card"));
        let lastCard = cards.pop();
        let nextCard = cards [cards.length - 1];

        gsap.to (lastCard.querySelectorAll("h1 span"), {
        y: 200,
        duration: 0.75,
        ease: "cubic",
        });

        gsap.to (lastCard, {
            y: "+=150%",
            duration: 0.75,
            ease: "cubic",
            onComplete: () => {
                slider.prepend(lastCard);
                initializeCards();
                gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200});
                
                setTimeout(() => {
                  isAnimating = false;
                }, 1000);
            },
        });
        gsap.to (nextCard.querySelectorAll("h1 span"), {
            y: 0,
            duration: 1,
            ease: "cubic",
            stagger: 0.05,
        });
    });


    function loader(){
      var tl = gsap.timeline()
    /* ===( CODE AASHU )=== */
    tl.from(".loader span",{
      x:100,
      duration:1.2,
      stagger:.03,
      delay:.1
    })
    tl.to(".loader span",{
      x:-100,
      duration:.6,
      opacity:0,
      stagger:.03
    })
    tl.to('.loader',{
      duration:.5,
      opacity:0,
      display:"none"
    })
    tl.from('.page1 .inner-content h1 span',{
      y:60,
      duration:.5,
      delay:-.3,
      stagger:.05
    })
    }
    function crsrAnim(){
        const cursor = document.querySelector(".cursor");
        const innerContent = document.querySelector(".inner-content");
    
    innerContent.addEventListener("mousemove", (e) => {
        gsap.to(cursor,{
            x: e.x+"px",
            y: e.y+"px"
        })
    })
    
    innerContent.addEventListener("mouseenter", ()=>{
        gsap.to(cursor,{
            scale:1,
            opacity:1
        })
    })
    innerContent.addEventListener("mouseleave", ()=>{
        gsap.to(cursor,{
            scale:0,
            opacity:0
        })
    })
    }

    function swiper(){
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        autoplay: {
          delay: 600,
          disableOnInteraction: false,
        },
      });
    }
    swiper();
    
    document.addEventListener("DOMContentLoaded", function() {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from("#animatedImage", {
          duration: 2,
          opacity: 0,
          scale: 0.5,
          ease: "power2.out",
          scrollTrigger: {
              trigger: ".footer-bottom",
              start: "top bottom",
              toggleActions: "play none none none"
          }
      });
  });
    
  gsap.to('#page4', {
    y: -100, // Adjust the distance based on your design
    scrollTrigger: {
      trigger: '#page4',
      start: 'top bottom', // Animation starts when the top of #page4 hits the bottom of the viewport
      end: 'bottom top', // Animation ends when the bottom of #page4 hits the top of the viewport
      scrub: true, // Smooth scrubbing effect
    }
  });
  