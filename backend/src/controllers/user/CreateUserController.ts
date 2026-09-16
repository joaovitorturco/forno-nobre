//importação da biblioteca expreess e da classe Service usada:
import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{

    async handle(req:Request, res:Response){

        //desconstruir o JSON recebido do cliente:
        const {nome, email, senha} = req.body;

        //objeto da classe Service
        const createUser = new CreateUserService();

        //executar o serviço
        const user = await createUser.execute({nome, email, senha});

        //retornar uma resposta ao cliente
        res.json(user);
    }
}

export {CreateUserController}