import express from "express";
import userRoutes from "../v1/routes/user";

const router = express.Router();

router.use("/user", userRoutes);

export default router;
