import { container } from '../../container/container.js';

export default class ExtensionComponent extends HTMLElement {
  static selector = 'extension-component';

  #extension;

  set extension(extension) {
    this.#extension = extension;
  }

  render() {
    const { src, title, description, active } = this.#extension;

    const articleEl = document.createElement('article');
    articleEl.classList.add('extension');

    articleEl.innerHTML = `
    <header class="extension__header">
      <div class="extension__image">
        <svg-loader-component src="${src}"></svg-loader-component>
      </div>
      <div class="extension__info">
        <h3 class="extension__title">${title}</h3>
        <p class="extension__description">${description}</p>
      </div>
    </header>
    <footer class="extension__footer">
      <button class="extension__button extension__button--remove">Remove</button>
        <div class="extension__button--toggle">
        <label class="switch" for="active">
          <input type="checkbox" name="active" ${active ? 'checked' : ''}>
          <span class="slider round"></span>
        </label>
    </div>
    </footer>
  `;

    const buttonRemoveEl = articleEl.querySelector('button');
    const sliderEl = articleEl.querySelector('.slider');

    // contenteditable="true"

    buttonRemoveEl.addEventListener('click', this.removeExtension.bind(this));
    sliderEl.addEventListener('click', this.toggleActive.bind(this));

    this.replaceChildren(articleEl);
  }

  async connectedCallback() {
    await this.extensionsService.initCompleted;

    this.render();
  }

  removeExtension() {
    this.extensionsService.deleteOne(this.#extension);
    this.remove();
  }

  toggleActive() {
    this.#extension.active = !this.#extension.active;
    this.extensionsService.updateOne(this.#extension);
  }

  constructor() {
    super();

    this.extensionsService = container.get('ExtensionsService');
  }
}
