import type {App} from "$lib/models/app.ts";
import Docker from 'dockerode';
import {
  BOOKMARK_APP_ICON,
  BOOKMARK_APP_ID,
  BOOKMARK_APP_NAME, BOOKMARK_APP_ROLES, BOOKMARK_APP_URL,
  BOOKMARK_ENABLED
} from "$lib/server/docker-labels/labels-keys.ts";


const docker: Docker|null = await createDockerClient();

export async function getDockerApps(): Promise<App[]> {

  if (!docker) {
    return [];
  }

  const apps: App[] = [];

  (await docker.listContainers()).forEach(function (container) {
    if (container.Labels.hasOwnProperty(BOOKMARK_ENABLED)
      && container.Labels[BOOKMARK_ENABLED] === 'true'
    ) {
      try {
        checkMandatoryLabels(container);
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
  });

  return apps;
}

function checkMandatoryLabels(container) {
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

/**
 * // Force lazy docker to build and check if available.
 */
async function createDockerClient(): Promise<Docker | null> {
  try {
    const docker = new Docker({
      socketPath: '/var/run/docker.sock'
    });

    // Trying if docker exists here
    await docker.ping();
    return docker;

  } catch (e) {
    console.log('Docker labels disabled');
    return null;
  }
}
