import type { AuthType } from '$lib/server/auth/auth.ts';

export type Config = {
    title: string;
    secret: string;
    apps: App[];
    auth: AuthType;
    users: User[];
};

export type App = {
    id: string;
    name: string;
    url: string;
    icon?: string;
    roles: string[];
};

export type User = {
    username: string;
    password?: string;
    roles: string[];
};
