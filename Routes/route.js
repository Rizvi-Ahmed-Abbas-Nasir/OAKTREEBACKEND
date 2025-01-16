import express from "express";
const router = express.Router();

import { contactMail } from "../Controllers/Contact.js";
import { AskMeQuestion } from "../Controllers/AskMeQuestion.js";


router.post('/sendContactForm', contactMail)
router.get("/sendContactForm", (req, res) => {
    res.json({
      status: "success for contact ",
      message: "Server is running",
    });
  });
  router.post('/SendASK', AskMeQuestion);
  router.get("/SendASK", (req, res) => {
    res.json({
      status: "success for JOB",
      message: "Server is running",
    });
  });
  


export default router;
