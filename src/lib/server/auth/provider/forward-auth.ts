import type {AuthProvider} from "$lib/server/auth/authProvider.interface.ts";
import type {User} from "$lib/models/config.ts";


export class ForwardAuth implements AuthProvider {

  private readonly REMOTE_GROUPS_HEADER = 'Remote-Groups';
  private readonly REMOTE_USER_HEADER = 'Remote-User';
  private readonly REMOTE_NAME_HEADER = 'Remote-Name';

  private _user: User|null = null;

  getConnectedUser(): User | null {
    return this._user;
  }

  getUnauthenticatedResponse(): Response {
    return new Response('Authentication required - Missing header params', {
      status: 401
    });
  }

  public async handleRequest(req: Request): Promise<boolean> {

    if (!req.headers.has(this.REMOTE_GROUPS_HEADER)
      && !req.headers.has(this.REMOTE_USER_HEADER)
      && !req.headers.has(this.REMOTE_NAME_HEADER)) {
      return false;
    }

    this._user = {
      username: `${req.headers.get(this.REMOTE_NAME_HEADER)} (${req.headers.get(this.REMOTE_USER_HEADER)})`,
      roles: req.headers.get(this.REMOTE_GROUPS_HEADER)?.split(',')
    } as User;

    return true;
  }

}
