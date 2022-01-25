import type { Rosetta } from 'rosetta';
import { createContext } from 'react';

export interface I8nContext<T = any> extends Rosetta<T> {}

export type I8nOptions<T> = {
    /**
     * active language
     */
    locale?: string;
    /**
     * locale resources
     */
    dict?: T;

    instance: Rosetta<T>;
    onChange?: (local: string) => void;
};

export const context = createContext<I8nContext | null>(null);

export const createState = <T = any>(options: I8nOptions<T>): I8nContext<T> => {
    let i18n = options.instance;

    if (options.locale && options.dict) {
        i18n.set(options.locale, options.dict);
    }

    if (options.locale !== i18n.locale()) {
        i18n.locale(options.locale);
    }

    return {
        set: i18n.set,
        t: i18n.t,
        table: i18n.table,
        locale: (lang?: string): string => {
            if (lang === undefined) {
                return i18n.locale();
            }

            let current = i18n.locale();
            if (current !== lang) {
                let l = i18n.locale(lang);
                options.onChange?.(lang);
                return l;
            }

            return current;
        },
    };
};
