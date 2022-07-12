//localhost:9090/api/certificate/61dac5efef43182b44bdc8db


const express = require("express");

const router = express.Router();

const pharmacieController = require("../controllers/pharmacie.controller");


/**
 * @PATH : base_url + api/certificate
 */
router.get("/:_id",pharmacieController.certificate)

module.exports = router;