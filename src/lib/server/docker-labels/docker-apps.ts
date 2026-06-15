import type { App, Target } from '$lib/models/app';
import {
    BOOKMARK_APP_GROUP,
    BOOKMARK_APP_ICON,
    BOOKMARK_APP_ID,
    BOOKMARK_APP_NAME,
    BOOKMARK_APP_ROLES,
    BOOKMARK_APP_TARGET,
    BOOKMARK_APP_URL,
    BOOKMARK_ENABLED
} from '$lib/server/docker-labels/labels-keys';
import { getContainers } from '$lib/server/docker-labels/docker';
import type { DockerContainer } from '$lib/server/docker-labels/docker';

export async function getDockerApps(): Promise<App[]> {
    const apps: App[] = [];
    try {
        const containers = await getContainers();
        await Promise.all(
            containers.map(async (container) => {
                if (
                    Object.prototype.hasOwnProperty.call(container.Labels, BOOKMARK_ENABLED) &&
                    container.Labels[BOOKMARK_ENABLED] === 'true'
                ) {
                    try {
                        checkRequiredLabels(container);
                        apps.push({
                            id: container.Labels[BOOKMARK_APP_ID],
                            name: container.Labels[BOOKMARK_APP_NAME],
                            roles: (container.Labels[BOOKMARK_APP_ROLES] ?? '')
                                .split(',')
                                .map((label) => label.trim())
                                .filter(Boolean),
                            url: container.Labels[BOOKMARK_APP_URL],
                            icon: container.Labels[BOOKMARK_APP_ICON] ?? null,
                            target: (container.Labels[BOOKMARK_APP_TARGET] as Target) ?? '_self',
                            group: container.Labels[BOOKMARK_APP_GROUP] ?? null
                        });
                    } catch (e: unknown) {
                        if (e instanceof Error) {
                            console.log(e.message);
                        }
                    }
                }
            })
        );

        return apps;
    } catch {
        console.log(`Docker label is disabled.`);
        return [];
    }
}

function checkRequiredLabels(container: DockerContainer) {
    [BOOKMARK_APP_ID, BOOKMARK_APP_NAME, BOOKMARK_APP_ROLES, BOOKMARK_APP_URL].forEach((label) => {
        if (!Object.prototype.hasOwnProperty.call(container.Labels, label)) {
            throw new Error(`Missing ${label} label for ${container.Names[0]}`);
        }
    });
}
