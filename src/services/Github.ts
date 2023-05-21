import axios, { AxiosResponse } from "axios";

export class Github{
  async getAcessToken(code: string): Promise<string>{

    const response: AxiosResponse = await axios.post(
      'http://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET_ID,
          code,
        },
        headers: {
          Accept: 'application/json',
        }
      }
    );
    const { access_token } = response.data;
    return access_token;
  }

  async getUserInfo(token: string): Promise<any> {
    const response: AxiosResponse = await axios.get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  }
}
