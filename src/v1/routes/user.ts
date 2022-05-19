import express from "express";
import { currentUser, createUser } from "@controller/user";
import Auth from "@root/middleware/auth";
import schema from "../validation-schema";
import validate from "@root/middleware/validate";

const router = express.Router();
const { CREATE } = schema;

router.post("/", validate(CREATE), createUser)
router.get("/", Auth, currentUser);


export default router;