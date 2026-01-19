import { Router } from "express"
import { vehicleController } from "./vehicle.controller"
const router=Router()

router.post('/',vehicleController.createVehicle)
router.get('/',vehicleController.getAllvehicles)
router.get('/:vehicleId',vehicleController.getvehicleById)
export const vehicleRouter=router