import { getApps as configGetApps } from '$lib/server/apps/provider/config';
import { getApps as labelsGetApps } from '$lib/server/apps/provider/labels';
import type { App } from '$lib/models/app';

export async function getApps(): Promise<App[]> {
    const results = await Promise.all([configGetApps(), labelsGetApps()]);

    return results.flat();
}
