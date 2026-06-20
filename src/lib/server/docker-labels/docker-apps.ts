import type { App, Target } from '$lib/models/app';
import {
    BOOKMARK_APP_GROUP,
    BOOKMARK_APP_ICON,
    BOOKMARK_APP_NAME,
    BOOKMARK_APP_ROLES,
    BOOKMARK_APP_TARGET,
    BOOKMARK_APP_URL,
    BOOKMARK_APP,
    BOOKMARK_ENABLE
} from '$lib/server/docker-labels/labels-keys';
import { getContainers } from '$lib/server/docker-labels/docker';

export async function getDockerApps(): Promise<App[]> {
    const apps: App[] = [];
    try {
        const containers = await getContainers();
        await Promise.all(
            containers.map(async (container) => {
                if (
                    Object.prototype.hasOwnProperty.call(container.Labels, BOOKMARK_ENABLE) &&
                    container.Labels[BOOKMARK_ENABLE] === 'true'
                ) {
                    try {
                        const ids = [
                            ...new Set(
                                Object.keys(container.Labels)
                                    .filter((key) => key.startsWith(BOOKMARK_APP))
                                    .map((key) => {
                                        return key.replace(`${BOOKMARK_APP}.`, '').split('.')[0];
                                    })
                            )
                        ];
                        ids.forEach((id) => {
                            const appLabels = Object.keys(container.Labels)
                                .filter((key) => key.startsWith(`${BOOKMARK_APP}.${id}`))
                                .map((key) => key.replace(`${BOOKMARK_APP}.${id}.`, ''));

                            checkRequiredLabels(id, appLabels);
                            apps.push({
                                id: id,
                                name: container.Labels[
                                    `${BOOKMARK_APP}.${id}.${BOOKMARK_APP_NAME}`
                                ],
                                roles: (
                                    container.Labels[
                                        `${BOOKMARK_APP}.${id}.${BOOKMARK_APP_ROLES}`
                                    ] ?? ''
                                )
                                    .split(',')
                                    .map((label) => label.trim())
                                    .filter(Boolean),
                                url: container.Labels[`${BOOKMARK_APP}.${id}.${BOOKMARK_APP_URL}`],
                                icon:
                                    container.Labels[
                                        `${BOOKMARK_APP}.${id}.${BOOKMARK_APP_ICON}`
                                    ] ?? null,
                                target:
                                    (container.Labels[
                                        `${BOOKMARK_APP}.${id}.${BOOKMARK_APP_TARGET}`
                                    ] as Target) ?? '_self',
                                group:
                                    container.Labels[
                                        `${BOOKMARK_APP}.${id}.${BOOKMARK_APP_GROUP}`
                                    ] ?? null
                            });
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

function checkRequiredLabels(id: string, labels: string[]): void {
    [BOOKMARK_APP_NAME, BOOKMARK_APP_ROLES, BOOKMARK_APP_URL].forEach((label) => {
        if (typeof labels.find((l) => l === label) === 'undefined') {
            throw new Error(`Missing required ${label} label for ${id} app`);
        }
    });
}
