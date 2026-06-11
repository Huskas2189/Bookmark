import type { BookmarkConfig } from '$lib/models/bookmark-config';
import { getFileConfig } from '$lib/server/config/file-config';

export function getGlobalConfig(): BookmarkConfig {
    const fileConfig = getFileConfig();
    return {
        title: fileConfig.title,
        description: fileConfig.description,
        defaultAttrs: fileConfig.defaultAttrs
    };
}
