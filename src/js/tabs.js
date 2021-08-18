function handleTabClick(e) {
  e.preventDefault();
  let clickedTabLink = e.target.classList.contains("tabs__switch")
    ? e.target
    : e.target.closest(".tabs__switch");
  repositionSlick(clickedTabLink);
  changeActiveSlide(clickedTabLink);
}
function changeActiveSlide(clickedLink) {
  const tabsEl = clickedLink.closest(".tabs");
  const tabNavs = tabsEl.querySelectorAll(".tabs__switch");
  const tabPanels = tabsEl.querySelectorAll(".tabs__panel");
  const linkHash = clickedLink.getAttribute("href");
  let currentPanel = tabPanels[0];
  if (linkHash) {
    currentPanel = document.getElementById(linkHash.replace("#", ""));
  }
  tabNavs.forEach((item) => {
    item.classList.remove("tabs__switch--current");
  });
  clickedLink.classList.add("tabs__switch--current");
  tabPanels.forEach((item) => {
    item.classList.remove("tabs__panel--current");
  });
  if (currentPanel) {
    currentPanel.classList.add("tabs__panel--current");
  }
}
function repositionSlick(childEl) {
  const slickEl = childEl.closest(".slick-slider");
  if (slickEl) {
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
}
export { handleTabClick };
