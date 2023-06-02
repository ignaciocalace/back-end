import { EMAIL_PASS, EMAIL_USER, NODE_ENV } from "./passwords.js";

const emailDevConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "justine.mcdermott@ethereal.email",
    pass: "1W3D8mGpDYU93qF9D7",
  },
};

const emailProdConfig = {
  service: "gmail",
  port: 587,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};

let EMAIL_CONFIG;
if (NODE_ENV === "production") {
  EMAIL_CONFIG = emailProdConfig;
} else {
  EMAIL_CONFIG = emailDevConfig;
}

export { EMAIL_CONFIG };
