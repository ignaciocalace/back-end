import { userManager } from "../dao/DB/userManager.js";

class UsersService {
  async addUser(dataNewUser) {
    return await userManager.save(dataNewUser);
  }

  async findUser(queryFilter) {
    return await userManager.get({ email: queryFilter });
  }

  async findCredentials(emailQuery, passwordQuery) {
    return await userManager.get({
      email: emailQuery,
      password: passwordQuery,
    });
  }
}
export const usersService = new UsersService();
