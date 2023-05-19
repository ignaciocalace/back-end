import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersService } from "../services/users.service.js";
import { comparePass, hashPass } from "../utils/crypt.js";
import { AuthenticationError } from "../errors/AuthenticationError.js";
import passportJwt from "passport-jwt";
import { cartsService } from "../services/carts.service.js";
import { Cart } from "../dao/models/Cart.js";
import {
  CBURLGITHUB,
  CLIENTIDGITHUB,
  CLIENTSECRETGITHUB,
  PASSJWT,
} from "../config/passwords.js";

const JWTStrategy = passportJwt.Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req.signedCookies && req.signedCookies["user"]) {
    token = req.signedCookies["user"];
  }
  return token;
};

passport.use(
  "verifyTokenAuth",
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: PASSJWT,
    },
    function (jwtPayload, done) {
      done(null, jwtPayload);
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const isUser = await usersService.findUser(req.body.email);
        if (isUser.length > 0)
          return res
            .status(422)
            .json({ status: "error", error: "User already exists" });
        req.body["password"] = hashPass(req.body["password"]);
        const createCart = new Cart();
        const newCart = await cartsService.createCart(createCart);
        req.body["cart"] = newCart._id.valueOf();
        const newUser = await usersService.addUser(req.body);
        done(null, newUser);
      } catch (error) {
        done(null, false, error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const userDB = await usersService.findCredentials(req.body.email);
      if (!userDB) return done(new AuthenticationError());
      if (!comparePass(req.body.password, userDB.password))
        return done(new AuthenticationError());
      delete userDB.password;
      delete req.body.password;
      done(null, userDB);
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: CLIENTIDGITHUB,
      clientSecret: CLIENTSECRETGITHUB,
      callbackURL: CBURLGITHUB,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, login, name } = profile["_json"];
      const newEmail = email ? email : login;
      const { firstName, lastName } = splitName(name);
      let userDB = await usersService.findUser(newEmail || login);
      if (!userDB) {
        const newCart = await cartsService.createCart(new Cart());
        userDB = {
          first_name: firstName,
          last_name: lastName,
          password: "",
          email: newEmail,
          age: undefined,
          cart: newCart._id.valueOf(),
          role: "user",
        };
        await usersService.addUser(userDB);
      }
      done(null, userDB);
    }
  )
);

function splitName(fullName) {
  const [firstName, lastName] = fullName.split(" ");
  return { firstName, lastName };
}

passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});
const passportInitialize = passport.initialize();

export { passportInitialize, passport };
