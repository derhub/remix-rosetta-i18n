import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import type { EntryContext } from 'remix';
import { I18nProvider } from 'remix-rosetta-i18';
import rosetta from 'rosetta';

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    let r = rosetta();
    const markup = renderToString(
        <I18nProvider i18n={r} locale="en">
            <RemixServer context={remixContext} url={request.url} />
        </I18nProvider>
    );

    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup, {
        status: responseStatusCode,
        headers: responseHeaders,
    });
}
