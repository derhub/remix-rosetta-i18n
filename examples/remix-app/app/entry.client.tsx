import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import rosetta from 'rosetta';
import { I18nProvider } from 'remix-rosetta-i18';

let r = rosetta();
hydrate(
    <I18nProvider i18n={r} locale="en">
        <RemixBrowser />
    </I18nProvider>,
    document
);
