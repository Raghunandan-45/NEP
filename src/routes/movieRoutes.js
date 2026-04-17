import express from "express";
const router  = express.Router();

router.get("/",(req,res)=>{
    res.json({httpmethod:"get"});
});

router.post("/",(req,res)=>{
    res.json({httpmethod:"post"});
});

router.put("/",(req,res)=>{
    res.json({httpmethod:"put"});
});

router.patch("/",(req,res)=>{
    res.json({httpmethod:"patch"});
});

export default router;
