import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

//interface define os dados que serão usados com tipagem
interface CreateUserRequest{
    nome:string;
    email:string;
    senha:string;
}

class CreateUserService{

    async execute({nome, email, senha}:CreateUserRequest){
        //lógica para executar o requisito

        if(!nome || !email || !senha){
            throw new Error("Dados ausentes!");
        }

        const senhaHash = await hash(senha, 8);

        const user = await prismaClient.usuario.create({
            data:{
                nome:nome, 
                email:email,
                senha:senhaHash
            },
            select:{
                id:true,
                email:true,
                senha:true
            }
        });

        return user;
    }
}

export {CreateUserService}