const router = require("express").Router();
const multer = require('multer');
const upload = multer()

const ReportController = require("../controller/ReportController");
const VerifgToken = require('../helpers/verify-token')

//middleware
router.post("/create", upload.none(), VerifgToken, ReportController.create);
router.get("/getAll", ReportController.getAll);
router.get("/getRoom", ReportController.getRoom);
router.get("/AllUser", ReportController.getAllUser);
router.post("/search",ReportController.Search);



module.exports = router;