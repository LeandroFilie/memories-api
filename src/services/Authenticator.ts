import * as jwt from "jsonwebtoken"
import { AuthenticationData } from "types/AuthenticationData";

export class Authenticator{
  generateToken(data: AuthenticationData): string{
    const token = jwt.sign(
      data,
      process.env.JWT_KEY as string,
      {
        expiresIn: '7days',
      }
    );
    return token;
  }

  getTokenData(token: string): AuthenticationData{
    try {
      var decodedToken = jwt.verify(token, process.env.JWT_KEY as string);
      return decodedToken as AuthenticationData;
    } catch (error: any) {
      return { id: "" } as AuthenticationData;
    }
  }
}
