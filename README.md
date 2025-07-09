# Browser extension manager UI #

## Idea

The idea, design, assets (fonts, images, icons) for the **Browser extension manager UI** project are taken
from [FrontendMentor.io](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp).

## Tech stack

- **Bundler:** Webpack
- **CSS Preprocessor:** SCSS
- **JavaScript:** ES Module
    - **Components:** Web Components (Custom Elements)
      - SVG loader
      - Extension card
      - Extension list
      - Exntesion filter
      - Change theme button
  - DI Container
      - Services:
          - Extensions
          - Dictionaries   
- **Responsive design:** Support both desktop and mobile
- **Themes support:** Light & Dark modes via `prefers-color-scheme` media query
