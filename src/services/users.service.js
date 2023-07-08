import { usersRepository } from "../repository/users.repository.js";

class UsersService {
  async addUser(dataNewUser) {
    return await usersRepository.addUser(dataNewUser);
  }

  async findUser(queryFilter) {
    return await usersRepository.findUser(queryFilter);
  }
  async findAllUsers() {
    return await usersRepository.getAllUsers();
  }
  async findAllInactive(value) {
    return await usersRepository.getAllInactive(value);
  }
  async findUserId(queryFilter) {
    return await usersRepository.findUserId(queryFilter);
  }
  async findCredentials(emailQuery) {
    return await usersRepository.findCredentials(emailQuery);
  }
  async updateUser(filterKey, filterVal, newUser) {
    return usersRepository.updateUser(filterKey, filterVal, newUser);
  }
  async deleteUser(filterKey, filterVal) {
    return await usersRepository.deleteUser(filterKey, filterVal);
  }
  async deleteAllInactive(filterVal) {
    return await usersRepository.deleteAllInactive(filterVal);
  }
}
export const usersService = new UsersService();
