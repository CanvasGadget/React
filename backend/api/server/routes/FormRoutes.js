// import { Router } from "express";
const express = require("express");
var router = express.Router();
const FormController = require("../controllers/FormController");
//import FormController from "../controllers/FormController";

//const router = Router();

router.get("/", FormController.getAllForms);

//export default router;
module.exports = router;
