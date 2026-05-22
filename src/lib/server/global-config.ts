import type { BookmarkConfig } from '$lib/models/bookmark-config';
import { getFileConfig } from '$lib/server/config/file-config';

export function getGlobalConfig(): BookmarkConfig {
    return {
        title: getFileConfig().title,
        description: getFileConfig().description,
        auth: getFileConfig().auth,
        users: getFileConfig().users
    };
}
