const router = require("express").Router();
const multer = require('multer');
const upload = multer()

const SuggestionController = require("../controller/SuggestionController");
const VerifgToken = require('../helpers/verify-token')

//middleware
router.post("/create", VerifgToken, SuggestionController.create);
router.get("/allSuggestion", VerifgToken, SuggestionController.allSuggestion);
router.get("/GetSuggestion/:id", SuggestionController.GetSuggestion);
router.get("/GetOneSuggestion/:id", SuggestionController.GetOneSuggestion);




module.exports = router;