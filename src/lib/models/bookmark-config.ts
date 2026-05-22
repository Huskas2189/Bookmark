import type { AuthType } from '$lib/server/auth/auth';
import type { User } from '$lib/models/user';

export type BookmarkConfig = {
    title: string;
    description: string;
    auth: AuthType;
    users: User[];
};
