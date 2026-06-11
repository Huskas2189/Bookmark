import type { BookmarkConfig as BaseBookmarkConfig } from '$lib/models/bookmark-config';
import type { AuthType } from '$lib/server/auth/auth';
import type { User } from '$lib/server/models/user';

export type BookmarkConfig = BaseBookmarkConfig & {
    auth: AuthType;
    users: User[];
};
