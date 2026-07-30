import express from "express";
import {config} from "dotenv";
import { connectDB,disconnectDB } from "./config/db.js";

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchListRoutes from "./routes/watchlistRoutes.js";

import { Server } from "node:http";

config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5001;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// API Routes
app.use("/movies",movieRoutes);
app.use("/auth",authRoutes);
app.use("/watchList",watchListRoutes);

app.use("/hello", (req,res) =>{
    res.json({message:"HELLO WORLD~!"});
});

const server = app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`);
});


process.on("unhandledRejection", (err) =>{
    console.error("Unhandled Rejection:",err);
    Server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception",err);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully!");
    Server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    });
});