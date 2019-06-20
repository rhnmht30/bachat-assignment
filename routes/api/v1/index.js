const express = require("express");
const router = express.Router();

const indexController = require("../../../controllers/index_controller");

router.get("/", indexController.home);

router.post("/add_transaction/:email", indexController.add_transaction);

router.post("/add_user", indexController.add_user);

module.exports = router;
