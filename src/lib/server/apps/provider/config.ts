import type { App } from '$lib/models/app';
import { getFileApps } from '$lib/server/config/file-config';

export async function getApps(): Promise<App[]> {
    return getFileApps();
}
