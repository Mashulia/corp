// contents:
// array.remove
// delay function
// touch device detection
// ie11 polyfill .closest()
// ie11 polyfill .forEach()

// mobile header toggle
// search toggle
// header menu overflow
// dropdowns
// header menu dropdowns
// handle videos__link.click

// slick
// fancybox

// functions on load
// functions on resize

// slick
// tabs
// trimming text by number of lines

// array.remove
Array.prototype.remove = function () {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

// delay function to use on resize to prevent multiple resize events
var delay = (function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

// ie11 polyfill .closest()
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// ie11 polyfill .forEach
// note that forEach works for .querySelectorAll, but doesn't on getElementsByClassName
if ("NodeList" in window && !NodeList.prototype.forEach) {
  console.info("polyfill for IE11");
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
// ie11 polyfill includes()
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function (searchElement, fromIndex) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === "number" &&
            typeof y === "number" &&
            isNaN(x) &&
            isNaN(y))
        );
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

window.addEventListener("load", function () {
  var windowWidth = window.innerWidth;
  var rootElem = document.querySelector(".corp");
  var documentHeight = rootElem.clientHeight;

  // touch device detection
  var touchDevice = false;
  window.addEventListener(
    "touchstart",
    function onFirstTouch() {
      touchDevice = true;
      initTouchEvents();
      window.removeEventListener("touchstart", onFirstTouch, false);
    },
    false
  );
  window.addEventListener(
    "mousemove",
    function onFirstMove() {
      initMouseEvents();
      window.removeEventListener("mousemove", onFirstMove, false);
    },
    false
  );

  // mobile header toggle
  var headerOpeners = document.getElementsByClassName("header__opener");

  function initMobileHeader() {
    if (headerOpeners) {
      for (let i = 0; i < headerOpeners.length; i++) {
        headerOpeners[i].addEventListener("click", openMobileHeader);
        headerOpeners[i]
          .closest(".mheader")
          .querySelector(".header__closer")
          .addEventListener("click", closeMobileHeader);
      }
    }
  }
  function detachMobileHeader() {
    let mheaders = document.querySelectorAll(".mheader");
    if (mheaders) {
      for (let i = 0; i < mheaders.length; i++) {
        mheaders[i]
          .querySelector(".header__opener")
          .removeEventListener("click", openMobileHeader);
        mheaders[i]
          .querySelector(".header__closer")
          .removeEventListener("click", closeMobileHeader);
        mheaders[i].classList.remove("mheader--opened");
      }
    }
    let pageOverlay = document.getElementsByClassName("page-overlay")[0];
    removePageOverlay(pageOverlay);
  }
  function openMobileHeader() {
    this.closest(".mheader").classList.add("mheader--opened");
    let pageOverlay = createPageOverlay();
    pageOverlay.addEventListener("click", closeMobileHeader);
  }
  function closeMobileHeader() {
    let pageOverlay = document.getElementsByClassName("page-overlay")[0];
    removePageOverlay(pageOverlay);
    this.closest(".mheader").classList.remove("mheader--opened");
  }
  function createPageOverlay() {
    let pageOverlay = document.createElement("div");
    pageOverlay.classList.add("page-overlay");
    document.getElementsByClassName("corp")[0].appendChild(pageOverlay);
    setTimeout(function () {
      document.getElementsByTagName("body")[0].classList.add("overlayed");
    }, 100);
    return pageOverlay;
  }
  function removePageOverlay(pageOverlay) {
    document.getElementsByTagName("body")[0].classList.remove("overlayed");
    setTimeout(function () {
      if (pageOverlay) {
        pageOverlay.remove();
      }
    }, 300);
  }

  // search toggle
  var searchToggles = document.getElementsByClassName("search__toggle");
  var searchBody = document.querySelector(".popup-search");
  var searchClose = searchBody
    ? searchBody.querySelector(".search__close")
    : [];
  let searchBodyButtons = searchBody.querySelectorAll("button");

  function toggleSearch() {
    searchBody.classList.toggle("popup-search--opened");
    if (searchBody.classList.contains("popup-search--opened")) {
      let pageOverlay = createPageOverlay();
      pageOverlay.addEventListener("click", closeSearchPopup);
      searchBody.querySelector("input").focus({ preventScroll: true });
      for (let i = 0; i < searchBodyButtons.length; i++) {
        searchBodyButtons[i].setAttribute("tabindex", 0);
      }
    } else {
      for (let i = 0; i < searchBodyButtons.length; i++) {
        searchBodyButtons[i].setAttribute("tabindex", -1);
      }
      let pageOverlay = document.getElementsByClassName("page-overlay")[0];
      if (pageOverlay) {
        pageOverlay.removeEventListener("click", closeSearchPopup);
        removePageOverlay(pageOverlay);
      }
    }
  }
  function closeSearchPopup() {
    searchBody.classList.remove("popup-search--opened");
    let pageOverlay = document.getElementsByClassName("page-overlay")[0];
    if (pageOverlay) {
      pageOverlay.removeEventListener("click", closeSearchPopup);
      removePageOverlay(pageOverlay);
    }
  }

  // header menu overflow
  let primaryNavs = document.querySelectorAll(".dheader .primary-nav");
  let globalNavs = this.document.querySelectorAll(".dheader .site-nav");

  function handleNavOverflow(navigation, spacing) {
    let navList = navigation.querySelector("ul");
    let maxNavWidth = navigation ? navigation.offsetWidth : 600;
    // console.log("max width " + maxNavWidth);
    let navItems = navList ? navList.children : [];
    let factNavWidth = 0;
    var extraNav = navigation.querySelector(".nav--extra");
    var extraNavUl = extraNav ? extraNav.getElementsByTagName("ul")[0] : [];
    for (let i = 0; i < navItems.length; i++) {
      let el = navItems[i];
      factNavWidth += el.offsetWidth;
      // console.log("current width " + factNavWidth + " (" + (i + 1) + " elements)");
      // console.log("child " + i + " " + el.offsetWidth);
      if (
        extraNavUl &&
        (factNavWidth > maxNavWidth ||
          (el.nextElementSibling && factNavWidth > maxNavWidth - spacing))
      ) {
        extraNavUl.appendChild(el.cloneNode(true));
        el.style.display = "none";
      }
    }
    if (extraNavUl && extraNavUl.children.length) {
      navigation.classList.add("nav--overflown");
    }
    navigation.classList.add("nav--handled");
  }
  function resetNavOverflow(navigation) {
    let navList = navigation.querySelector("ul");
    let navItems = navList ? navList.children : [];
    var extraNav = navigation.querySelector(".nav--extra");
    var extraNavUl = extraNav ? extraNav.getElementsByTagName("ul")[0] : [];
    if (extraNavUl) {
      navigation.classList.remove("nav--overflown");
      extraNavUl.innerHTML = null;
    }
    navigation.classList.remove("nav--handled");
    for (let i = 0; i < navItems.length; i++) {
      let el = navItems[i];
      el.style.display = "";
    }
  }

  // dropdowns
  function toggleDropdown(e) {
    e.preventDefault();
    var dropdownRoot = e.target.closest(".dropdown");
    dropdownRoot.classList.toggle("dropdown--opened");
    if (
      window.innerWidth > 767 &&
      dropdownRoot.classList.contains("dropdown--opened")
    ) {
      fixDropdown(dropdownRoot.querySelector(".dropdown__body"));
      closeWhatever(dropdownRoot, "dropdown--opened");
    }
  }
  function closeWhatever(elem, className) {
    var closeExpanded = (event) => {
      if (!elem.contains(event.target)) {
        elem.classList.remove(className);
        removeClickListener();
      }
    };
    var removeClickListener = () => {
      document.removeEventListener("click", closeExpanded);
    };
    document.addEventListener("click", closeExpanded);
  }
  var dropdownToggles = document.getElementsByClassName("dropdown__toggle");
  for (var i = 0; i < dropdownToggles.length; i++) {
    dropdownToggles[i].addEventListener("click", toggleDropdown);
  }

  // header menu dropdowns
  var expandToggles = document.getElementsByClassName("expand__toggle");
  function attachExpands(elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener("click", toggleExpand);
    }
  }
  function removeExpands(elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].removeEventListener("click", toggleExpand);
    }
  }
  function toggleExpand(e) {
    e.preventDefault();
    var expandRoot = e.target.closest(".expand");
    expandRoot.classList.toggle("expand--opened");
    if (
      window.innerWidth > 1023 &&
      expandRoot.classList.contains("expand--opened")
    ) {
      fixDropdown(expandRoot.querySelector(".expand__body"));
      closeWhatever(expandRoot, "expand--opened");
    }
  }
  function closeMenuExpands() {
    var expandedMenus = document.getElementsByClassName("expand");
    for (var i = 0; i < expandedMenus.length; i++) {
      expandedMenus[i].classList.remove("expand--opened");
    }
  }
  function fixDropdown(elem) {
    var bounding = elem.getBoundingClientRect();
    if (
      bounding.right >
      (window.innerWidth || document.documentElement.clientWidth)
    ) {
      elem.classList.add("dropdown__body--right");
    }
  }

  // page-nav dropdowns on mobile
  var pageNavToggles = document.getElementsByClassName("page-nav__toggle");

  function togglePageNav(e) {
    e.target.closest(".page-nav").classList.toggle("page-nav--opened");
  }
  function clearPageNavToggle() {
    var pageNavs = document.getElementsByClassName("page-nav");
    for (var i = 0; i < pageNavs.length; i++) {
      pageNavs[i].classList.remove("page-nav--opened");
    }
    for (var i = 0; i < pageNavToggles.length; i++) {
      pageNavToggles[i].removeEventListener("click", togglePageNav);
    }
  }
  function attachPageNavToggle() {
    for (var i = 0; i < pageNavToggles.length; i++) {
      pageNavToggles[i].addEventListener("click", togglePageNav);
    }
  }

  // handle videos__link.click
  let vidLinks = document.querySelectorAll(".videos__link");
  if (vidLinks) {
    for (let i = 0; i < vidLinks.length; i++) {
      vidLinks[i].addEventListener("click", removeVidCover);
    }
  }
  function removeVidCover(e) {
    e.preventDefault();
    e.target.closest(".videos__item").classList.add("videos__item--play");
    e.target.removeEventListener("click", removeVidCover);
  }

  // slick
  let slickSettings = {
    prevArrow:
      '<button class="slick-prev slick-arrow" aria-label="Предыдущий слайд" type="button">' +
      '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M7 13L2 7M2 7L7 1M2 7H16" stroke="currentColor" stroke-width="2"/>' +
      "</svg>" +
      "</button>",
    nextArrow:
      '<button class="slick-next slick-arrow" aria-label="Следующий слайд" type="button">' +
      '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M9 13L14 7M14 7L9 1M14 7H0" stroke="currentColor" stroke-width="2"/>' +
      "</svg>" +
      "</button>"
  };
  if (typeof $.fn.slick !== "undefined") {
    $(".hero__slider").slick({
      ...slickSettings,
      ...{
        arrows: true,
        dots: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1448,
            settings: {
              arrows: false
            }
          }
        ]
      }
    });
    $(".products__images__list").each(function () {
      let $currSlider = $(this);
      if ($currSlider.children().length > 1) {
        $currSlider.slick({
          // prevArrow: '<button class="slick-prev slick-arrow" aria-label="Предыдущий слайд" type="button">' +
          //   '<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          //   '<path d="M1 15L8 8L0.999999 1" stroke="currentColor" stroke-width="2" transform="rotate(180)" transform-origin="50% 50%"/>' +
          //   '</svg>' +
          //   '</button>',
          // nextArrow: '<button class="slick-next slick-arrow" aria-label="Следующий слайд" type="button">' +
          //   '<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          //   '<path d="M1 15L8 8L0.999999 1" stroke="currentColor" stroke-width="2"/>' +
          //   '</svg>' +
          //   '</button>',
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          infinite: false
          // responsive: [
          //   {
          //     breakpoint: 1448,
          //     settings: {
          //       arrows: false
          //     }
          //   }
          // ]
        });
        let oldMousePos = 0;
        let newMousePos = 0;
        this.addEventListener("mousemove", function (e) {
          newMousePos = e.pageX;
          delay(function () {
            if (newMousePos < oldMousePos - 20) {
              $currSlider.slick("slickPrev");
            } else if (newMousePos > oldMousePos + 20) {
              $currSlider.slick("slickNext");
            }
            oldMousePos = newMousePos;
          }, 100);
        });
      } else {
        this.classList.add("handled");
      }
    });
    $(".folio__images").slick({
      ...slickSettings,
      ...{
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        dots: false,
        centerMode: true,
        centerPadding: "228px",
        asNavFor: ".folio__nav",
        responsive: [
          {
            breakpoint: 1448,
            settings: {
              centerMode: false,
              arrows: false
            }
          }
        ]
      }
    });
    $(".folio__nav").slick({
      slidesToShow: 11,
      slidesToScroll: 1,
      asNavFor: ".folio__images",
      arrows: false,
      dots: false,
      centerMode: true,
      centerPadding: "70px",
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1140,
          settings: {
            centerPadding: "64px",
            slidesToShow: 7
          }
        },
        {
          breakpoint: 1024,
          settings: {
            centerPadding: "48px",
            slidesToShow: 9
          }
        },
        {
          breakpoint: 576,
          settings: {
            centerPadding: "20px",
            slidesToShow: 5
          }
        }
      ]
    });
    $(".reviews__slider").slick({
      ...slickSettings,
      ...{
        slidesToScroll: 1,
        slidesToShow: 1,
        adaptiveHeight: true,
        infinite: false,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 1448,
            settings: {
              arrows: false
            }
          }
        ]
      }
    });
  } else {
    console.log("no slick or not loaded");
  }
  // fancybox
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.backFocus = false;
  $.fancybox.defaults.idleTime = 0;
  $.fancybox.defaults.infobar = false;
  $.fancybox.defaults.smallBtn = "auto";
  $.fancybox.defaults.toolbar = "auto";
  $.fancybox.defaults.buttons = ["close"];
  $.fancybox.defaults.btnTpl = {
    // Arrows
    arrowLeft:
      '<button data-fancybox-prev class="fancy-arrow fancy-arrow--left" title="Предыдущий">' +
      '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M7 13L2 7M2 7L7 1M2 7H16" stroke="currentColor" stroke-width="2"/>' +
      "</svg>" +
      "</button>",
    arrowRight:
      '<button data-fancybox-next class="fancy-arrow fancy-arrow--right" title="Следующий">' +
      '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M9 13L14 7M14 7L9 1M14 7H0" stroke="currentColor" stroke-width="2"/>' +
      "</svg>" +
      "</button>",
    smallBtn:
      '<button data-fancybox-close class="fancy-close fancy-close--content" title="Закрыть">' +
      '<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M1.271 1.27075L5.50016 5.49992M9.72933 9.72908L5.50016 5.49992M5.50016 5.49992L9.72933 1.27075M5.50016 5.49992L1.271 9.72908" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      "</svg>" +
      "</button>",
    close:
      '<button data-fancybox-close class="fancy-close" title="Закрыть">' +
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M1.1665 1.16669L6.99984 7.00002M12.8332 12.8334L6.99984 7.00002M6.99984 7.00002L12.8332 1.16669M6.99984 7.00002L1.1665 12.8334" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      "</svg>" +
      "</button>"
  };
  $(function () {
    $(".fancy-image").fancybox();
  });

  // functions on load
  function initTouchEvents() {
    attachExpands(expandToggles);
  }
  function initMouseEvents() {
    document.querySelector("body").classList.add("hoverable");
    var productSliders = document.getElementsByClassName("product__images");
    for (var i = 0; i < productSliders.length; i++) {
      productSliders[i].classList.add("product__images--desk");
    }
    if (windowWidth < 1024) {
      attachExpands(expandToggles);
    }
  }
  if (headerOpeners && windowWidth < 1024) {
    initMobileHeader();
  }
  if (searchToggles && windowWidth > 1023) {
    for (let i = 0; i < searchToggles.length; i++) {
      searchToggles[i].addEventListener("click", toggleSearch);
    }
    searchClose.addEventListener("click", toggleSearch);
  }
  if (windowWidth > 1023) {
    // fonts influence elements' sizes, so wait till font has loaded and then fix the menu overflow
    document.fonts.load('1rem "Manrope"').then(
      () => {
        for (let i = 0; i < primaryNavs.length; i++) {
          let el = primaryNavs[i];
          handleNavOverflow(el, 48);
        }
        for (let i = 0; i < globalNavs.length; i++) {
          let el = globalNavs[i];
          handleNavOverflow(el, 32);
        }
      },
      () => {
        for (let i = 0; i < primaryNavs.length; i++) {
          let el = primaryNavs[i];
          handleNavOverflow(el, 40);
        }
        for (let i = 0; i < globalNavs.length; i++) {
          let el = globalNavs[i];
          handleNavOverflow(globalNavs[i], 24);
        }
      }
    );
  }
  if (windowWidth < 1024) {
    attachPageNavToggle();
  }

  var telSelector = document.querySelectorAll("input[type='tel']");
  Inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(telSelector);

  let toTopElem = document.querySelector(".to-top");
  let toTopLink = toTopElem.querySelector(".to-top__link");
  // document.querySelector(".footer").offsetTop - window.innerHeight - point at which one can see footer
  let footerElm = document.querySelector(".footer");
  if (toTopElem) {
    toTopLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo(0, 0);
    });

    this.window.onscroll = function (event) {
      // no delay() here cause needed a smooth transition between fixed and absolute at footer
      showToTop();
    };
  }
  function showToTop() {
    let fixinPoint =
      window.innerWidth < 1024
        ? footerElm.offsetTop -
          window.innerHeight +
          footerElm.offsetHeight * 0.3
        : footerElm.offsetTop - window.innerHeight;
    if (window.innerWidth > 1447) {
      fixinPoint =
        footerElm.offsetTop - window.innerHeight + footerElm.offsetHeight * 0.7;
    }
    if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
    ) {
      toTopElem.classList.add("to-top--visible");
      toTopLink.setAttribute("tabindex", "0");
      if (
        document.body.scrollTop > fixinPoint ||
        document.documentElement.scrollTop > fixinPoint
      ) {
        toTopElem.classList.add("to-top--footed");
      } else {
        toTopElem.classList.remove("to-top--footed");
      }
    } else {
      toTopLink.setAttribute("tabindex", "-1");
      toTopElem.classList.remove("to-top--visible");
      toTopElem.classList.remove("to-top--footed");
    }
  }

  // aside navigation toggling on mobile
  let asideNavToggles = document.querySelectorAll(".snavigation__toggle");
  if (asideNavToggles && windowWidth < 1024) {
    for (let i = 0; i < asideNavToggles.length; i++) {
      let el = asideNavToggles[i];
      el.addEventListener("click", toggleAsideNav);
    }
  }
  function toggleAsideNav(e) {
    e.preventDefault();
    e.target.closest(".snavigation").classList.toggle("snavigation--opened");
  }

  // reviews pictures number overflow
  let reviewPictures = document.querySelectorAll(".reviews__images");
  function resetReviewPictures() {
    for (let i = 0; i < reviewPictures.length; i++) {
      reviewPictures[i].style.height = "";
      let moreLink = reviewPictures[i].getElementsByClassName(
        "reviews__image--more"
      );
      if (moreLink.length) {
        moreLink[0].removeEventListener("click", handleReviewPicturesMore);
        moreLink[0].classList.remove("reviews__image--more");
      }
    }
  }
  function handleReviewPicturesOverflow() {
    reviewPictures.forEach((el) => {
      let elPics = el.getElementsByClassName("reviews__image");
      let hiddenEls = Array.from(elPics).filter((el) => {
        return el.offsetTop > 45;
      });
      if (hiddenEls.length) {
        let index = elPics.length - hiddenEls.length - 1;
        elPics[index].classList.add("reviews__image--more");
        elPics[index].getElementsByClassName(
          "reviews__image__overflow"
        )[0].innerHTML = "+ " + hiddenEls.length + " фото";
      }
    });
  }
  function attachReviewsImagesMore() {
    let reviewPicturesMore = document.getElementsByClassName(
      "reviews__image--more"
    );
    for (let i = 0; i < reviewPicturesMore.length; i++) {
      reviewPicturesMore[i].addEventListener("click", handleReviewPicturesMore);
    }
  }
  function handleReviewPicturesMore(e) {
    e.preventDefault();
    let closestLink = e.target.closest("a");
    closestLink.classList.remove("reviews__image--more");
    closestLink.removeEventListener("click", handleReviewPicturesMore);
    e.target.closest(".reviews__images").style.height = "auto";
  }
  if (reviewPictures.length) {
    handleReviewPicturesOverflow();
    attachReviewsImagesMore();
  }

  // $("form").submit(function (e) {
  //   $(this)
  //     .slideUp(function () {
  //       $(this).addClass("custom-form--handled");
  //     })
  //     .slideDown();

  //   e.preventDefault();
  // });

  // functions on resize
  window.onresize = function (event) {
    delay(function () {
      delayedFunctions();
    }, 500);
  };

  var delayedFunctions = function () {
    windowWidth = window.innerWidth;
    documentHeight = rootElem.clientHeight;
    removeExpands(expandToggles);

    if (reviewPictures.length) {
      resetReviewPictures();
      handleReviewPicturesOverflow();
      attachReviewsImagesMore();
    }

    if (windowWidth < 1024) {
      initMobileHeader();
      for (let i = 0; i < searchToggles.length; i++) {
        let el = searchToggles[i];
        el.removeEventListener("click", toggleSearch);
        closeSearchPopup();
      }
      searchClose.removeEventListener("click", toggleSearch);

      for (let i = 0; i < primaryNavs.length; i++) {
        let el = primaryNavs[i];
        resetNavOverflow(el);
      }

      for (let i = 0; i < globalNavs.length; i++) {
        let el = globalNavs[i];
        resetNavOverflow(el);
      }

      for (let i = 0; i < asideNavToggles.length; i++) {
        let el = asideNavToggles[i];
        el.addEventListener("click", toggleAsideNav);
      }
    } else {
      detachMobileHeader();
      for (let i = 0; i < searchToggles.length; i++) {
        let el = searchToggles[i];
        el.addEventListener("click", toggleSearch);
      }
      searchClose.addEventListener("click", toggleSearch);

      for (let i = 0; i < primaryNavs.length; i++) {
        let el = primaryNavs[i];
        resetNavOverflow(el);
        handleNavOverflow(el, 48);
      }

      for (let i = 0; i < globalNavs.length; i++) {
        let el = globalNavs[i];
        resetNavOverflow(el);
        handleNavOverflow(el, 32);
      }

      for (let i = 0; i < asideNavToggles.length; i++) {
        let el = asideNavToggles[i];
        el.removeEventListener("click", toggleAsideNav);
      }
    }

    if (touchDevice || windowWidth < 1024) {
      attachExpands(expandToggles);
      closeMenuExpands();
    }

    clearPageNavToggle();
    if (windowWidth < 1024) {
      attachPageNavToggle();
    }
  };
});

