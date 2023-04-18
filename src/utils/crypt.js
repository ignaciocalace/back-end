import bcrypt from "bcrypt";

export function hashPass(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}

export function comparePass(passLogin, passDB) {
  return bcrypt.compareSync(passLogin, passDB);
}
