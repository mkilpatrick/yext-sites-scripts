import { createElement, FC } from 'react';
import { hydrate, Props } from './clientHydrate'
import { I18nextProvider } from 'react-i18next';

export const App: FC<Props> = ({ page, i18n }: Props) => {
  return (
    <I18nextProvider i18n={i18n}>
      {createElement(page?.component, page?.props)}
    </I18nextProvider>
  )
}

if (!import.meta.env.SSR) hydrate(App);