import conectarAoBanco from '../config/dbConnection.js';

const conexaoDbCloud = await conectarAoBanco(process.env.STRING_CONNECTION);
const db = conexaoDbCloud.db('imersao-back');
// Dados falsos que está localmente na aplicação para simular uma api:
// const mock = [
//     { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
//     { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
//     { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.com/millie/300/150"},
// ];

// Funções relacionadas ao DB:
export async function getAllPosts() 
{
    const collection = db.collection('posts');

    //retorna os registors da colecao em array de objetos/registros
    return collection.find().toArray();
}