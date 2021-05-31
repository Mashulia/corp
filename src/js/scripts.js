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
Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
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
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// ie11 polyfill .forEach
if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
// ie11 polyfill includes()
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
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
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
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

window.addEventListener("load", function() {
  var windowWidth =  window.innerWidth;

  // touch device detection
  var touchDevice = false;
  window.addEventListener('touchstart', function onFirstTouch() {
    touchDevice = true;
    initTouchEvents();
    window.removeEventListener('touchstart', onFirstTouch, false);
  }, false);
  window.addEventListener('mousemove', function onFirstMove() {
    initMouseEvents();
    window.removeEventListener('mousemove', onFirstMove, false);
  }, false);

  // mobile header toggle
  var headerOpener = document.getElementsByClassName("header__opener")[0];
  var mheader = headerOpener ? headerOpener.closest(".mheader") : false;
  var headerCloser = mheader ? mheader.querySelector(".header__closer") : false;

  function initMobileHeader() {
    headerOpener.addEventListener("click", openMobileHeader);
    headerCloser.addEventListener("click", closeMobileHeader);
  }
  function detachMobileHeader() {
    headerOpener.removeEventListener("click", openMobileHeader);
    headerCloser.removeEventListener("click", closeMobileHeader);
    mheader.classList.remove("mheader--opened");
    let pageOverlay = document.getElementsByClassName("page-overlay")[0];
    if (pageOverlay) {
      pageOverlay.remove();
    }
  }
  function openMobileHeader() {
    mheader.classList.add("mheader--opened");
    let pageOverlay = document.createElement('div');
    pageOverlay.classList.add('page-overlay');
    document.getElementsByClassName("corp")[0].appendChild(pageOverlay);
    document.getElementsByClassName("page-overlay")[0].addEventListener("click", closeMobileHeader);
  }
  function closeMobileHeader() {
    mheader.classList.remove("mheader--opened");
    document.getElementsByClassName("page-overlay")[0].remove();
  }

  // search toggle
  var searchToggle = document.getElementsByClassName("search__toggle")[0];
  var searchRoot = searchToggle ? searchToggle.closest(".search") : 0;
  var searchClose = searchRoot ? searchRoot.querySelector(".search__close") : 0;
  var searchBody = searchRoot ? searchRoot.querySelector(".search__body") : 0;

  function toggleSearch() {
    searchRoot.classList.toggle("search--opened");
    if(searchRoot.classList.contains("search--opened")) {
      searchRoot.querySelector("input").focus({preventScroll:true});
      searchBody.addEventListener("click", closeSearchPopup);
    } else {
      searchBody.removeEventListener("click", closeSearchPopup);
    }
  }
  function closeSearchPopup(e) {
    console.log(e.target);
    if (e.target.classList.contains("search__body")) {
      searchRoot.classList.remove("search--opened");
      searchBody.removeEventListener("click", closeSearchPopup);
    }
  }

  // header menu overflow
  var siteNav = document.querySelector(".primary-nav > .primary-nav__list");
  var maxSiteNavWidth = siteNav ? siteNav.offsetWidth : 1000;
  var factSiteNavWidth = 0;
  var extraSiteNav = document.querySelector(".primary-nav--extra");
  var extraSiteNavUl = extraSiteNav ? extraSiteNav.getElementsByTagName("ul")[0] : 0;
  var siteNavItems = siteNav ? siteNav.children : null;

  function handleSiteNavOverflow() {
    // console.log(maxSiteNavWidth);
    for (var i=0; i<siteNavItems.length; i++) {
      factSiteNavWidth += siteNavItems[i].offsetWidth;
      // console.log(factSiteNavWidth);
      // console.log("child " + i + " " + siteNavItems[i].offsetWidth);
      if (factSiteNavWidth > maxSiteNavWidth || (siteNavItems[i].nextElementSibling && factSiteNavWidth > (maxSiteNavWidth - 60))) {
        extraSiteNavUl.appendChild(siteNavItems[i].cloneNode(true));
        siteNavItems[i].style.display="none";
      }
    }
    if(extraSiteNavUl.children.length) {
      extraSiteNav.style.display = "block";
    }
    siteNav.style.overflow = "visible";
    siteNav.style.paddingRight = "4rem";
  }
  function resetSiteNavOverflow() {
    extraSiteNav.style.display = "none";
    extraSiteNavUl.innerHTML = null;
    siteNav.style.overflow = "hidden";
    siteNav.style.paddingRight = "0";
    for (var i=0; i<siteNavItems.length; i++) {
      siteNavItems[i].style.display="";
    }
    factSiteNavWidth = 0;
    maxSiteNavWidth = siteNav ? siteNav.offsetWidth : 850;
  }

  // dropdowns
  function toggleDropdown(e) {
    var dropdownRoot = e.target.closest(".dropdown");
    dropdownRoot.classList.toggle("dropdown--opened");
    if(window.innerWidth > 767 && dropdownRoot.classList.contains("dropdown--opened")) {
      fixDropdown(dropdownRoot.querySelector(".dropdown__body"));
      closeWhatever(dropdownRoot, "dropdown--opened");
    }
  }
  function closeWhatever(elem, className) {
    var closeExpanded = event => {
      if (!elem.contains(event.target)) {
        elem.classList.remove(className);
        removeClickListener();
      }
    }
    var removeClickListener = () => {
      document.removeEventListener('click', closeExpanded);
    }
    document.addEventListener("click", closeExpanded);
  }
  var dropdownToggles = document.getElementsByClassName("dropdown__toggle");
  for (var i = 0; i < dropdownToggles.length; i++) {
    dropdownToggles[i].addEventListener("click", toggleDropdown);
  }

  // header menu dropdowns
  var ddTimer = 0;
  var ddDelay = 200;
  var ddPrevent = false;
  var expandToggles = document.getElementsByClassName("expand__toggle");
  function attachExpands(elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener("click", toggleExpand);
      elems[i].addEventListener("dblclick", followMenuLink);
    }
  }
  function removeExpands(elems) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].removeEventListener("click", toggleExpand);
      elems[i].removeEventListener("dblclick", followMenuLink);
    }
  }
  function toggleExpand(e) {
    e.preventDefault();
    var expandRoot = e.target.closest(".expand");
    ddTimer = setTimeout(function() {
      if (!ddPrevent) {
        expandRoot.classList.toggle("expand--opened");
        if(window.innerWidth > 1023 && expandRoot.classList.contains("expand--opened")) {
          fixDropdown(expandRoot.querySelector(".expand__body"));
          closeWhatever(expandRoot, "expand--opened");
        }
      }
      ddPrevent = false;
    }, ddDelay);
  }
  function followMenuLink() {
    clearTimeout(ddTimer);
    ddPrevent = true;
    window.location = this.href;
  }
  function closeMenuExpands() {
    var expandedMenus = document.getElementsByClassName("expand");
    for (var i=0; i<expandedMenus.length; i++) {
      expandedMenus[i].classList.remove("expand--opened");
    }
  }
  function fixDropdown(elem) {
    var bounding = elem.getBoundingClientRect();
    if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
      elem.style.left = "auto";
      elem.style.right = "0";
    }
  }

  // page-nav dropdowns on mobile
  var pageNavToggles = document.getElementsByClassName("page-nav__toggle");

  function togglePageNav(e) {
    e.target.closest(".page-nav").classList.toggle("page-nav--opened");
  }
  function clearPageNavToggle() {
    var pageNavs = document.getElementsByClassName("page-nav");
    for (var i=0; i<pageNavs.length; i++) {
      pageNavs[i].classList.remove("page-nav--opened");
    }
    for(var i=0; i<pageNavToggles.length; i++) {
      pageNavToggles[i].removeEventListener("click", togglePageNav);
    }
  }
  function attachPageNavToggle() {
    for(var i=0; i<pageNavToggles.length; i++) {
      pageNavToggles[i].addEventListener("click", togglePageNav);
    }
  }

  // handle videos__link.click
  let vidLinks = document.querySelectorAll(".videos__link");
  if (vidLinks) {
    for (let i=0; i < vidLinks.length; i++) {
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
    arrows: true,
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Предыдущий слайд" type="button"><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L2 7M2 7L7 1M2 7H16" stroke="currentColor" stroke-width="2"/></svg></button>',
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Следующий слайд" type="button"><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 13L14 7M14 7L9 1M14 7H0" stroke="currentColor" stroke-width="2"/></svg></button>'
  }
  if (typeof $.fn.slick !== 'undefined') {
    $(".hero__slider").slick({
      ...slickSettings,
      ...{
        arrows: false,
        dots: true,
        adaptiveHeight: true,
        // responsive: [
        //   {
        //     breakpoint: 576,
        //     settings: {
        //       adaptiveHeight: true
        //     }
        //   }
        // ]
      }
    });
    $(".products__images__list").each(function() {
      if ($(this).children().length > 1) {
        $(this).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            infinite: false
        });
      }
    });
    $('.folio__images').slick({
      ...slickSettings,
      ...{
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        dots: false,
        centerMode: true,
        centerPadding: "120px",
        asNavFor: '.folio__nav',
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
    $('.folio__nav').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.folio__images',
      arrows: false,
      dots: false,
      centerMode: true,
      centerPadding: "48px",
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerPadding: "20px"
          }
        }
      ]
    });
    $(".reviews__slider").slick({
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
    });
  } else {
    console.log("no slick or not loaded");
  }
  // fancybox
  $.fancybox.defaults.autoFocus = false;
  $.fancybox.defaults.backFocus = false;
  $.fancybox.defaults.idvarime = 0;
  $.fancybox.defaults.infobar = false;
  $.fancybox.defaults.smallBtn = "auto";
  $.fancybox.defaults.toolbar = "auto";
  $.fancybox.defaults.buttons = ["close"];
  $.fancybox.defaults.btnTpl = {
    // Arrows
    arrowLeft:
      '<button data-fancybox-prev class="fancy-arrow fancy-arrow--left" title="Предыдущий">' +
      '<svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M17 1L2 16L17 31" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>' +
      "</button>",
    arrowRight:
      '<button data-fancybox-next class="fancy-arrow fancy-arrow--right" title="Следующий">' +
      '<svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M1 1L16 16L1 31" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>' +
      "</button>",
    smallBtn:
      '<button data-fancybox-close class="fancy-close fancy-close--content" title="Закрыть">' +
      '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M24 1L12.5 12.5M12.5 12.5L24 24M12.5 12.5L1 1M12.5 12.5L1 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>' +
      '</button>',
    close:
      '<button data-fancybox-close class="fancy-close" title="Закрыть">' +
      '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M24 1L12.5 12.5M12.5 12.5L24 24M12.5 12.5L1 1M12.5 12.5L1 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>' +
      '</button>',
  };
  $(function() {
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
  if (headerOpener && headerCloser && windowWidth < 1024) {
    initMobileHeader();
  }
  if(searchToggle && searchRoot && searchClose && windowWidth > 1023) {
    searchToggle.addEventListener("click", toggleSearch);
    searchClose.addEventListener("click", toggleSearch);
  }
  if(windowWidth > 1023) {
    handleSiteNavOverflow();
  }
  if(windowWidth < 1024) {
    attachPageNavToggle();
  }

  var telSelector = document.querySelectorAll("input[type='tel']");
  Inputmask({
    "mask": "+7 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(telSelector);

  let toTopElem = document.querySelector(".to-top");
  if (toTopElem) {
    toTopElem.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo(0, 0);
    });

    this.window.onscroll = function(event) {
      delay(function() {
        showToTop();
      }, 200);
    }
  }

  function showToTop() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      toTopElem.classList.add("to-top--visible");
    } else {
      toTopElem.classList.remove("to-top--visible");
    }
  }

  // functions on resize
  window.onresize = function(event) {
    delay(function(){
      delayedFunctions();
    }, 500);
  };

  var delayedFunctions = function () {
    removeExpands(expandToggles);

    if (window.innerWidth < 1024) {
      initMobileHeader();
      searchToggle.removeEventListener("click", toggleSearch);
      searchClose.removeEventListener("click", toggleSearch);

      resetSiteNavOverflow();
    } else {
      detachMobileHeader();
      searchToggle.addEventListener("click", toggleSearch);
      searchClose.addEventListener("click", toggleSearch);

      resetSiteNavOverflow();
      handleSiteNavOverflow();
    }

    if (touchDevice || window.innerWidth < 1024) {
      attachExpands(expandToggles);
      closeMenuExpands();
    }

    clearPageNavToggle();
    if(window.innerWidth < 1024) {
      attachPageNavToggle();
    }
}
});

