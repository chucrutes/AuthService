import express from 'express';
import { router } from './routes';
import cors from 'cors'
const app = express()
const mongoose = require('mongoose')

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/authservicedb",
  )
  .then(() => {
    console.log('🔥 Running on Port 4001! 🔥')
    app.listen(4001)
  })
  .catch((err) => console.log(err))

app.use(cors({
  origin: '*'
}))

app.use(express.json())
app.use(router)
