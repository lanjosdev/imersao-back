import express from "express";
import { responseAllPosts } from "../controllers/postsControllers.js";

const routes = (app)=> {
    app.use(express.json()); // Faz com q essa aplicação Express só responda com dados já convertidos em JSON

    // Routas de Posts:
    app.get('/posts', responseAllPosts);

    // app.get('/posts/:id', (req, res)=> {
    //     const idx = getIdxPostByID(req.params.id);
    //     res.status(200).json(mock[idx]);
    // });
}
export default routes;