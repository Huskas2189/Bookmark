import {
    getApps as configGetApps,
    getGroups as configGetGroups
} from '$lib/server/apps/provider/config';
import { getApps as labelsGetApps } from '$lib/server/apps/provider/labels';
import type { App } from '$lib/models/app';
import type { Group } from '$lib/models/group';

export async function getApps(): Promise<App[]> {
    const results = await Promise.all([configGetApps(), labelsGetApps()]);

    return results.flat();
}

export async function getGroups(): Promise<Group[]> {
    return configGetGroups();
}
