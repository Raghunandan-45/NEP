import express from "express";
import {config} from "dotenv";
import { connectDB,disconnectDB } from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import { Server } from "node:http";

config();
connectDB();

const app = express();

const PORT = 5001;

app.use("/movies",movieRoutes);

app.use("/hello", (req,res) =>{
    res.json({message:"HELLO WORLD~!"});
});

app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`);
});


//3 situations where graceful handling is useful

//1. Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) =>{
    console.error("Unhandled Rejection:",err);
    Server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    });
});

//2.Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception",err);
    await disconnectDB();
    process.exit(1);
});

//3.Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully!");
    Server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    });
});