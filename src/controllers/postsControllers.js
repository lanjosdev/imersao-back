import { selectAllPosts, insertPost, updatePostById } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
import fs from "fs";

// function getIdxPostByID(idPost) 
// {
//     return mock.findIndex(post=> post.id === Number(idPost));
// }
export async function readAllPosts(req, res) 
{
    try {
        const posts = await selectAllPosts();
    
        res.status(200).json(posts);
    }
    catch(error) {
        console.error(error);

        res.status(500).json({Erro: "Falha de execução"});
    }   
}

export async function createPost(req, res) 
{
    const newPost = req.body; //pega o corpo/conteudo da requisição

    try {
        const postCreated = await insertPost(newPost);

        res.status(200).json(postCreated);
    }
    catch(error) {
        console.error(error);

        res.status(500).json({Erro: "Falha de execução"});
    }
}

export async function uploadImage(req, res) 
{
    const newPost = {
        descricao: req.body.descricao,
        original_imagem: req.file.originalname,
        url_imagem: "",
        alt_imagem: req.body.alt_imagem
    };

    try {
        const postCreated = await insertPost(newPost); //enviado no MongoDB

        //Processo de modificar o nome original do arquivo vindo do client (req)
        const pathImageRename = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, pathImageRename); //Renomeia o arquivo desse caminho


        // A'tualiza já com url da imagem
        const BASE_URL = process.env.BASE_URL;

        const id = `${postCreated.insertedId}`;
        const urlImagem = `${BASE_URL}/${id}.png`;

        const updatePost = {
            descricao: req.body.descricao,
            original_imagem: req.file.originalname,
            url_imagem: urlImagem,
            alt_imagem: req.body.alt_imagem
        };
        
        const postUpdate = await updatePostById(id, updatePost);

        // res.status(200).json(postUpdate);
        res.status(200).json(postCreated);
    }
    catch(error) {
        console.error(error);

        res.status(500).json({Erro: "Falha de execução"});
    }
}

export async function updatePost(req, res) 
{
    const BASE_URL = process.env.BASE_URL;

    const id = req.params.id;
    const urlImagem = `${BASE_URL}/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricaoGemini = await gerarDescricaoComGemini(imageBuffer);

        const updatePost = {
            descricao: descricaoGemini,
            alt_imagem: req.body.alt_imagem
        };

        const postUpdate = await updatePostById(id, updatePost);

        res.status(200).json(postUpdate);
    }
    catch(error) {
        console.error(error);

        res.status(500).json({Erro: "Falha de execução"});
    }
}