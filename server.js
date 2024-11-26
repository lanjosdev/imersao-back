import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Variaveis de inicialização da aplicação Express:
const app = express();
const port = 3000;

app.use(express.static('uploads')); // deixa a pasta uploads publica ao acessar na url (serve arquivos desta pasta)

// Inicia a função de rotas:
routes(app);

// Inicia servidor com Express (app):
app.listen(port, ()=> {
    console.log(`Server ouvindo na porta ${port}`);
});