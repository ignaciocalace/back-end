import { tokenPassService } from "../../services/tokenPass.service.js";
import { decoToken } from "../../utils/tokenGen.js";

export async function resetPassController(req, res, next) {
  try {
    const token = req.params.token;
    const userEmail = decoToken(token);
    const isToken = await tokenPassService.getToken(token);
    if (userEmail && isToken) {
      req.userPassToken = token;
      res.render("resetPass");
    } else {
      res.redirect("/forgotPass");
    }
  } catch (err) {
    res.redirect("/forgotPass");
  }
}
