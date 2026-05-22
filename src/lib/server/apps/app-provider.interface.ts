import type { App } from '$lib/models/app';

export interface AppProvider {
    getApps(): Promise<App[]>;
}
