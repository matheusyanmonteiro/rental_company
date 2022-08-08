import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    throw new Error("Method not implemented.");
  }
}

export { UsersTokensRepository };
