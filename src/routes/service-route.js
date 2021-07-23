import express from "express";
import serviceController from "../controllers/service-controller"

const router = express.Router();

router.get('/', serviceController.getServices);

router.post('/add', serviceController.addServices);

router.put('/update/:id', serviceController.updateServices);

router.delete('/delete/:id', serviceController.deleteServices);

module.exports = router;
 