import { createElement, FC } from 'react';
import { hydrate, Props } from './clientHydrate'

export const App: FC<Props> = ({ page }: Props) => {
  return createElement(page?.component, page?.props);
};

if (!import.meta.env.SSR) hydrate(App);