import { Request, Response } from "express";
import { ListUserByIdService } from "../../services/user/ListUserByIdService";

class ListUserByIdController{

	async handle(req:Request, res:Response){
		const id = req.user_id;

		const listUser = new ListUserByIdService();
		
		const user = await listUser.execute({id});

		res.json(user);
	}

}

export {ListUserByIdController}