import {config} from "$lib/server/apps/provider/config.ts";
import {labels} from "$lib/server/apps/provider/labels.ts";
import type {App} from "$lib/models/app.ts";

export async function getApps(): Promise<App[]> {
  const results = await Promise.all([
    config.getApps(),
    labels.getApps()
  ]);

  return results.flat();
}
