const jwt = require("jsonwebtoken");
const Status = require("../utils/error");
const { JWT_SECRET } = require("../utils/config");

const handleAuthError = (res) => {
  res.status(Status.Unauthorized).send({ message: "Authorization Error" });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", ""); //extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log(payload);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
