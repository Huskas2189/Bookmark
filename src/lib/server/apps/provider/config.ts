import type {AppProvider} from "$lib/server/apps/app-provider.interface.ts";
import type {App} from "$lib/models/app.ts";
import {fileApps} from "$lib/server/config/file-config.ts";

export const config: AppProvider = {
  async getApps(): Promise<App[]> {
    return fileApps;
  }
}
