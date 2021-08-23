class TabGroup {
  constructor(element) {
    this.tabs = this.createTabs(element);
  }
  createTabs(list) {
    const tabElements = [...list.children[0].querySelectorAll(".tabs__switch")];

    return tabElements.map(
      (el) =>
        new Tab(el, {
          beforeActivate: this.deactivateAll.bind(this)
        })
    );
  }
  deactivateAll() {
    this.tabs.forEach((tab) => tab.deactivate());
  }

  static init(selector) {
    document.querySelectorAll(selector).forEach((el) => new TabGroup(el));
  }
}
class Tab {
  constructor(element, { beforeActivate }) {
    this.link = element;
    this.panel =
      document.querySelector(element.getAttribute("href")) ||
      this.link.closest(".tabs").children[1].children[0];
    this.beforeActivate = beforeActivate;
    this.handleClick();
  }
  handleClick() {
    this.link.addEventListener("click", (e) => {
      e.preventDefault();
      if (!this.isActive()) {
        this.activate();
      }
    });
  }
  isActive() {
    return this.link.classList.contains("current");
  }
  activate() {
    if (typeof this.beforeActivate === "function") {
      this.beforeActivate();
    }
    this.link.classList.add("current");
    this.panel.classList.add("current");
    this.panel
      .querySelectorAll(".spectrum-picker")
      .forEach((item) => $(item).spectrum("reflow"));
  }
  deactivate() {
    this.link.classList.remove("current");
    this.panel.classList.remove("current");
  }
}

function handleSlidingTabClick(e) {
  e.preventDefault();
  let clickedTabLink = e.target.classList.contains("tabs__switch")
    ? e.target
    : e.target.closest(".tabs__switch");
  repositionSlick(clickedTabLink);
  changeActivePanel(clickedTabLink);
}
function changeActivePanel(clickedLink) {
  const tabsEl = clickedLink.closest(".tabs");
  const tabNavs = tabsEl.querySelectorAll(".tabs__switch");
  const tabPanels = tabsEl.querySelectorAll(".tabs__panel");
  const linkHash = clickedLink.getAttribute("href");
  let currentPanel = tabPanels[0];
  if (linkHash) {
    currentPanel = document.getElementById(linkHash.replace("#", ""));
  }
  tabNavs.forEach((item) => {
    item.classList.remove("current");
  });
  clickedLink.classList.add("current");
  tabPanels.forEach((item) => {
    item.classList.remove("current");
  });
  currentPanel.classList.add("current");
  currentPanel
    .querySelectorAll(".spectrum-picker")
    .forEach((item) => $(item).spectrum("reflow"));
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
export { handleSlidingTabClick, TabGroup };
