import { CONFIG_FILE_PATH } from '$env/static/private';
import type { Config as ConfigModel, App } from '../models/config.ts';

import fs from 'node:fs';
import yaml from 'js-yaml';
import type { AuthType } from '$lib/server/auth/auth.ts';

let config: ConfigModel;

function loadConfig(): ConfigModel {
    try {
        const file = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');

        return yaml.load(file, {});
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Le fichier ${CONFIG_FILE_PATH} est introuvable.`);
        } else {
            throw error;
        }
    }
}

export function getConfig(key: string): any {
    if (typeof config === 'undefined') {
        config = loadConfig();
    }

    return config[key] ?? null;
}

export function getTitle(): string {
    return getConfig('title');
}

export function getApps(): App[] {
    return getConfig('apps');
}

export function getAuthType(): AuthType {
    return getConfig('auth');
}
