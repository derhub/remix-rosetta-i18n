import { json, LoaderFunction, useLoaderData } from 'remix';
import { context, useI18n } from 'remix-rosetta-i18';
import { useEffect } from 'react';

const resources = {
    en: {
        hello: 'Hello world!',
    },
    tl: {
        hello: 'kumusta mundo!',
    },
};

export const loader: LoaderFunction = (args) => {
    let uri = new URL(args.request.url);
    let language: keyof typeof resources = 'en';

    // simple detection of current language by pathname
    if (uri.pathname.startsWith('/en')) {
        language = 'en';
    }

    if (uri.pathname.startsWith('/tl')) {
        language = 'tl';
    }

    return json({ language, dict: resources[language] });
};

export default function Index() {
    const trans = useI18n();
    const data = useLoaderData();

    useEffect(() => {
        trans.set(data.language, data.dict);
        trans.locale(data.language);
    }, [data]);

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <h1>hello</h1>
        </div>
    );
}
