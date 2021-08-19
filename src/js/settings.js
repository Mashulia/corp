// settings tabs
class TabGroup {
  constructor(element) {
    this.tabs = this.createTabs(element);
  }
  createTabs(list) {
    const tabElements = [...list.querySelectorAll(".settings__label__link")];

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
    this.panel = document.querySelector(element.getAttribute("href"));
    this.beforeActivate = beforeActivate;
    this.handleClick();
  }
  handleClick() {
    this.link.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.isActive()) {
        this.deactivate();
      } else {
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
  }
  deactivate() {
    this.link.classList.remove("current");
    this.panel.classList.remove("current");
  }
}

export { TabGroup };
