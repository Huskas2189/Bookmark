import { derived, readable, writable } from 'svelte/store';
import { browser } from '$app/env';

export type Theme = 'light' | 'dark' | 'system';

// Gettings current mode from browser
const systemPrefersDark = readable(false, (set) => {
    if (!browser) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
        set('matches' in e ? e.matches : (e as MediaQueryList).matches);
    set(mql.matches);
    // Compatibilité anciens navigateurs
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
});

export const theme = writable<Theme>('system');

export const applicableTheme = derived(
    [theme, systemPrefersDark],
    ([$theme, prefersDark]): Theme =>
        $theme === 'system' ? (prefersDark ? 'dark' : 'light') : $theme
);
