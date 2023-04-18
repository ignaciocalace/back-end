export class AuthenticationError extends Error {
  constructor(msje = "Authentication Error") {
    super(msje);
    this.type = "AUTHENTICATION_ERROR";
  }
}
