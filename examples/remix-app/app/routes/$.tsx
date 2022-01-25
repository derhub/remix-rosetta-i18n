import {
    json,
    Link,
    LoaderFunction,
    PrefetchPageLinks,
    useLoaderData,
    useMatches,
} from 'remix';
import { context, useI18n } from 'remix-rosetta-i18n';
import { useEffect, useLayoutEffect } from 'react';
import { getLocale } from '~/getLocale';

const resources = {
    en: {
        hello: 'Hello world!',
    },
    tl: {
        hello: 'Kumusta mundo!',
    },
    da: {
        hello: 'Hej Verden!',
    },
};

export const loader: LoaderFunction = (args) => {
    let uri = new URL(args.request.url);
    let language = getLocale(uri.pathname) as keyof typeof resources;

    return json({
        __lang: {
            locale: language,
            dict: resources[language],
        },
    });
};

export default function Index() {
    const trans = useI18n();
    const match: any = useMatches().find(
        (match) => match.data?.__lang !== undefined
    );
    let data = match?.data?.__lang;

    if (data) {
        trans.set(data.locale, data.dict);
    }

    useEffect(() => {
        if (data) {
            trans.set(data.locale, data.dict);
            trans.locale(data.locale);
        }
    }, [data]);

    return (
        <div
            style={{
                fontFamily: 'system-ui, sans-serif',
                lineHeight: '1.4',
                maxWidth: '600px',
                margin: '0 auto',
            }}
        >
            <h1>{trans.t('hello')}</h1>

            <br />
            <ul>
                <li>
                    <Link to={'/en'}>home</Link>
                </li>
                <li>
                    <Link to={'/tl'}>tagalog</Link>
                </li>
                <li>
                    <Link to={'/en'}>english</Link>
                </li>
                <li>
                    <Link to={'/da'}>danish</Link>
                </li>
            </ul>
        </div>
    );
}
