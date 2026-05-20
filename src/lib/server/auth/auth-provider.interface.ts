import type { User } from '$lib/models/user.ts';

export interface AuthProvider {
    getConnectedUser(): User | null;
    handleRequest(req: Request): Promise<boolean>;
    getUnauthenticatedResponse(): Response;
}
