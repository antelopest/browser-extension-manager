import { container } from '../container/container.js';

import DictionariesService from './dictionaries/dictionaries.service.js';
import ExtensionsService from './extensions/extensions.service.js';

container.register(DictionariesService.nameService, DictionariesService, true);
container.register(ExtensionsService.nameService, ExtensionsService, true);
