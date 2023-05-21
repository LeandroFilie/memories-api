import { AuthData } from '@data/AuthData';
import { User } from '@model/User';
import { Authenticator } from '@services/Authenticator';
import { Github } from '@services/Github';
import { IdGenerator } from '@services/IdGenerator';
import { AuthenticationData } from 'types/AuthenticationData';
import { UserDTO } from 'types/UserDTO';

export class AuthBusiness {
  constructor(
    private authData: AuthData,
    private github: Github,
    private idGenerator: IdGenerator,
    private auth: Authenticator
  ) {}

  async signin(code: string): Promise<string> {
    try {
      const accessToken = await this.github.getAcessToken(code);
      const userInfo: UserDTO = await this.github.getUserInfo(accessToken);
      const userGithubIdString = String(userInfo.id);

      let user: User = await this.authData.getUserByGithubId(userGithubIdString);

      if(!user){
        user = {
          id: this.idGenerator.generate(),
          githubId: userGithubIdString,
          name: userInfo.name,
          login: userInfo.login,
          avatar: userInfo.avatar_url,
        }

        await this.authData.createUser(user);
      }

      const dataAuthentication: AuthenticationData = {
        id: user.id,
        avatarUrl: user.avatar,
        name: user.name,
      }

      const token = this.auth.generateToken(dataAuthentication);
      return token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}
