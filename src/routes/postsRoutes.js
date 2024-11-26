import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import cors from "cors";
import { readAllPosts, createPost, uploadImage, updatePost } from "../controllers/postsControllers.js"; // Importa as funções controladoras para lidar com a lógica dos posts

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function(req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
});

// Configuração de CORS:
const corsOptions = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
};

// Cria uma instância do middleware Multer
// const upload = multer({ storage: storage });
const upload = multer({ dest: "./uploads", storage });
// const upload = multer({ dest:"./uploads" }); //usado em linux e mac (sem a função storage)

// Define as rotas usando o objeto Express app
const routes = (app)=> {
    //Middwares:
    app.use(express.json()); // Faz com q essa aplicação Express só responda com dados já convertidos em JSON
    app.use(cors(corsOptions));

    // ROTAS:

    // Rota de pegar todos os posts (READ):
    app.get('/posts', readAllPosts);

    // app.get('/posts/:id', (req, res)=> {
    //     const idx = getIdxPostByID(req.params.id);
    //     res.status(200).json(mock[idx]);
    // });

    // Rota de criar um novo post (CREATE):
    app.post('/posts', createPost);




    // Rota de uploads de imagens:
    app.post('/upload', upload.single('file_image'), uploadImage);

    // Rota de update post/upload: (não atualiza o arquivo de imagem, dados textuais)
    app.put('/upload/:id', updatePost);
};
export default routes;