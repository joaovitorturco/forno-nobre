import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req:Request, res:Response){

        
        const { nome } = req.body;

        const createCategory = new CreateCategoryService();

        
        const category = await createCategory.execute({nome});

        
        res.json(category);
    }
};

export {CreateCategoryController}