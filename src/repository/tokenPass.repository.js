import { tokenPassManager } from "../dao/DB/tokenPassManager.js";

class TokenPassRepository {
  constructor(tokenPassDao) {
    this.tokenPassDao = tokenPassDao;
  }
  async addToken(newToken) {
    return await this.tokenPassDao.save(newToken);
  }
  async getToken(token) {
    return await this.tokenPassDao.getOne({ tokenId: token });
  }
  async deleteToken(token) {
    return await this.tokenPassDao.delete({ tokenId: token });
  }
}

export const tokenPassRepository = new TokenPassRepository(tokenPassManager);
