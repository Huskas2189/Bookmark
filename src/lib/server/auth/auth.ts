import type { AuthProvider } from '$lib/server/auth/authProvider.interface.ts';
import { BasicAuth } from '$lib/server/auth/provider/basic-auth.ts';
import { getAuthType } from '$lib/server/config.ts';
import {ForwardAuth} from "$lib/server/auth/provider/forward-auth.ts";

let authProvider: AuthProvider;

export type AuthType = 'basic_auth';

export function getAuthProvider(): AuthProvider {
    if (authProvider) {
        return authProvider;
    }

    const authType = getAuthType();
    switch (authType) {
        case 'basic_auth':
            authProvider = new BasicAuth();
            break;
        case 'forward_auth':
            authProvider = new ForwardAuth();
            break;
        default: {
            throw new Error(`Unsupported provider: ${authType}`);
        }
    }

    return authProvider;
}
