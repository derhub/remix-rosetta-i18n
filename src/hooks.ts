import { useContext } from 'react';
import { context } from './context';

export function useI18n() {
    let i18n = useContext(context);
    if (!i18n) {
        throw new Error('Unable to get instance of i18n');
    }

    return i18n;
}
