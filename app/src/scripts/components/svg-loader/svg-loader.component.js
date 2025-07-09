export default class SvgLoaderComponent extends HTMLElement {
  static selector = 'svg-loader-component';
  static classes = ['svg-loader'];

  stylization() {
    const classes = SvgLoaderComponent.classes.join(' ');
    this.classList.add(classes);
  }

  init() {
    const src = this.getAttribute('src');

    fetch(src)
      .then((res) => res.text())
      .then((svg) => (this.innerHTML = svg));
  }

  constructor() {
    super();

    this.stylization();

    this.init();
  }
}
