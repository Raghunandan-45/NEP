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


const removeFromWatchlist = async (req,res) =>{
    const watchListItem = await prisma.watchListItems.findUnique({
        where: {id: req.params.id},
    });

    if(!watchListItem){
        return res.status(404).json({error:"Watchlistitem not found!"});
    }

    if(watchListItem.userId !== req.user.id){
        return res.status(403).json({error:"Not allowed to update this watchlist item"});
    }

    await prisma.watchListItems.delete({
        where: {id: req.params.id},
    });

    res.status(200).json({
        status: "success",
        message: "Movie removed from watchlist",
    });
};

const updateInWatchList = async (req,res) =>{
    const { status, rating, notes} = req.body;

    const watchListItem = await prisma.watchListItems.findUnique({
        where: {id: req.params.id},
    })

    if(!watchListItem){
        return res.status(404).json({error:"WatchListItem not found!"});
    }

    if(watchListItem.userId !== req.user.id){
        return res.status(403).json({error:"Not allowed to update this watchlist"});
    }

    const updateData = {};
    if(status !== undefined) updateData.status = status.toUpperCase();
    if(rating !== undefined) updateData.rating = rating;
    if(notes !== undefined) updateData.notes = notes;

    const updatedItem = await prisma.watchListItems.update({
        where: {id: req.params.id},
        data: updateData,
    });

    res.status(200).json({
        status:"success",
        data:{
            watchListItem:updatedItem,
        },
    });
};

export {addToWatchList, removeFromWatchlist, updateInWatchList};
