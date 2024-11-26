import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConnection.js';

const conexaoDbCloud = await conectarAoBanco(process.env.STRING_CONNECTION);
const db = conexaoDbCloud.db('imersao-back');
// Dados falsos que está localmente na aplicação para simular uma api:
// const mock = [
//     { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
//     { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
//     { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"},
// ];

// Funções relacionadas ao DB (MongoDB):
export async function selectAllPosts() 
{
    const collection = db.collection('posts');

    //retorna os registors da colecao em array dos objetos/registros
    return collection.find().toArray();
}

export async function insertPost(newPost)
{
    const collection = db.collection('posts');

    //retorna os registors da colecao em array dos objetos/registros
    return collection.insertOne(newPost);
}

export async function updatePostById(id, updatePost)
{
    const collection = db.collection('posts');

    const objID = ObjectId.createFromHexString(id); // etapa de acordo com a doc MongoDB

    return collection.updateOne({_id: new ObjectId(objID)}, {$set:updatePost});
}