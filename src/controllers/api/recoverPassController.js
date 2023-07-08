import { errors } from "../../errors/errors.js";
import { genToken } from "../../utils/tokenGen.js";
import { TokenPass } from "../../../src/dao/models/TokenPass.js";
import { usersService } from "../../services/users.service.js";
import { emailService } from "../../services/mailing.service.js";
import { errorHandler } from "../../middlewares/errorsHandler.js";
import { tokenPassService } from "../../services/tokenPass.service.js";

export async function recoverPassController(req, res) {
  try {
    const emailUser = req.body.email;
    const userToUpdate = await usersService.findUser(emailUser);
    if (userToUpdate) {
      const tokenId = genToken(emailUser);
      const newToken = new TokenPass({ tokenId });
      await tokenPassService.addToken(newToken);
      const link = `localhost:8080/resetPassword/${tokenId}`;
      await emailService.send(
        emailUser,
        "Password Recovery",
        `<h2>Please click on the following link to recover your password:</h2>
        <a href="http://${link}">${link}</a>
        `
      );
      res.status(201).json("Email sent");
    }
  } catch (err) {
    new errorHandler(errors.INVALID_ARG, req, res);
  }
}
