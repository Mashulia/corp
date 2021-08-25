import { revealer, inputRevealer, overlayedRevealer } from "./reveal";
import { dropdown, expand } from "./dropdowns";
import { createPageOverlay, removePageOverlay } from "./pageOverlay";
import { handleNavOverflow, resetNavOverflow } from "./navOverflow";
import { handleSlidingTabClick, TabGroup } from "./tabs";
import { qtyChanger } from "./quantity-changer";
import { handleAdd2Cart } from "./add2cart";
import { SettingsGroup } from "./settings";
// contents:
// array.remove
// delay function
// touch device detection
// ie11 polyfill .closest()
// ie11 polyfill .forEach()
// ie11 polyfill includes()
// ie11 polyfill Object.assign
// ie11 polyfill Array.from

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
// ie11 polyfill Object.assign
if (typeof Object.assign !== "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      "use strict";
      if (target === null || target === undefined) {
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
// ie11 polyfill Array.from
if (!Array.from) {
  Array.from = (function () {
    var symbolIterator;
    try {
      symbolIterator = Symbol.iterator
        ? Symbol.iterator
        : "Symbol(Symbol.iterator)";
    } catch (e) {
      symbolIterator = "Symbol(Symbol.iterator)";
    }

    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === "function" || toStr.call(fn) === "[object Function]";
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) return 0;
      if (number === 0 || !isFinite(number)) return number;
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    var setGetItemHandler = function setGetItemHandler(isIterator, items) {
      var iterator = isIterator && items[symbolIterator]();
      return function getItem(k) {
        return isIterator ? iterator.next() : items[k];
      };
    };

    var getArray = function getArray(T, A, len, getItem, isIterator, mapFn) {
      // 16. Let k be 0.
      var k = 0;

      // 17. Repeat, while k < len… or while iterator is done (also steps a - h)
      while (k < len || isIterator) {
        var item = getItem(k);
        var kValue = isIterator ? item.value : item;

        if (isIterator && item.done) {
          return A;
        } else {
          if (mapFn) {
            A[k] =
              typeof T === "undefined"
                ? mapFn(kValue, k)
                : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
        }
        k += 1;
      }

      if (isIterator) {
        throw new TypeError(
          "Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1"
        );
      } else {
        A.length = len;
      }

      return A;
    };

    // The length property of the from method is 1.
    return function from(arrayLikeOrIterator /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLikeOrIterator).
      var items = Object(arrayLikeOrIterator);
      var isIterator = isCallable(items[symbolIterator]);

      // 3. ReturnIfAbrupt(items).
      if (arrayLikeOrIterator == null && !isIterator) {
        throw new TypeError(
          "Array.from requires an array-like object or iterator - not null or undefined"
        );
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== "undefined") {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      return getArray(
        T,
        A,
        len,
        setGetItemHandler(isIterator, items),
        isIterator,
        mapFn
      );
    };
  })();
}

window.addEventListener("load", function () {
  var windowWidth = window.innerWidth;

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

  // dropdowns
  document.querySelectorAll(".dropdown__toggle").forEach((el) => {
    new dropdown(el, ".dropdown", 767);
  });

  // header menu dropdowns
  let expandToggles = document.querySelectorAll(".expand__toggle");

  function attachExpands(elems) {
    elems.forEach((item) => {
      new expand(item, ".expand", 1023);
    });
  }
  function closeMenuExpands() {
    var expandedMenus = document.getElementsByClassName("expand");
    for (var i = 0; i < expandedMenus.length; i++) {
      expandedMenus[i].classList.remove("expand--opened");
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
    $(".hero__slider").slick(
      Object.assign({}, slickSettings, {
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
      })
    );
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
    $(".folio__images").slick(
      Object.assign({}, slickSettings, {
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
      })
    );
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
    $(".reviews__slider").slick(
      Object.assign({}, slickSettings, {
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
      })
    );
    $(".illustrations__pic__slider").each(function () {
      let $currentSlider = $(this);
      if ($currentSlider.children().length > 1) {
        $currentSlider.slick(
          Object.assign({}, slickSettings, {
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            arrows: true,
            dots: false,
            asNavFor: ".illustrations__nav__slider",
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  arrows: false
                }
              },
              {
                breakpoint: 576,
                settings: {
                  arrows: false,
                  dots: true
                }
              }
            ]
          })
        );
      } else {
        this.style.height = "auto";
      }
    });
    $(".illustrations__nav__slider").each(function () {
      let $currentSlider = $(this);
      if ($currentSlider.children().length > 1) {
        $currentSlider.slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          asNavFor: ".illustrations__pic__slider",
          arrows: true,
          dots: false,
          centerMode: true,
          centerPadding: "0",
          focusOnSelect: true,
          vertical: true,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5,
                vertical: false,
                centerMode: false,
                arrows: false
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                vertical: false,
                centerMode: false,
                arrows: false
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 4,
                vertical: false,
                centerMode: false,
                arrows: false
              }
            },
            {
              breakpoint: 575,
              settings: "unslick"
            }
          ]
        });
      } else {
        this.style.height = "auto";
      }
    });
    $(".sliding-tabs .tabs__switches").each(function () {
      addTabNavSlider(this);
    });
  } else {
    console.log("no slick or not loaded");
  }
  function addTabNavSlider(elem) {
    const tabNavWidth = $(elem).width();
    let factWidth = 0;
    for (let i = 0; i < elem.children.length; i++) {
      factWidth += $(elem.children[i]).width();
      // console.log(i + " child");
      // console.log(factWidth);
    }
    // console.log(tabNavWidth + " max");
    if (factWidth > tabNavWidth) {
      $(elem).slick({
        arrows: false,
        dots: false,
        infinite: false,
        slidesToShow: 1,
        variableWidth: true,
        swipe: false
      });
      return true;
    } else {
      if (elem.classList.contains("slick-slider")) {
        $(elem).slick("unslick");
        elem.style.paddingLeft = "";
      }
      return false;
    }
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
  $.fancybox.defaults.parentEl = ".corp";
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
    // document.fonts doesn't work in ie11
    if (document.fonts) {
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
    } else {
      for (let i = 0; i < primaryNavs.length; i++) {
        let el = primaryNavs[i];
        handleNavOverflow(el, 48);
      }
      for (let i = 0; i < globalNavs.length; i++) {
        let el = globalNavs[i];
        handleNavOverflow(el, 32);
      }
    }
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
    // let reviewsSlider = e.target.closest(".slick-list");
    // if (reviewsSlider) {
    //   reviewsSlider.style.height = "auto";
    // }
  }
  if (reviewPictures.length) {
    handleReviewPicturesOverflow();
    attachReviewsImagesMore();
  }

  // $("form").submit(function (e) {
  //   $(this)
  //     .slideUp(function () {
  //       $(this).addClass("collapsing-form--handled");
  //     })
  //     .slideDown();

  //   e.preventDefault();
  // });

  // const add2carts = document.querySelectorAll(".js-add2cart");
  // if (add2carts.length) {
  //   add2carts.forEach((item) => {
  //     item.addEventListener("click", handleAdd2Cart);
  //   });
  // }

  // document.querySelectorAll(".qty").forEach((el) => {
  //   new qtyChanger(el).checkRange();
  // });

  document.querySelectorAll(".js-revealer").forEach((el) => {
    new revealer(el, ".reveal");
  });

  // tabs
  const tabTriggers = document.querySelectorAll(".sliding-tabs .tabs__switch");
  if (tabTriggers.length) {
    tabTriggers.forEach((item) => {
      item.addEventListener("click", handleSlidingTabClick);
    });
  }
  TabGroup.init(".tabs:not(.sliding-tabs)");

  // settings panel toggle
  document
    .querySelectorAll(".js-settings, .js-settings-close")
    .forEach((el) => {
      new overlayedRevealer(el, ".settings");
    });
  // settings__panel__section toggle
  document.querySelectorAll(".sps__toggle__input").forEach((el) => {
    new inputRevealer(el, ".reveal");
  });
  SettingsGroup.init(".settings__panel");
  // spectrum color picker
  $(".spectrum-picker").each(function () {
    const correspondingEl = document.querySelector(
      "[data-name='" + this.getAttribute("name") + "']"
    );
    const siteRoot = document.querySelector(".corp");
    $(this).spectrum({
      type: "flat",
      showPalette: false,
      showInput: true,
      showAlpha: false,
      allowEmpty: false,
      clickoutFiresChange: true,
      // appendTo: parentEl,
      containerClassName: "colors__picker",
      change: function (color) {
        correspondingEl.style.color = color.toHexString();
        let currentHsl = color.toHsl();
        this.setAttribute("value", color.toHslString());
        if (this.getAttribute("name") == "theme-color-1") {
          siteRoot.style.setProperty("--custom-color-1h", currentHsl.h);
          siteRoot.style.setProperty(
            "--custom-color-1s",
            currentHsl.s * 100 + "%"
          );
          siteRoot.style.setProperty(
            "--custom-color-1l",
            currentHsl.l * 100 + "%"
          );
        } else {
          siteRoot.style.setProperty("--custom-color-2h", currentHsl.h);
          siteRoot.style.setProperty(
            "--custom-color-2s",
            currentHsl.s * 100 + "%"
          );
          siteRoot.style.setProperty(
            "--custom-color-2l",
            currentHsl.l * 100 + "%"
          );
        }
      },
      dragstart: function (color) {
        correspondingEl.style.color = color.toHexString();
      },
      move: function (color) {
        correspondingEl.style.color = color.toHexString();
      }
    });
  });
  const spectrumCancels = document.getElementsByClassName("sp-cancel");
  for (let i = 0; i < spectrumCancels.length; i++) {
    spectrumCancels[i].addEventListener("click", resetSpectrumColor);
  }
  function resetSpectrumColor(e) {
    if (e.target.previousSibling) {
      e.target
        .closest(".sp-container")
        .previousSibling.dispatchEvent(new Event("change"));
    }
  }
  document.querySelectorAll(".js-init-spectrum").forEach((item) => {
    item.addEventListener("click", initSpectrum);
  });
  document.querySelectorAll("[name='site-theme']").forEach((item) => {
    item.addEventListener("change", (e) => {
      const siteThemeSet = e.target.getAttribute("value");
      const siteRoot = document.querySelector(".corp");
      switch (siteThemeSet) {
        case "set1":
          siteRoot.className = "corp site-theme-1";
          break;
        case "set2":
          siteRoot.className = "corp site-theme-2";
          break;
        case "set3":
          siteRoot.className = "corp site-theme-3";
          break;
        case "set4":
          siteRoot.className = "corp site-theme-4";
          break;
        case "set5":
          siteRoot.className = "corp site-theme-5";
          break;
        case "set6":
          siteRoot.className = "corp site-theme-6";
          break;
        default:
          siteRoot.className = "corp";
      }
      siteRoot.setAttribute("style", "");
    });
  });
  const settingsReset = document.querySelector(".js-settings-reset");
  if (settingsReset) {
    settingsReset.addEventListener("click", () => {
      const settingsForms = document
        .querySelectorAll(".settings form")
        .forEach((item) => {
          item.reset();
        });
      const siteRoot = document.querySelector(".corp");
      siteRoot.className = "corp";
      siteRoot.setAttribute("style", "");
      $("[name='theme-color-1']").spectrum("set", "hsl(29, 78%, 58%)");
      $("[name='theme-color-2']").spectrum("set", "hsl(150, 26%, 36%)");
      $(".spectrum-picker").trigger("change");
      document.querySelectorAll(".settings .opened").forEach((item) => {
        item.classList.remove("opened");
      });
    });
  }

  // functions on resize
  window.onresize = function (event) {
    delay(function () {
      delayedFunctions();
    }, 500);
  };

  var delayedFunctions = function () {
    windowWidth = window.innerWidth;

    let tabsSwitches = document.querySelectorAll(
      ".sliding-tabs .tabs__switches"
    );
    if (tabsSwitches) {
      for (let m = 0; m < tabsSwitches.length; m++) {
        addTabNavSlider(tabsSwitches[m]);
      }
    }

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
    }

    if (touchDevice || windowWidth < 1024) {
      attachExpands(expandToggles);
      closeMenuExpands();
    }
  };
});
