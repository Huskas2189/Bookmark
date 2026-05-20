import type {AppProvider} from "$lib/server/apps/app-provider.interface.ts";
import type {App} from "$lib/models/app.ts";
import {getFileApps} from "$lib/server/config/file-config.ts";

export
  async function getApps(): Promise<App[]> {
    return getFileApps();
  }
