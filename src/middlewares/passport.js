import {
  CBURLGITHUB,
  CLIENTIDGITHUB,
  CLIENTSECRETGITHUB,
  PASSJWT,
} from "../config/passwords.js";
import passport from "passport";
import passportJwt from "passport-jwt";
import { errors } from "../errors/errors.js";
import { Cart } from "../dao/models/Cart.js";
import { errorHandler } from "./errorsHandler.js";
import { comparePass, hashPass } from "../utils/crypt.js";
import { Strategy as LocalStrategy } from "passport-local";
import { usersService } from "../services/users.service.js";
import { Strategy as GithubStrategy } from "passport-github2";
import { cartsService } from "../services/carts.service.js";

const JWTStrategy = passportJwt.Strategy;

const cookieExtractor = (req) => {
  let cookieToken = req.signedCookies && req.signedCookies["user"];
  return cookieToken;
};
passport.use(
  "verifyTokenAuth",
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: PASSJWT,
    },
    function (jwtPayload, done) {
      try {
        done(null, { user: jwtPayload });
      } catch (err) {
        done(err, false);
      }
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
        if (isUser) {
          return done(new errorHandler(errors.DATABASE_ERROR, req, req.res));
        }
        req.body["password"] = hashPass(req.body["password"]);
        const createCart = new Cart();
        const newCart = await cartsService.createCart(createCart);
        req.body["cart"] = newCart._id.valueOf();
        const newUser = await usersService.addUser(req.body);

        done(null, newUser);
      } catch (err) {
        done(new errorHandler(errors.DATABASE_ERROR, req, req.res));
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
      try {
        const userDB = await usersService.findCredentials(req.body.email);
        if (!userDB) {
          return done(new errorHandler(errors.NOT_FOUND, req, req.res));
        }
        if (!comparePass(req.body.password, userDB.password)) {
          return done(new errorHandler(errors.UNAUTHORIZED), req, req.res);
        }
        delete userDB.password;
        delete req.body.password;
        done(null, userDB);
      } catch (err) {
        done(new errorHandler(errors.DATABASE_ERROR, req, req.res));
      }
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
      try {
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
      } catch (err) {
        done(new errorHandler(errors.DATABASE_ERROR, req, req.res));
      }
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
