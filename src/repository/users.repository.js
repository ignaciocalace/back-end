import { userManager } from "../dao/DB/userManager.js";
import UserDTO from "../dao/models/userDTO.js";

class UsersRepository {
  constructor(usersDao) {
    this.usersDao = usersDao;
  }
  async addUser(dataNewUser) {
    return await this.usersDao.save(dataNewUser);
  }

  async findUser(queryFilter) {
    const user = await this.usersDao.get({ email: queryFilter });
    if (user.length != 0) {
      const userDTO = new UserDTO(user[0]);
      return userDTO.returnUser();
    } else {
      return null;
    }
  }

  async findUserId(queryFilter) {
    return await this.usersDao.getOne({ _id: queryFilter });
  }
  async findCredentials(emailQuery) {
    const userDB = await this.usersDao.get({
      email: emailQuery,
    });
    return userDB[0];
  }
}
export const usersRepository = new UsersRepository(userManager);
