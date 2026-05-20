import type {AppProvider} from "$lib/server/apps/app-provider.interface.ts";
import type {App} from "$lib/models/app.ts";
import {getDockerApps} from "$lib/server/docker-labels/docker-apps.ts";


export const labels: AppProvider = {
  async getApps(): Promise<App[]> {
    return await getDockerApps();
  }
}
