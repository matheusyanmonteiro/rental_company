import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import swaggerFile from '../../../swagger.json';

//database
import "@shared/infra/typeorm";
//dependency injection
import "@shared/container";
import { AppError } from "@shared/errors/AppError";



//instance of express
const app = express();
//express
app.use(express.json());
//swagger init documentation
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerFile));
//routes of application
app.use(router);

// middle of error
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
  })
})

//localhost listen 
app.listen(3333, () => console.log("Server is running!"));
