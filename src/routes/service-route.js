import express from "express";
import {
  getServices,
  addServices,
  updateServices,
  deleteServices,
} from "../controllers/service-controller.js";

const router = express.Router();

router.get("/", getServices);

router.post("/add", addServices);

router.put("/update/:id", updateServices);

router.delete("/delete/:id", deleteServices);

export default router;
