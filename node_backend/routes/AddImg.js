const router = require ("express").Router();
var kafka = require("../kafka/client");
const appController = require("../controllers/fileUpload");
const multer = require("multer")


const upload = multer();
router.post("/AddImg",upload.single("originalname"),appController.handleFileUpload);


module.exports = router;
