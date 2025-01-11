require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const conatactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utlis/db");
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
    origin:"https://mern2024-frontend-1.onrender.com",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", conatactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);


const PORT = 5000;

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at port: ${PORT}`);
    });
})

