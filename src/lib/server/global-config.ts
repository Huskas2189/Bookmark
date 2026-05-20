import type {BookmarkConfig} from "$lib/models/bookmark-config.ts";
import {fileConfig} from "$lib/server/config/file-config.ts";
import {apps} from "$lib/server/apps/apps.ts";


export const globalConfig: BookmarkConfig = {
  title: fileConfig.title,
  description: fileConfig.description,
  auth: fileConfig.auth,
  users: fileConfig.users
}
