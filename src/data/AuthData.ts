import { prisma } from "@lib/prisma";
import { User } from "@model/User";

export class AuthData{
  async getUserByGithubId(githubId: string): Promise<User> {
    console.log(githubId);

    try{
      const user = await prisma.user.findFirst({
        where: {
          githubId,
        }
      })

      return user as User;
    } catch (error: any){
      throw new Error(error.message);
    }
  }

  async createUser(newUser: User): Promise<void>{
    try {
      await prisma.user.create({
        data: newUser,
      })
    } catch (error: any){
      throw new Error(error.message);
    }
  }
}
