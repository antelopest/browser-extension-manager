import { API_CONFIG } from '../../config/config.js';

export default class DictionariesService {
  static nameService = 'DictionariesService';
  static url = API_CONFIG.dictionariesUrl;

  initCompleted;

  cache = new Map();

  getDictionaryByName(dictionaryName) {
    if (!this.cache.has(dictionaryName)) {
      throw new Error('Dictionary not found.');
    }

    return this.cache.get(dictionaryName);
  }

  async init() {
    const res = await fetch(DictionariesService.url);
    const dictionaries = await res.json();

    dictionaries.forEach((dictionary) => {
      this.cache.set(dictionary.name, dictionary.data);
    });
  }

  constructor() {
    this.initCompleted = this.init();
  }
}
