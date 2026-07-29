import { stat } from "node:fs";
import { prisma } from "../config/db.js";

const addToWatchList = async (req,res) =>{
    const {movieId,status,rating,notes} = req.body;

    const movie = await prisma.movie.findUnique({
        where: {id: movieId},
    });

    if(!movie){
        return res.status(401).json({error:"Movie not found!"});
    }

    const existInWatchList = await prisma.watchListItems.findUnique({
        where: 
            {userId_movieId:{
                userId:req.user.id,
                movieId:movieId,
            }},
    });

    if(existInWatchList){
        return res.status(404).json({error:"Movie already in watchlist!"});
    }

    const watchListItem = await prisma.watchListItems.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });

    res.status(201).json({
        status:"success",
        data:{
            watchListItem,
        },
    });


};

export {addToWatchList};
