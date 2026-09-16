import express, {Request, Response, NextFunction, Router} from 'express'; 
import { router } from './routes';
import cors from 'cors';
import path from 'path';

//configurações
const app = express();
app.use(express.json());
app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use(cors());

app.use(
    (err: Error, req:Request, res:Response, next:NextFunction)=>{
        if(err instanceof Error)//erro no lado cliente
        {
            res.status(400).json(
                {error:err.message }
            )
        } 
        //erro no servidor       
        res.status(500).json(
            {
                status:'error',
                message: 'Internal Server Error'
            }
        )
    })

app.listen(3333, ()=>{console.log('Server ON!')});
