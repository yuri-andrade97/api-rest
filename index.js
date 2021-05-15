const express = require('express');
const app = express();

app.use(express.json());

const livros = [
    {
        id: 1,
        titulo: "Porque fazemos oque fazemos",
        autor: "Mauro Sérgio Cortella",
        ano: 2011,
        numPaginas: 297
    },
    {
        id: 2,
        titulo: "50 tons de cinza",
        autor: "Claire Crawling",
        ano: 2014,
        numPaginas: 446
    }
];




app.get("/livros", (req, res) => {
    res.json(livros);
});

app.get("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const buscarID = livros.find(livro => livro.id === id);
    
    if(!id) {
        res.json({
            "mensagem": "O valor do parâmetro ID da URL não é um número válido."
        });
    } else if(!buscarID) {
        res.json({
            "mensagem": "Não existe livro para o ID informado."
        });
    }
    res.json(buscarID)
    
});

app.post("/livros", (req, res) => {
    let proximoID = livros[livros.length - 1].id + 1;
    const novoLivro = {
        id: proximoID,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        numPaginas: req.body.numPaginas
    };

    livros.push(novoLivro);
    res.json(novoLivro);
});

app.put("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const buscarID = livros.find(livro => livro.id === id);

    if(buscarID) {
        buscarID.titulo =  req.body.titulo;
        buscarID.autor = req.body.autor;
        buscarID.ano = req.body.ano;
        buscarID.numPaginas = Number(req.body.numPaginas);

        res.json({
            "mensagem": "Livro Substituido."
        });
    }

    res.json({
        "mensagem": "Não existe livro a ser substituído para o ID informado."
    });
});

app.patch("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const buscarID = livros.find(livro => livro.id === id);

    if(buscarID) {
        if(req.body.titulo) {
            buscarID.titulo = req.body.titulo;
        }

        if(req.body.autor) {
            buscarID.autor = req.body.autor;
        }

        if(req.body.ano) {
            buscarID.ano = req.body.ano;
        }

        if(req.body.numPaginas) {
            buscarID.numPaginas = req.body.numPaginas;
        }

        res.json({
            "mensagem": "Livro Alterado ."
        });
    } 

    res.json({
        "mensagem": "Não existe livro a ser alterado para o ID informado."
    })

});

app.delete("/livros/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = livros.findIndex(livro => livro.id === id);

    if(indice !== -1) {
        livros.splice(indice, 1);
        res.json({
            "mensagem": "Livro Removido"
        });
    }

    res.json({
        "mensagem": "Não existe livro a ser removido para o ID informado."
    });

});

app.listen(8000);