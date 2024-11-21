import { getAllPosts } from "../models/postsModel.js";

// function getIdxPostByID(idPost) 
// {
//     return mock.findIndex(post=> post.id === Number(idPost));
// }
export async function responseAllPosts(req, res) 
{
    const posts = await getAllPosts();
    
    res.status(200).json(posts);    
}