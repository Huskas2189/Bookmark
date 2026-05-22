import type {App} from "$lib/models/app.ts";
import {
  BOOKMARK_APP_ICON,
  BOOKMARK_APP_ID,
  BOOKMARK_APP_NAME, BOOKMARK_APP_ROLES, BOOKMARK_APP_URL,
  BOOKMARK_ENABLED
} from "$lib/server/docker-labels/labels-keys.ts";
import {DockerContainer, getContainers} from "$lib/server/docker-labels/docker.ts";

export async function getDockerApps(): Promise<App[]> {

  const apps: App[] = [];
  try {
    const containers = await getContainers();
    await Promise.all(
      containers.map(async (container) => {
        if (container.Labels.hasOwnProperty(BOOKMARK_ENABLED)
          && container.Labels[BOOKMARK_ENABLED] === 'true'
        ) {
          try {
            checkRequiredLabels(container);
            apps.push({
              id: container.Labels[BOOKMARK_APP_ID],
              name: container.Labels[BOOKMARK_APP_NAME],
              roles: (container.Labels[BOOKMARK_APP_ROLES] ?? "")
                .split(',')
                .map(label => label.trim())
                .filter(Boolean),
              url: container.Labels[BOOKMARK_APP_URL],
              icon: container.Labels[BOOKMARK_APP_ICON] ?? null
            });

          } catch (e) {
            console.log(e.message);
          }
        }
      })
    );

    return apps;
  } catch (e) {
    console.log(`Docker label is disabled.`);
    return [];
  }

}

function checkRequiredLabels(container: DockerContainer) {
  [
    BOOKMARK_APP_ID,
    BOOKMARK_APP_NAME,
    BOOKMARK_APP_ROLES,
    BOOKMARK_APP_URL
  ].forEach((label) => {
    if (!container.Labels.hasOwnProperty(label)) {
      throw new Error(`Missing ${label} label for ${container.Names[0]}`)
    }
  })
}
