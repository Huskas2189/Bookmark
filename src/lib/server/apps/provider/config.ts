import type { App } from '$lib/models/app';
import type { Group } from '$lib/models/group';
import { getFileApps, getFileGroups } from '$lib/server/config/file-config';

export async function getApps(): Promise<App[]> {
    return getFileApps();
}

export async function getGroups(): Promise<Group[]> {
    return getFileGroups();
}
