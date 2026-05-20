import type { AuthType } from '$lib/server/auth/auth.ts';
import type {User} from "$lib/models/user.ts";

export type BookmarkConfig = {
    title: string;
    description: string;
    auth: AuthType;
    users: User[];
};

