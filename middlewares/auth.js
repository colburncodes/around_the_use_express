const jwt = require("jsonwebtoken");
const Status = require("../utils/error");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (res) => {
  res.status(Status.Unauthorized).send({ message: "Authorization Error" });
};

const extractBearerToken = (header) => header.replace("Bearer ", "");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};