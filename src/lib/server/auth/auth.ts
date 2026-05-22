import type { AuthProvider } from '$lib/server/auth/auth-provider.interface.ts';
import { BasicAuth } from '$lib/server/auth/provider/basic-auth.ts';
import { getGlobalConfig } from '$lib/server/global-config.ts';
import { ForwardAuth } from '$lib/server/auth/provider/forward-auth.ts';

let authProvider: AuthProvider;

export type AuthType = 'basic_auth' | 'forward_auth';

export function getAuthProvider(): AuthProvider {
    if (authProvider) {
        return authProvider;
    }

    const authType = getGlobalConfig().auth;
    switch (authType) {
        case 'basic_auth':
            authProvider = new BasicAuth();
            break;
        case 'forward_auth':
            authProvider = new ForwardAuth();
            break;
        default: {
            throw new Error(`Unsupported auth provider: ${authType}`);
        }
    }

    return authProvider;
}
