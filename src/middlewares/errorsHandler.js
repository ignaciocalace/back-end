export function ErrorsHandler(error, req, res, next) {
  switch (error.type) {
    case "AUTHENTICATION_ERROR":
      res.status(401);
      break;
    case "PERMISSIONS_ERROR":
      res.status(403);
      break;
    default:
      res.status(500);
  }

  res.json({ errorMsg: error.message });
}
