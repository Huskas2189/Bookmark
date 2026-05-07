import { getTitle } from '$lib/server/config.ts';
import type { LayoutServerData } from './$types';

export const load: LayoutServerData = () => {
    return {
        title: getTitle()
    };
};
