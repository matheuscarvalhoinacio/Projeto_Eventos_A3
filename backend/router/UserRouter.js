const router = require("express").Router();

const UserController = require("../controller/UserController");
const VerifgToken = require('../helpers/verify-token')

//middleware

router.post("/register", UserController.register);
router.post("/login", UserController.Login);
router.get('/checkUser', UserController.checkUser)


module.exports = router;