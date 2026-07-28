import { PrismaClient } from "@prisma/client";
import dotnenv from "dotenv"
dotnenv.config();

const prisma = new PrismaClient();

const creatorId = process.env.CREATOR_ID;

const movies = [
    {
    title: "The Dark Knight",
    overview: "Batman faces the Joker, a chaotic criminal who pushes Gotham to its limits.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/the-dark-knight.jpg",
    createdBy: creatorId,
    },
    {
    title: "Inception",
    overview: "A skilled thief enters dreams to steal secrets but is tasked with planting an idea instead.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: creatorId,
    },
    {
    title: "Interstellar",
    overview: "A group of astronauts travels through a wormhole in search of humanity's new home.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: creatorId,
    },
    {
    title: "The Prestige",
    overview: "Two rival magicians become consumed by obsession and sacrifice in their quest for the ultimate illusion.",
    releaseYear: 2006,
    genres: ["Drama", "Mystery", "Sci-Fi"],
    runtime: 130,
    posterUrl: "https://example.com/the-prestige.jpg",
    createdBy: creatorId,
    },
    {
    title: "Memento",
    overview: "A man with short-term memory loss investigates his wife's murder using notes and tattoos.",
    releaseYear: 2000,
    genres: ["Mystery", "Thriller"],
    runtime: 113,
    posterUrl: "https://example.com/memento.jpg",
    createdBy: creatorId,
    },
    {
    title: "Dunkirk",
    overview: "Allied soldiers struggle to survive and escape during the Dunkirk evacuation in World War II.",
    releaseYear: 2017,
    genres: ["Action", "Drama", "History"],
    runtime: 106,
    posterUrl: "https://example.com/dunkirk.jpg",
    createdBy: creatorId,
    },
    {
    title: "Oppenheimer",
    overview: "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
    releaseYear: 2023,
    genres: ["Biography", "Drama", "History"],
    runtime: 180,
    posterUrl: "https://example.com/oppenheimer.jpg",
    createdBy: creatorId,
    },
    {
    title: "Batman Begins",
    overview: "Bruce Wayne returns to Gotham to become Batman and confront the city's criminal underworld.",
    releaseYear: 2005,
    genres: ["Action", "Crime", "Drama"],
    runtime: 140,
    posterUrl: "https://example.com/batman-begins.jpg",
    createdBy: creatorId,
    },
    {
    title: "The Dark Knight Rises",
    overview: "Batman returns from exile to stop Bane from destroying Gotham City.",
    releaseYear: 2012,
    genres: ["Action", "Drama", "Thriller"],
    runtime: 164,
    posterUrl: "https://example.com/the-dark-knight-rises.jpg",
    createdBy: creatorId,
    },
    {
    title: "Tenet",
    overview: "A secret agent manipulates the flow of time to prevent global catastrophe.",
    releaseYear: 2020,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 150,
    posterUrl: "https://example.com/tenet.jpg",
    createdBy: creatorId,
    },
];

const main =  async() =>{
    console.log("Seeding movies...");

    for(const movie of movies){
        await prisma.movie.create({
            data:movie,
        });

        console.log(`Created movie: ${movie.title}`);
    }

    console.log("Seeding complete!");
}

main().catch((err)=>{
    console.error(err);
    process.exit(1);
}).finally(async() =>{
    await prisma.$disconnect();
})

