import rosetta, { Rosetta } from 'rosetta';

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

    instance?: Rosetta<T>;
    onChange?: () => void;
};

export function createI18n<T = any>(options: I8nOptions<T> = {}): I8nContext<T> {
    let i18n = options.instance ?? rosetta<T>();

    if (options.locale && options.dict) {
        i18n.set(options.locale, options.dict);
    }

    if (options.locale) {
        i18n.locale(options.locale);
    }

    return {
        set: i18n.set,
        t: i18n.t,
        table: i18n.table,
        locale(lang?: string): string {
            if (lang === undefined) {
                return i18n.locale();
            }
            let l = i18n.locale(lang);
            options?.onChange?.();
            return l;
        },
    };
}
