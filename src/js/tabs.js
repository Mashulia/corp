function handleTabClick(e) {
  e.preventDefault();
  repositionSlick(e.target);
  changeActiveSlide(e.target);
}
function changeActiveSlide(clickedLink) {
  const tabsEl = clickedLink.closest(".tabs");
  const tabNavs = tabsEl.querySelectorAll(".tab__nav__link");
  const tabPanels = tabsEl.querySelectorAll(".tab__panel");
  let currentPanel = document.getElementById(
    clickedLink.getAttribute("href").replace("#", "")
  );
  tabNavs.forEach((item) => {
    item.classList.remove("tab__nav__link--current");
  });
  clickedLink.classList.add("tab__nav__link--current");
  tabPanels.forEach((item) => {
    item.classList.remove("tab__panel--opened");
  });
  if (currentPanel) {
    currentPanel.classList.add("tab__panel--opened");
  }
}
function repositionSlick(childEl) {
  const slickEl = childEl.closest(".slick-slider");
  const $slickSlider = $(slickEl).slick("getSlick");
  const clickedSlide = childEl.closest(".slick-slide");
  const slides = slickEl.querySelectorAll(".slick-slide:not(.slick-cloned)");
  for (let i = 0; i < slides.length; i++) {
    if (slides[i] == clickedSlide) {
      if (i != 0) {
        slickEl.style.paddingLeft = "3rem";
      } else {
        slickEl.style.paddingLeft = "0";
      }
      $slickSlider.slickGoTo(i);
      break;
    }
  }
}
export { handleTabClick };
