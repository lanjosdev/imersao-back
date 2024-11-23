import { selectAllPosts, insertPost } from "../models/postsModel.js";

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
    const newPost = req.body; //pega o crpo/conteudo da requisição

    try {
        const postCreated = await insertPost(newPost);

        res.status(200).json(postCreated);
    }
    catch(error) {
        console.error(error);

        res.status(500).json({Erro: "Falha de execução"});
    }
}