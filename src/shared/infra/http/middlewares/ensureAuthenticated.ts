
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
){
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("token dont found", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token, 
      "becb81991e9b124f30fcafbcd5d140a4"
      ) as IPayload;

    const userRepository = new UsersRepository();
    const user = userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User dont exists!", 401);
    }
    request.user = {
      id: user_id
    }

    next();
  }
  catch {
    throw new AppError("Invalid token.", 401);
  }

}