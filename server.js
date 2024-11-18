import express from "express";

const app = express();

app.listen(3000, ()=> {
    console.log('Server escutando...');
});

// Rotas da API:
app.get('/api', (req, res)=> {
    res.status(200).send("Olá Mundo, aqui é uma API!");
});