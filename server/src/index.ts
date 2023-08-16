import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import dotenv from 'dotenv';
import exceptionHandler from "./middlewares/error"
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(limiter)
app.use(helmet())
app.use('/api', todoRoutes)
app.use(exceptionHandler);

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todolist.1vzsfkk.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })
