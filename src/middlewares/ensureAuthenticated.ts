import {NextFunction, Request, Response} from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
    next();
  }
  catch {
    throw new AppError("Invalid token.", 401);
  }

}