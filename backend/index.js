import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import Book from './models/bookModel.js'
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

// Middleware for parsing request body
const app = express();

//Middleware for handling CORS Policy
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET' , 'POST' , 'PUT' , 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.use(express.json());

app.get('/', (request,response) => {
    console.log(request)
    return response.status(234).send('Welcome to laptop')
});


app.use('/books', bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT , () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });