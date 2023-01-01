import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { fallbackLng, languages } from '@/lib/i18n';

acceptLanguage.languages(['ja', 'en']);

export const config = {
  matcher: '/:lng*',
};

const cookieName = 'i18next';
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest, res: NextResponse) {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  const { pathname, search } = req.nextUrl;

  const shouldHandle =
    !PUBLIC_FILE.test(pathname) &&
    !pathname.includes('/api/') &&
    !pathname.startsWith(`/${lng}`) &&
    pathname === '/';

  if (shouldHandle) {
    return NextResponse.redirect(
      new URL(`/${lng}${pathname}${search}`, req.url),
    );
  }
  const refererHeader = req.headers.get('referer');

  if (refererHeader) {
    const refererUrl = new URL(refererHeader);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
