import { Request, Response } from "express";
import { ListAllCategoriesService } from "../../services/category/ListAllCategoriesService";

class ListAllCategoriesController{
    async handle(req:Request, res:Response) {
        const listAllCategoriesService = new ListAllCategoriesService();

        const categories = await listAllCategoriesService.execute();

        res.json(categories);
    }
}

export { ListAllCategoriesController };