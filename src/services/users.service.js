import { usersRepository } from "../repository/users.repository.js";

class UsersService {
  async addUser(dataNewUser) {
    return await usersRepository.addUser(dataNewUser);
  }

  async findUser(queryFilter) {
    return await usersRepository.findUser(queryFilter);
  }

  async findUserId(queryFilter) {
    return await usersRepository.findUserId(queryFilter);
  }
  async findCredentials(emailQuery) {
    return await usersRepository.findCredentials(emailQuery);
  }
}
export const usersService = new UsersService();
