import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import { I18nProvider } from 'remix-rosetta-i18n';
import rosetta from 'rosetta';
import { getLocale } from './getLocale';

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    let r = rosetta();
    let locale = getLocale(new URL(request.url).pathname);
    console.log(locale);
    const markup = renderToString(
        <I18nProvider i18n={r} locale={locale}>
            <RemixServer context={remixContext} url={request.url} />
        </I18nProvider>
    );

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
