import { Router } from "express"
import { vehicleController } from "./vehicle.controller"
import auth from "../../middleware/auth"
const router=Router()

router.post('/',auth("admin"),vehicleController.createVehicle)
router.get('/',vehicleController.getAllvehicles)
router.get('/:vehicleId',vehicleController.getvehicleById)
router.put('/:vehicleId',auth("admin","customer"),vehicleController.updateVehicleById)
router.delete('/:vehicleId',auth("admin"),vehicleController.deleteVehicleById)
export const vehicleRouter=router