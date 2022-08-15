window.addEventListener("DOMContentLoaded", () => {
  // PAGE ANIMATION //////////////////////////////////////////////////////////////
  let earthPositions;
  let activePage = 0;
  const pageDotElasticWidth = 36;
  const pageDotPostions = [];
  const earthWrapper = document.getElementById("earth-wrapper").style;
  const pageControls = document.querySelectorAll(".page-control");
  const earth = document.getElementById("earth-container").style;
  const controlSVGs = document.querySelectorAll(".control-svg");
  const earthBox = document.getElementById("earth-box").style;
  const pageDot = document.getElementById("page-dot").style;
  const pageDotWidthDiffrenet = pageDotElasticWidth - pageDot.width;
  const pages = document.querySelectorAll(".page");

  const setEarthPositions = () => {
    const screen = document.body.offsetWidth;

    earthPositions = [
      {
        // PAGE 1
        translate: "",
        rotate: "",
        height: "",
        width: "",
        right: "",
        bottom: "",
        left: "",
        top: "",
      },
      {
        // PAGE 2
        translate: "",
        rotate: "",
        height: "96vw",
        width: "96vw",
        right: "",
        bottom: "-10vw",
        left: "",
        top: "",
      },
      {
        // PAGE 3
        translate: "",
        rotate: "20deg",
        height: "90vh",
        width: "90vh",
        right: "-5vw",
        bottom: "",
        left: "",
        top: "",
      },
      {
        // PAGE 4
        translate: "",
        rotate: "",
        width: screen > 1100 ? "110vw" : "110vh",
        height: screen > 1100 ? "110vw" : "110vh",
        right: "",
        bottom: screen > 1100 ? "60%" : "53%",
        left: "",
        top: "",
      },
      {
        // PAGE 5
        translate: "",
        rotate: "180deg",
        height: "90vh",
        width: "90vh",
        right: "100%",
        bottom: "",
        left: "",
        top: "",
      },
      {
        // PAGE 6
        translate: "",
        rotate: "",
        height: "96vw",
        width: "96vw",
        right: "",
        bottom: screen > 1100 ? "125vh" : "100vh",
        left: "",
        top: "",
      },
    ];

    setEarthPosition(earthPositions[activePage]);
  };

  const setEarthPosition = (position) => {
    earth.transform = position.translate && `translate(${position.translate})`;
    earthWrapper.transform = position.rotate && `rotate(${position.rotate})`;
    earthBox.height = position.height;
    earthBox.width = position.width;
    earth.bottom = position.bottom;
    earth.right = position.right;
    earth.left = position.left;
    earth.top = position.top;
  };

  const setControlSVGCircle = (state) => {
    controlSVGs[activePage].classList.remove("active");
    controlSVGs[state].classList.add("active");
  };

  const setDotPosition = (state) => {
    if (state < activePage) {
      pageDot.left = pageDotPostions[activePage] - pageDotWidthDiffrenet + "px";
      pageDot.width = pageDotElasticWidth + "px";

      setTimeout(() => {
        pageDot.left = pageDotPostions[state] + "px";
        pageDot.width = "";
      }, 350);
    }

    if (state > activePage) {
      pageDot.width = pageDotElasticWidth + "px";

      setTimeout(() => {
        pageDot.left = pageDotPostions[state] + "px";
        pageDot.width = "";
      }, 350);
    }
  };

  const setPage = (state) => {
    pages[activePage].classList.remove("active");
    pages[state].classList.add("active");
  };

  for (let i = 0; i < pageControls.length; i++) {
    pageDotPostions.push(
      pageControls[i].offsetLeft + pageControls[0].offsetWidth * 0.4
    );

    pageControls[i].addEventListener("click", () => {
      setEarthPosition(earthPositions[i]);
      setControlSVGCircle(i);
      setDotPosition(i);
      setPage(i);
      activePage = i;
    });
  }

  setEarthPositions();

  window.addEventListener("wheel", (e) => {
    let nextState;

    if (e.deltaY < 0 && activePage > 0) {
      nextState = activePage - 1;
    }

    if (e.deltaY > 0 && activePage < pageControls.length - 1) {
      nextState = activePage + 1;
    }

    if (nextState !== undefined) {
      controlSVGs[activePage].classList.remove("active");
      controlSVGs[nextState].classList.add("active");
      setEarthPosition(earthPositions[nextState]);
      setDotPosition(nextState);
      setPage(nextState);
      activePage = nextState;
    }
  });

  window.matchMedia("(max-width: 1100px)").addEventListener("change", (e) => {
    if (e) {
      setEarthPositions();
    }
  });

  window.matchMedia("(max-width: 768px)").addEventListener("change", (e) => {
    if (e) {
      swiper2.destroy();
      swiper2 = swiper2Creator();
    }
  });

  // SWIPERS ///////////////////////////////////////////////////////////////////
  new Swiper("#page-1", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: "#swiper-pagination-1",
      clickable: true,
    },
    speed: 1500,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });

  const swiper2Creator = () => {
    if (document.body.offsetWidth > 768) {
      return new Swiper("#page-2", {
        slidesPerView: 2,
        spaceBetween: 60,
        grid: {
          rows: 2,
        },
      });
    }

    return new Swiper("#page-2", {
      slidesPerView: 1,
      grabCursor: true,
      spaceBetween: 30,
      grid: {
        rows: 2,
      },
      pagination: {
        el: "#swiper-pagination-2",
        clickable: true,
      },
      speed: 1000,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
  };

  let swiper2 = swiper2Creator();

  new Swiper("#page-5", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: "#swiper-pagination-5",
      clickable: true,
    },
    speed: 1000,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 3,
      },
    },
  });

  new Swiper("#page-6", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    speed: 1000,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
      },
      930: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 3,
      },
    },
  });

  // ACCORDIONS ///////////////////////////////////////////////////////////////////
  const tabs = document.getElementsByClassName("tab");
  const accordionTabs = document.getElementsByClassName("accordion-tab");
  const accordionTitles = document.getElementsByClassName("accordion-title");
  let activeTab = 0;

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", () => {
      tabs[activeTab].classList.remove("active");
      tabs[i].classList.add("active");
      accordionTabs[activeTab].classList.remove("active");
      accordionTabs[i].classList.add("active");
      activeTab = i;
    });
  }

  for (const accordionTitle of accordionTitles) {
    accordionTitle.addEventListener("click", () => {
      accordionTitle
        .closest(".accordion-tab")
        .querySelector(".active")
        .classList.remove("active");
      accordionTitle.closest(".accordion").classList.add("active");
    });
  }

  // FORM ///////////////////////////////////////////////////////////////////
  $(() => $(":input").inputmask());

  // MAP ////////////////////////////////////////////////////////////////////
});
