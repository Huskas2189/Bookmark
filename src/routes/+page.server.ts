import {getApps} from "$lib/server/config.ts";
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = ({ locals }) => {
  return {
    apps: locals.apps
  };
};
