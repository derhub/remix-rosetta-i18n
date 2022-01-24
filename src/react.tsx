import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import type { I8nContext } from './i18n-rosetta';
import { createI18n } from './i18n-rosetta';
import { Rosetta } from 'rosetta';

export const i8nContext = createContext<I8nContext | null>(null);

export function useI18n() {
    let i18n = useContext(i8nContext);
    if (!i18n) {
        throw new Error('Unable to get instance of i18n');
    }

    return i18n;
}

interface I18nProviderProps<T> {
    children: ReactNode;
    locale: string;
    dict?: T;
    i18n?: Rosetta<T>;
}

export function I18nProvider<T = any>({
    children,
    i18n,
    locale,
    dict,
}: I18nProviderProps<T>) {
    const [, setTick] = useState(0);

    const contextValue: I8nContext<T> = useMemo(() => {
        return createI18n({
            locale,
            dict,
            instance: i18n,
            onChange: () => {
                setTick((tick) => tick + 1);
            },
        });
    }, [i18n]);

    return (
        <i8nContext.Provider value={{ ...contextValue }}>
            {children}
        </i8nContext.Provider>
    );
}
