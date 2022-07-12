const express = require("express");

const router = express.Router();

const pharmacieController = require("../controllers/pharmacie.controller");


/**
 * @Route : /api/pharmacies
 */
// router.post("/login", userContropharmacieControllerller.login)
router.get("/list",pharmacieController.list)

router.post("/rendez_vous/",pharmacieController.createDose)
router.get("/rendez_vous/liste/:_id",pharmacieController.listeDose)

router.get("/rendez_vous/:_id",pharmacieController.listRdz)

module.exports = router;