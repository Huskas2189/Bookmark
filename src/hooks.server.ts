import type {Handle} from '@sveltejs/kit';
import {getAuthProvider} from "$lib/server/auth/auth.ts";
import {getApps} from "$lib/server/config.ts";
import type {User} from "$lib/models/config.ts";
import {sequence} from "@sveltejs/kit/hooks";

/**
 * Redirect to login if user is not connected
 * @param event
 * @param resolve
 */
const connectUser: Handle = async ({ event, resolve }) => {
  const authProvider = getAuthProvider();

  if (!await authProvider.handleRequest(event.request)) {
    return authProvider.getUnauthenticatedResponse();
  }

  return resolve(event);
};

const configUserApps: Handle = async ({ event, resolve }) => {

  const authProvider = getAuthProvider();
  const user = authProvider.getConnectedUser() as User;

  event.locals.apps = getApps().filter((app) => {
    const groupSet = new Set(user.roles);
    return app.roles.some(role => groupSet.has(role))
  });
  return resolve(event);
};

export const handle = sequence(connectUser, configUserApps);