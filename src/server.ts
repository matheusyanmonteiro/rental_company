import "reflect-metadata"

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import swaggerFile from './swagger.json';

//database
import "./database";
//dependency injection
import "./shared/container";


//instance of express
const app = express();
//express
app.use(express.json());
//swagger init documentation
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerFile));
//routes of application
app.use(router);
//localhost listen 
app.listen(3333, () => console.log("Server is running!"));
