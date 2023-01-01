import { NextPage } from 'next';
import { ReactNode } from 'react';

type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export const fallbackLng = 'ja';
export const defaultNS = 'translation';
export const languages = [fallbackLng, 'en'] as const;

export type Lng = typeof languages[number];
export type i18nProps = { params: { lng: Lng } };
export type i18nRoot = React.FC<i18nProps & { children?: ReactNode }>;
export type i18nPage<P = {}> = NextPage<
  Override<{ params: Record<string, string> } & i18nProps, P>
>;

export interface Options {
  supportedLngs?: typeof languages;
  fallbackLng?: string;
  lng?: string;
  fallbackNS?: string;
  defaultNS?: string;
  ns?: string | string[];
  keyPrefix?: string;
}

export const getOptions = (
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
): Options => {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
};
