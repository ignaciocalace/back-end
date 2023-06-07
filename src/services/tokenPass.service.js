import { tokenPassRepository } from "../repository/tokenPass.repository.js";

class TokenPassService {
  async addToken(newToken) {
    return await tokenPassRepository.addToken(newToken);
  }
  async getToken(token) {
    return await tokenPassRepository.getToken(token);
  }
  async removeToken(token) {
    return await tokenPassRepository.deleteToken(token);
  }
}
export const tokenPassService = new TokenPassService();
