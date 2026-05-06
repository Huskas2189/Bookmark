
import { CONFIG_FILE_PATH } from '$env/static/private';
import type { Config as ConfigModel, App } from '../models/config.ts'

import fs from 'node:fs';
import yaml from 'js-yaml';

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

function getConfig(key: 'title'|'apps'): any {
  if (typeof config === 'undefined') {
    config = loadConfig();
  }

  return config[key];
}

export function getTitle(): string {
  return getConfig('title');
}


export function getApps(): App[] {
  return getConfig('apps');
}