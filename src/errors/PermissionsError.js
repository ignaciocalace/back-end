export class PermissionsError extends Error {
  constructor(msje = "Permissions Error") {
    super(msje);
    this.type = "PERMISSIONS_ERROR";
  }
}
