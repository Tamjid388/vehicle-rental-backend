import express, { Request, Response } from "express"
import initDB from "./config/db"
import { authrouter } from "./modules/auth/auth.route"
import { vehicleRouter } from "./modules/vehicles/verhicle.route"
import { usersRouter } from "./modules/users/users.route"
import { bookingsRouter } from "./modules/bookings/bookings.route"
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

initDB()


app.use("/api/v1/auth",authrouter)
app.use("/api/v1/vehicles",vehicleRouter)
app.use("/api/v1/users",usersRouter)
app.use("/api/v1/bookings",bookingsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
