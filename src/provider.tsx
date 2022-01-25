import { createElement, ReactNode, useMemo, useState } from 'react';
import type { Rosetta } from 'rosetta';
import { context, createState, I8nContext } from './context';

interface I18nProviderProps<T> {
    children: ReactNode;
    locale: string;
    dict?: T;
    i18n: Rosetta<T>;
}

export function I18nProvider<T = any>({
    i18n,
    locale,
    dict,
    children,
}: I18nProviderProps<T>) {
    const [, setTick] = useState(0);
    const state: I8nContext<T> = useMemo(
        () =>
            createState({
                instance: i18n,
                locale,
                dict,
                onChange(lang) {
                    setTick((s) => s + 1);
                },
            }),
        [i18n, dict]
    );

    return createElement(context.Provider, {
        value: { ...state },
        children,
    });
}
