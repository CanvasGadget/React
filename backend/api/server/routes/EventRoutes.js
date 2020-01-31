//import { Router } from "express";
//import EventController from "../controllers/EventController";
const express = require("express");
var router = express.Router();
const EventController = require("../controllers/EventController");

//const router = Router();

router.get("/", EventController.getAll);
router.delete("/:id", EventController.deleteOne);
router.delete("/series/:id", EventController.deleteSeries);
router.post("/insert", EventController.insert);
router.put("/addnote", EventController.addNote);
router.put("/updatesole", EventController.updateSole);
// sessions left in the week
router.get("/sessionsleft", EventController.getSessionsLeftInWeek);
// total sessions in the week
router.get("/sessionsweek", EventController.totalSessionsInWeek);
// events for the current day
router.get("/curdaycal", EventController.curDayCal);
// router.post('/insert', EventController.insertOne)
//export default router;
module.exports = router;