// tabs
const tabsSwitches = document.getElementsByClassName("js-tab");
if (tabsSwitches.length) {
  for (let n=0; n < tabsSwitches.length; n++) {
    const tabSwitch = tabsSwitches[n];
    tabSwitch.addEventListener("click", function(e) {
      e.preventDefault();
      const tabsRoot = this.closest(".tabs");
      const tabsSwitches = tabsRoot.querySelectorAll(".tabs__switch");
      for (let i = 0; i < tabsSwitches.length; i++) {
        tabsSwitches[i].classList.remove("tabs__switch--active");
      }
      this.classList.add('tabs__switch--active');

      const tabsPanels = tabsRoot.querySelectorAll(".tabs__panel");
      const activePanel = document.getElementById(this.href.split("#")[1]);
      if (activePanel) {
        for (let i = 0; i < tabsPanels.length; i++) {
          tabsPanels[i].classList.remove("tabs__panel--active");
        }
        activePanel.classList.add('tabs__panel--active');

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
  if(reviewText.classList.contains("b-reviews__text--solo")) {numLines = 10;}
  $clamp(reviewText, {clamp: numLines});
}

const productTitles = document.querySelectorAll(".b-products__title");
for (var i = 0; i < productTitles.length; i++) {
  const productTitle = productTitles[i];
  $clamp(productTitle, {clamp: 2});
}