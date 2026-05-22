import type { App } from '$lib/models/app';
import { getDockerApps } from '$lib/server/docker-labels/docker-apps';

export async function getApps(): Promise<App[]> {
    return await getDockerApps();
}
