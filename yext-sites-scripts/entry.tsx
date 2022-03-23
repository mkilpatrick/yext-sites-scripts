import ReactDOM from "react-dom";
import { Page } from "./ssr/types";
import { createElement, useState } from "react";
import { ReactSitesContext, routes } from "./context";

type Props = {
  page?: Page;
};

export const App = ({ page }: Props) => {
  let [activePage, setActivePage] = useState(page);

  return (
    <ReactSitesContext.Provider value={{ activePage, setActivePage }}>
      {createElement(activePage?.component, activePage?.props)}
    </ReactSitesContext.Provider>
  );
};

const hydrate = async () => {
  /**
   * Get the templateFilename from the template. See {@link ./ssr/serverRenderRoute.ts}.
   */
  const templateFilename = (window as any)._RSS_TEMPLATE_?.split('.')[0];

  const {default: component} = await routes.find(
    (route) => route.name === templateFilename
  )?.getComponent() || {};

  ReactDOM.hydrate(
    <App
      page={{
        props: (window as any)._RSS_PROPS_,
        path: window.location.pathname,
        component: component,
      }}
    />,
    document.getElementById("root")
  );
};

//@ts-ignore
if (!import.meta.env.SSR) hydrate();