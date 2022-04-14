import { createElement } from "react";
import { hydrate } from '@yext/yext-sites-scripts';

const App = ({ page }) => {
  return createElement(page?.component, page?.props);
};

hydrate(App);