// tabs
const tabsSwitches = document.getElementsByClassName("js-tab");
if (tabsSwitches.length) {
  for (let n = 0; n < tabsSwitches.length; n++) {
    const tabSwitch = tabsSwitches[n];
    tabSwitch.addEventListener("click", function (e) {
      e.preventDefault();
      const tabsRoot = this.closest(".tabs");
      const tabsSwitches = tabsRoot.querySelectorAll(".tabs__switch");
      for (let i = 0; i < tabsSwitches.length; i++) {
        tabsSwitches[i].classList.remove("tabs__switch--active");
      }
      this.classList.add("tabs__switch--active");

      const tabsPanels = tabsRoot.querySelectorAll(".tabs__panel");
      const activePanel = document.getElementById(this.href.split("#")[1]);
      if (activePanel) {
        for (let i = 0; i < tabsPanels.length; i++) {
          tabsPanels[i].classList.remove("tabs__panel--active");
        }
        activePanel.classList.add("tabs__panel--active");

        // if slick inside tab panels, reset slick
        const tabSlider = activePanel.querySelector(".slider");
        if (tabSlider) {
          $(tabSlider).get(0).slick.setPosition();
        }
      }
    });
  }
}

// trimming text by number of lines
const reviewTexts = document.querySelectorAll(".b-reviews .b-reviews__text");
for (var i = 0; i < reviewTexts.length; i++) {
  const reviewText = reviewTexts[i];
  var numLines = 6;
  if (reviewText.classList.contains("b-reviews__text--solo")) {
    numLines = 10;
  }
  $clamp(reviewText, { clamp: numLines });
}

const productTitles = document.querySelectorAll(".b-products__title");
for (var i = 0; i < productTitles.length; i++) {
  const productTitle = productTitles[i];
  $clamp(productTitle, { clamp: 2 });
}
