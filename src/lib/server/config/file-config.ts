import { env } from '$env/dynamic/private';
import fs from 'node:fs';
import yaml from 'js-yaml';
import type {BookmarkConfig} from "$lib/models/bookmark-config.ts";
import type {App} from "$lib/models/app.ts";


export type BookmarkConfigFile = BookmarkConfig & {
  apps: App[];
}

/**
 * Read the config file
 */

let globalConfig: BookmarkConfigFile = loadConfig();

function loadConfig(): BookmarkConfigFile {
  try {
    const file = fs.readFileSync(env.CONFIG_FILE, 'utf8');

    return yaml.load(file, {});
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`Le fichier ${env.CONFIG_FILE} est introuvable.`);
    } else {
      throw error;
    }
  }
}


export const fileConfig: BookmarkConfig = {
  title: globalConfig.title,
  description: globalConfig.description ?? "",
  auth: globalConfig.auth ?? "basic_auth",
  users: globalConfig.users ?? [],
}

export const fileApps: App[] = globalConfig.apps ?? [];
