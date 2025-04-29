const jwt = require("jsonwebtoken");
const getToken = require("./get-token");
const checkToken = (req, res, next) => {
  if (!req) {
    return res.status(401).json({ message: "Acesso Negado!" });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }
  try {
    const verified = jwt.verify(token, "nosssosrcret");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token Inválido" });
  }
};

module.exports = checkToken;
