import type { Handle } from '@sveltejs/kit';
import { getAuthProvider } from '$lib/server/auth/auth';
import { sequence } from '@sveltejs/kit/hooks';

/**
 * Redirect to login if user is not connected
 * @param event
 * @param resolve
 */
const connectUser: Handle = async ({ event, resolve }) => {
    const authProvider = getAuthProvider();

    // Dont login healthcheck
    if (
        event.url.pathname !== '/api/healthcheck' &&
        !(await authProvider.handleRequest(event.request))
    ) {
        return authProvider.getUnauthenticatedResponse();
    }

    return resolve(event);
};

export const handle = sequence(connectUser);
