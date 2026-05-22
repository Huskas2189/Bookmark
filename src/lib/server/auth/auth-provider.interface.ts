import type { User } from '$lib/models/user';

export interface AuthProvider {
    getConnectedUser(): User | null;
    handleRequest(req: Request): Promise<boolean>;
    getUnauthenticatedResponse(): Response;
}
