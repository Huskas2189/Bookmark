import {getApps, getTitle} from "$lib/server/config.ts";
import type {LayoutServerData} from './$types';

function getUserApps() {
  return getApps();
}

export const load: LayoutServerData = () => {
  return {
    title: getTitle()
  };
};