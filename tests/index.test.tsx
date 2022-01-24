import { render, waitFor } from '@testing-library/react';
import React, { useEffect } from 'react';

import { I18nProvider, useI18n } from '../src';
import rosetta from 'rosetta';

it('renders translated text', () => {
    let resources = { test: 'this is test!!' };

    function Child() {
        const { t } = useI18n();
        return <p>{t('test')}</p>;
    }

    function Root() {
        return (
            <I18nProvider dict={resources} locale="en">
                <Child />
            </I18nProvider>
        );
    }

    const { getByText } = render(<Root />);
    expect(getByText(resources.test)).toBeInTheDocument();
});

it('accept rosetta instance', () => {
    let dict = { test: 'this is test' };

    let i18n = rosetta({
        en: dict,
    });

    function Child() {
        const { t } = useI18n();
        return <p>{t('test')}</p>;
    }

    function Root() {
        return (
            <I18nProvider i18n={i18n} locale="en">
                <Child />
            </I18nProvider>
        );
    }

    const { getByText } = render(<Root />);
    expect(getByText(dict.test)).toBeInTheDocument();
});

it('should change language', async () => {
    let dict = {
        en: { test: 'this is it' },
        tl: { test: 'Heto na' },
    };

    let i18n = rosetta(dict);

    function Child() {
        const { t, locale } = useI18n();
        useEffect(() => {
            locale('tl');
        }, []);

        return <p>{t('test')}</p>;
    }

    function Root() {
        return (
            <I18nProvider i18n={i18n} locale="en">
                <Child />
            </I18nProvider>
        );
    }

    const { getByText } = render(<Root />);

    await waitFor(() => {
        expect(i18n.locale()).toEqual('tl');
        expect(getByText(dict.tl.test)).toBeInTheDocument();
    });
});
