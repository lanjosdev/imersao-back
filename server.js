import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Variaveis de inicialização da aplicação Express:
const app = express();
const port = 3000;

// Inicia a função de rotas:
routes(app);

// Inicia servidor com Express (app):
app.listen(port, ()=> {
    console.log(`Server ouvindo na porta ${port}`);
});