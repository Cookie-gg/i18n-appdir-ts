'use client';

import i18next from 'i18next';
import { getOptions, Options } from '@/lib/i18n';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`),
    ),
  )
  .init(getOptions());

export const useTranslation = (
  lng: string,
  ns?: string | string[],
  options: Options = {},
) => {
  if (i18next.resolvedLanguage !== lng) i18next.changeLanguage(lng);
  return useTranslationOrg(ns, options);
};
