import express, { json } from 'express';
import conectaNaDatabase from "./config/dbConnect.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
    console.log("Erro de  conexão", erro)
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})


const app = express();
app.use(express.json());


const livros = [
    {
        id: 1,
        título: "O Senhor dos Anéis"
    },
    {
        id: 2,
        título: "O Hobbit"
    }
];

function getLivros(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id)
    })
}

app.get("/", (req, res) => {
    res.status(200).send("Curso de Noje.js");
});

app.get("/livros/:id", (req, res) => {
    const index = getLivros(req.params.id)
    res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso.")
});

app.put("/livros/:id", (req, res) => {
    const index = getLivros(req.params.id)
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
});

app.delete('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send('Livro removido com sucesso.');
});



export default app;