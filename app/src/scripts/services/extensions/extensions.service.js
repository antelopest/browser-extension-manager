import { API_CONFIG, DICTIONARIES } from '../../config/config.js';
import { container } from '../../container/container.js';

export default class ExtensionsService {
  static nameService = 'ExtensionsService';
  static extensionsUrl = API_CONFIG.extensionsUrl;
  static filterExtensionsUrl = API_CONFIG.filterExtensionsUrl;

  extensions = [];

  subscribers = [];

  initCompleted;

  getAllByFilter() {
    return this.extensions.filter((e) => {
      const hasActive = () => {
        const { active } = this.filter;

        // after
        if (active === 'active') {
          return e.active === true;
        }

        if (active === 'inactive') {
          return e.active === false;
        }

        return true;
      };

      return hasActive();
    });
  }

  getFilter() {
    return this.filter;
  }

  setFilter(filter) {
    this.filter = filter;

    this.notify();
  }

  notify() {
    this.subscribers.forEach((subscriber) => subscriber());
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);

    return () => {
      this.unsubscribe(subscriber);
    };
  }

  unsubscribe(subscriber) {
    console.log('unsubscribe');
    const findIndex = this.subscribers.findIndex((sub) => sub === subscriber);
    if (findIndex > -1) {
      this.subscribers.splice(findIndex, 1);
    }
    console.log(this.subscribers);
  }

  updateOne(extension) {
    const { id } = extension;

    const index = this.extensions.findIndex((extension) => extension.id === id);

    if (index === -1) throw new Error('Extension not found');

    this.extensions[index] = extension;

    this.notify();
  }

  deleteOne(extension) {
    const { id } = extension;

    const index = this.extensions.findIndex((extension) => extension.id === id);

    if (index === -1) throw new Error('Extension not found');

    this.extensions.splice(index, 1);

    // this.notify();
  }

  async init() {
    this.dictionariesService = container.get('DictionariesService');

    const initExtensions = async () => {
      const res = await fetch(ExtensionsService.extensionsUrl);
      this.extensions = await res.json();
    };

    const initDictionaries = async () => {
      await this.dictionariesService.initCompleted;
    };

    const initFilter = async () => {
      const res = await fetch(ExtensionsService.filterExtensionsUrl);
      this.filter = await res.json();
    };

    await initExtensions();
    await initDictionaries();
    await initFilter();
  }

  constructor() {
    this.initCompleted = this.init();
  }
}
