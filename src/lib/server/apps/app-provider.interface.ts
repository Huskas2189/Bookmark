import type { App } from '$lib/models/app.ts';

export interface AppProvider {
    getApps(): Promise<App[]>;
}
