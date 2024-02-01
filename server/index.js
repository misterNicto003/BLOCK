import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";


dotenv.config();

const app = express();

app.use('/api', authRoute )

const URL = process.env.URL
mongoose.connect(URL)
    .then(() => console.log('Подключены к БД...'))
    .catch((err) => console.log(err))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Серевер запущен на порте ${PORT}...`)
})                   