import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import rosetta from 'rosetta';
import { I18nProvider } from 'remix-rosetta-i18n';
import { getLocale } from './getLocale';

let r = rosetta();
let locale = getLocale(window.location.pathname);

hydrate(
    <I18nProvider i18n={r} locale={locale}>
        <RemixBrowser />
    </I18nProvider>,
    document
);
