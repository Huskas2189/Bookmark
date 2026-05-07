import type { AuthProvider } from '$lib/server/auth/authProvider.interface.ts';
import { getConfig } from '$lib/server/config.ts';
import type { User } from '$lib/models/config.ts';
import bcrypt from 'bcryptjs';

export class BasicAuth implements AuthProvider {
    private _user: User | null = null;

    public getConnectedUser(): User | null {
        return this._user;
    }

    public async handleRequest(req: Request): Promise<boolean> {
        const auth = req.headers.get('authorization');

        if (!auth || !auth.startsWith('Basic ')) {
            return false;
        }

        const base64Credentials = auth.slice('Basic '.length);
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

        const [username, password] = credentials.split(':');

        const user = this._getUser(username);
        if (!user) {
            return false;
        }

        if (await bcrypt.compare(password, user.password)) {
            this._user = user;
            return true;
        }

        return false;
    }

    public getUnauthenticatedResponse(): Response {
        return new Response('Authentication required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            }
        });
    }

    private _getUser(username: string): User | null {
        const users = getConfig('users') as User[];

        return users.find((u) => u.username === username) ?? null;
    }
}
