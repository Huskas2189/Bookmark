import {getApps} from "$lib/server/config.ts";
import type {PageServerLoad} from './$types';

function getUserApps() {
  return getApps();
}

export const load: PageServerLoad = ({ params }) => {
  return {
    config: getUserApps()
  };
};
