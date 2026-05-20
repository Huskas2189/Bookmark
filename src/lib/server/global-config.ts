import type {BookmarkConfig} from "$lib/models/bookmark-config.ts";
import {getFileConfig} from "$lib/server/config/file-config.ts";

export function getGlobalConfig(): BookmarkConfig {
  return {
    title: getFileConfig().title,
    description: getFileConfig().description,
    auth: getFileConfig().auth,
    users: getFileConfig().users
  };
}
