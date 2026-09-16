import prismaClient from "../../prisma";

interface ListUserRequest{
	id: string;
}

class ListUserByIdService{
	
	async execute({id}:ListUserRequest){
		
		if(!id){
			throw Error("Usuário não fornecido!");
		}
		
		const user = await prismaClient.usuario.findFirst({
			where:{
				id:id
			},
			select:{
				nome:true,
				email:true,
				senha:true
			}
		})

		return user;
	}
}

export {ListUserByIdService}