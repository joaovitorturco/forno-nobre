import { Router } from 'express';
import multer from 'multer';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateUserController } from './controllers/user/CreateUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListUserByIdController } from './controllers/user/ListUserByIdController';
import { ListAllCategoriesController } from './controllers/category/ListAllCategoriesController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateProductController } from './controllers/product/CreateProductController'
import uploadConfig from './config/multer'

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

router.post('/novacategoria', new CreateCategoryController().handle)
router.post('/user', new CreateUserController().handle)

router.get('/dashboard', isAuthenticated, new ListUserByIdController().handle)

router.get('/listarcategorias', new ListAllCategoriesController().handle)
router.post('/session', new AuthUserController().handle)   

router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)


export {router};