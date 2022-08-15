import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { inject } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

class SendForgotPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DaysjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
  }
}

export { SendForgotPasswordUseCase };
