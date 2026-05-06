import type {User} from "$lib/models/config.ts";


export interface AuthProvider {
  getConnectedUser(): User|null;
  handleRequest(req: Request): Promise<boolean>;
  getUnauthenticatedResponse(): Response;
}