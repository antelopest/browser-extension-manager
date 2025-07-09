import { container } from '../../container/container.js';
import { DICTIONARIES } from '../../config/config.js';

export default class FilterExtensionsComponent extends HTMLElement {
  static selector = 'filter-extensions-component';
  static classes = ['filter'];

  elements = {
    active: []
  };

  async connectedCallback() {
    await this.dictionariesService.initCompleted;
    await this.extensionsService.initCompleted;

    this.render();
  }

  render() {
    const titleElement = document.createElement('h3');
    titleElement.classList.add('filter__title');
    titleElement.innerText = 'Extensions List';

    this.appendChild(titleElement);

    const actionsElement = document.createElement('div');
    actionsElement.classList.add('filter__actions');

    const dictFilterActive = this.dictionariesService.getDictionaryByName(
      DICTIONARIES.DictionaryFilterActive
    );

    const filter = this.extensionsService.getFilter();

    dictFilterActive.forEach((dictionary, index) => {
      const button = document.createElement('button');

      button.classList.add('filter__button');

      const { code } = dictionary;
      if (filter.active === code) button.classList.add('active');
      button.setAttribute('data-code', code);

      const { name } = dictionary;
      button.innerText = name;

      button.addEventListener('click', (e) => {
        const code = e.target.dataset.code;

        const toggleClass = () => {
          this.elements.active.forEach((el) => {
            el.classList.remove('active');

            if (code === el.dataset.code) {
              el.classList.add('active');
            }
          });
        };

        toggleClass();

        const changeFilter = () => {
          const filter = this.extensionsService.getFilter();
          filter.active = code;

          this.extensionsService.setFilter(filter);
        };

        changeFilter();
      });

      this.elements.active.push(button);
      actionsElement.appendChild(button);
    });

    this.appendChild(actionsElement);
  }

  addClasses() {
    const classes = FilterExtensionsComponent.classes.join(' ');
    this.classList.add(classes);
  }

  constructor() {
    super();

    this.dictionariesService = container.get('DictionariesService');
    this.extensionsService = container.get('ExtensionsService');

    this.addClasses();
  }
}
