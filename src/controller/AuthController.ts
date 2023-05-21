import {Request, Response} from 'express';
import { AuthBusiness } from 'src/business /AuthBusiness';

export class AuthController {
  constructor(private authBusiness: AuthBusiness) {}

  signin = async (req: Request, res: Response) => {
    try {
      const code = req.body.code as string;
      const result = await this.authBusiness.signin(code);

      res.status(200).send({token: result});
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }

  }

}
