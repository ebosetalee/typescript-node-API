import express from "express";
import { currentUser, createUser } from "../controllers/user";
import Auth from "../../middleware/auth";
import schema from "../validation-schema.js";
import validate from "../../middleware/validate.js";
import errorHandler from "../../middleware/error-handler";

const router = express.Router();
const { CREATE } = schema;

router.post("/", validate(CREATE), createUser)
router.get("/", Auth, currentUser);

express().use(errorHandler)

export default router;