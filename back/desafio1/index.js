const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Lista de compras na memória
let compras = [];
let nextId = 1;

// Função para obter timestamp
const now = () => new Date().toISOString();

// GET /compras → retorna todos os itens
app.get('/compras', (req, res) => {
    const { ordenarPor } = req.query; // ex: ?ordenarPor=nome ou ?ordenarPor=data
    let resultado = [...compras];

    if (ordenarPor === 'nome') {
        resultado.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (ordenarPor === 'data') {
        resultado.sort((a, b) => new Date(a.criadoEm) - new Date(b.criadoEm));
    }

    res.json(resultado);
});

// POST /compras → adiciona um novo item
app.post('/compras', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: 'O campo "nome" é obrigatório' });
    }

    // Validação de duplicado
    const existente = compras.find(item => item.nome.toLowerCase() === nome.toLowerCase());
    if (existente) {
        return res.status(400).json({ erro: 'Item já existe na lista' });
    }

    const novoItem = {
        id: nextId++,
        nome,
        criadoEm: now(),
        atualizadoEm: now()
    };

    compras.push(novoItem);
    res.status(201).json(novoItem);
});

// PUT /compras/:id → atualiza um item existente
app.put('/compras/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;

    const item = compras.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({ erro: 'Item não encontrado' });
    }

    if (!nome) {
        return res.status(400).json({ erro: 'O campo "nome" é obrigatório' });
    }

    // Validação de duplicado
    const duplicado = compras.find(i => i.nome.toLowerCase() === nome.toLowerCase() && i.id !== id);
    if (duplicado) {
        return res.status(400).json({ erro: 'Outro item com este nome já existe' });
    }

    item.nome = nome;
    item.atualizadoEm = now();

    res.json(item);
});

// DELETE /compras/:id → remove um item
app.delete('/compras/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = compras.findIndex(i => i.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Item não encontrado' });
    }

    const removido = compras.splice(index, 1);
    res.json(removido[0]);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API de compras rodando em http://localhost:${port}`);
});
