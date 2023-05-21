import { CustomError } from "@error/CustomError";
import { Authenticator } from "@services/Authenticator";
import { AuthenticationData } from "types/AuthenticationData";

export default function validateToken(token: string): AuthenticationData {
    try {
        if(!token) {
          throw new CustomError(401, "Missing token");
        }

        const authenticator: Authenticator = new Authenticator();
        const validateToken = authenticator.getTokenData(token)

        if(!validateToken.id) {
          throw new CustomError(401, "Invalid token");
        }

        return validateToken
    } catch (error: any) {
        throw new CustomError(401, "Invalid token");
    }
}
