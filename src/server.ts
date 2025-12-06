import express, { Request, Response } from "express"
import initDB from "./config/db"
import { authrouter } from "./modules/auth/auth.route"
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

initDB()


app.use("/api/v1/auth",authrouter)

app.listen(port, () => {
  console.log(`Exampleaa app listening on port ${port}`)
})
