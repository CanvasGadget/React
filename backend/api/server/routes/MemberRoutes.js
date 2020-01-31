//import { Router } from "express";
const express = require("express");
var router = express.Router();
//import MemberController from "../controllers/MemberController";
const MemberController = require("../controllers/MemberController");

//const router = Router();

router.get("/", MemberController.getAllMembers);
router.get("/active", MemberController.getActiveMembers);
router.get("/getTherapists", MemberController.getActiveTherapistsDropDown);
router.post("/addmember", MemberController.addMember);
router.put("/updatememberinfo", MemberController.updateMemberInfo);
router.put("/updatememberpriv", MemberController.updateMemberPriv);
router.put("/assignclient", MemberController.assiCli);

//export default router;
module.exports = router;
