import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersService } from "../services/users.service.js";
import { comparePass, hashPass } from "../utils/crypt.js";
import { AuthenticationError } from "../errors/AuthenticationError.js";
import dotenv from "dotenv";
import passportJwt from "passport-jwt";

dotenv.config();

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
      secretOrKey: process.env.PASSJWT,
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
      const userDB = await usersService.findUser(req.body.email);
      const user = userDB[0];
      if (!user) return done(new AuthenticationError());
      if (!comparePass(req.body.password, user.password))
        return done(new AuthenticationError());
      delete user.password;
      delete req.body.password;
      done(null, user);
    }
  )
);

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.CLIENTIDGITHUB,
      clientSecret: process.env.CLIENTSECRETGITHUB,
      callbackURL: process.env.CBURLGITHUB,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, login, name, nodeId } = profile["_json"];
      const newEmail = email ? email : login;
      const { firstName, lastName } = splitName(name);
      let user = await usersService.findUser(newEmail || login);
      user = user[0];
      if (!user) {
        user = {
          first_name: firstName,
          last_name: lastName,
          password: "",
          email: newEmail,
          age: undefined,
          role: "user",
        };
        await usersService.addUser(user);
      }
      delete user.password;
      done(null, user);
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
