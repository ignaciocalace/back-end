import UserDTO from "../dao/models/userDTO.js";
import { userManager } from "../dao/DB/userManager.js";

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

  async getAllUsers() {
    const allUsers = await this.usersDao.get({}, 0);
    return allUsers.map((user) => new UserDTO(user));
  }
  async getAllInactive(filterVal) {
    const allUsers = await this.usersDao.get(
      { last_connection: { $lt: filterVal } },
      0
    );
    return allUsers.map((user) => new UserDTO(user));
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
  async updateUser(filterKey, filterVal, newUser) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    const updateUser = await this.usersDao.update(queryFilter, newUser);
    return updateUser;
  }
  async deleteUser(filterKey, filterVal) {
    let queryFilter = {};
    queryFilter[filterKey] = filterVal;
    return await this.usersDao.delete(queryFilter);
  }
  async deleteAllInactive(filterVal) {
    return await this.usersDao.delete({ last_connection: { $lt: filterVal } });
  }
}

export const usersRepository = new UsersRepository(userManager);
