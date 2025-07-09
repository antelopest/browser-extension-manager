import SvgLoaderComponent from './svg-loader/svg-loader.component.js';
import ChangeThemeComponent from './change-theme/change-theme-component.js';
import ExtensionComponent from './extension/extension.component.js';
import ExtensionsComponent from './extensions/extensions.component.js';
import FilterExtensionsComponent from './filter-extensions/filter-extensions.component.js';

customElements.define(SvgLoaderComponent.selector, SvgLoaderComponent);
customElements.define(ChangeThemeComponent.selector, ChangeThemeComponent);
customElements.define(ExtensionComponent.selector, ExtensionComponent);
customElements.define(ExtensionsComponent.selector, ExtensionsComponent);
customElements.define(
  FilterExtensionsComponent.selector,
  FilterExtensionsComponent
);
