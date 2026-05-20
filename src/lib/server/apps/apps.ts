import {getApps as configGetApps} from "$lib/server/apps/provider/config.ts";
import {getApps as labelsGetApps} from "$lib/server/apps/provider/labels.ts";
import type {App} from "$lib/models/app.ts";

export async function getApps(): Promise<App[]> {
  const results = await Promise.all([
    configGetApps(),
    labelsGetApps()
  ]);

  return results.flat();
}
