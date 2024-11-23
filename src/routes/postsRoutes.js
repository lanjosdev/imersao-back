import express from "express";
import { readAllPosts, createPost } from "../controllers/postsControllers.js";

const routes = (app)=> {
    app.use(express.json()); // Faz com q essa aplicação Express só responda com dados já convertidos em JSON

    // ROTAS:

    // Rota de pegar todos os posts (READ):
    app.get('/posts', readAllPosts);

    // Rota de criar um novo post (CREATE):
    app.post('/posts', createPost);

    // app.get('/posts/:id', (req, res)=> {
    //     const idx = getIdxPostByID(req.params.id);
    //     res.status(200).json(mock[idx]);
    // });
}
export default routes;