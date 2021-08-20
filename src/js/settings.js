class SettingsGroup {
  constructor(element) {
    this.settings = this.createSetSections(element);
  }
  createSetSections(list) {
    const settingsPanelSections = [
      ...list.querySelectorAll(".settings__panel__section")
    ];

    return settingsPanelSections.map(
      (el) =>
        new SettingsSection(el, {
          beforeActivate: this.deactivateAll.bind(this)
        })
    );
  }
  deactivateAll() {
    this.settings.forEach((setSection) => setSection.deactivate());
  }

  static init(selector) {
    document.querySelectorAll(selector).forEach((el) => new SettingsGroup(el));
  }
}
class SettingsSection {
  constructor(element, { beforeActivate }) {
    this.setSection = element;
    this.beforeActivate = beforeActivate;
    this.handleClick();
  }
  handleClick() {
    this.setSection.addEventListener("click", () => {
      if (!this.isActive()) {
        this.activate();
      }
    });
  }
  isActive() {
    return this.setSection.classList.contains("active");
  }
  activate() {
    if (typeof this.beforeActivate === "function") {
      this.beforeActivate();
    }
    this.setSection.classList.add("active");
  }
  deactivate() {
    this.setSection.classList.remove("active");
  }
}
export { SettingsGroup };
