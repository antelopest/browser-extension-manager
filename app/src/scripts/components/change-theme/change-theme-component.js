export default class ChangeThemeComponent extends HTMLElement {
  static selector = 'change-theme-component';

  #theme;

  set theme(theme) {
    this.#theme = theme;
  }

  get theme() {
    return this.#theme;
  }

  themes = {
    light: 'light',
    dark: 'dark'
  };

  icons = {
    light: './assets/images/icons/icon-moon.svg',
    dark: './assets/images/icons/icon-sun.svg'
  };

  connectedCallback() {
    this.render();
  }

  getIconSrc() {
    if (this.theme === this.themes.dark) {
      return this.icons.dark;
    }

    return this.icons.light;
  }

  toggleTheme() {
    this.#theme === this.themes.dark
      ? (this.#theme = this.themes.light)
      : (this.#theme = this.themes.dark);

    const htmlEl = document.querySelector('html');
    htmlEl.classList.remove(this.themes.light, this.themes.dark);
    htmlEl.classList.add(this.#theme);

    this.render();
  }

  render() {
    this.innerHTML = '';

    const src = this.getIconSrc();

    const buttonEl = document.createElement('button');

    buttonEl.classList.add('theme-toggle');
    buttonEl.innerHTML = `<svg-loader-component src="${src}"></svg-loader-component>`;
    buttonEl.addEventListener('click', this.toggleTheme.bind(this));

    this.appendChild(buttonEl);
  }

  init() {
    this.#theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? this.themes.dark
      : this.themes.light;

    const htmlEl = document.querySelector('html');
    htmlEl.classList.remove(this.themes.light, this.themes.dark);
    htmlEl.classList.add(this.#theme);
  }

  constructor() {
    super();

    this.init();
  }
}
