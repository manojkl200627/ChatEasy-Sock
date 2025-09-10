import express from "express"
import {addMessage,getMessages} from "../controller/MessControl.js"
const messRoute = express.Router()
messRoute.post("/addmsg/", addMessage);
messRoute.post("/getmsg/", getMessages);

export default messRoute