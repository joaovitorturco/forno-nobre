import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthUserRequest{
    email:string;
    senha:string;
}

class AuthUserService{

    async execute({email,senha}:AuthUserRequest){
        
        const user = await prismaClient.usuario.findFirst({
            where:{
                email: email
            }
        });

        if(!user){
            throw new Error("Usuário ou senha incorretos!");
        }

        const senhaMatch = await compare(senha, user.senha);

        if(!senhaMatch){
            throw new Error("Usuários ou senha incorretos!");
        }

        const token = sign(
            {
                nome: user.nome,
                usuario: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1h'
            }
        );

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            token: token
        }

    }
}

export {AuthUserService}