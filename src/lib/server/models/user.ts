import type { User as BaseUser } from '$lib/models/user';

export type User = BaseUser & {
    password?: string;
};
