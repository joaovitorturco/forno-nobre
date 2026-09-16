import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{

    async handle(req:Request, res:Response){
        const {email, senha} = req.body;

        const authUser = new AuthUserService();

        const user = await authUser.execute({email,senha});

        res.json(user);
    }
}

export {AuthUserController}