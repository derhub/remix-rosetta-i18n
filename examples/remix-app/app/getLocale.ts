export function getLocale(pathname: string): string {
    let localeInPathname = pathname.slice(0, 4).replace(/\/+$/, '');
    if (localeInPathname === '/en') {
        return 'en';
    }

    if (localeInPathname === '/tl') {
        return 'tl';
    }

    if (localeInPathname === '/da') {
        return 'da';
    }

    return 'en';
}
