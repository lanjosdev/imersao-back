import express from "express";
import conectarAoBanco from "./src/config/dbConnection.js";

await conectarAoBanco(process.env.STRING_CONNECTION);

// Dados falsos que está localmente na aplicação para simular uma api:
const mock = [
    { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
    { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
    { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"},
];


// Variaveis de inicialização da aplicação Express:
const app = express();
app.use(express.json()); // Faz com q essa aplicação Express só responda com dados já convertidos em JSON
const port = 3000;

// Inicia servidor com Express (app):
app.listen(port, ()=> {
    console.log(`Server ouvindo na porta ${port}`);
});


// Funções:
function getIdxPostByID(idPost) 
{
    return mock.findIndex(post=> post.id === Number(idPost));
}


// Rotas/Endpoints da API:
app.get('/posts', (req, res)=> {
    res.status(200).json(mock);
});

app.get('/posts/:id', (req, res)=> {
    const idx = getIdxPostByID(req.params.id);
    res.status(200).json(mock[idx]);
});