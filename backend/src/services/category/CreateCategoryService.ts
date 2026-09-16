import prismaClient from "../../prisma";

interface CreateCategoryRequest{
    nome: string;
}

class CreateCategoryService{
    async execute({nome}:CreateCategoryRequest){
        if(!nome){
            throw new Error("Dados ausentes!");
        }

        const category = await prismaClient.categoria.create({
            data: {
                nome: nome
            },
            select: {
                id: true,
                nome: true
            }
        });

        return category;
    }
};

export {CreateCategoryService};