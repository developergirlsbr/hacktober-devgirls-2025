const express = require('express');
const app = express();
app.use(express.json());

let compras = [];
let id = 1;

// GET - retorna todos os itens
app.get('/compras', (req, res) => {
  res.json(compras);
});

// POST - adiciona um novo item
app.post('/compras', (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' });
  }

  // verifica duplicado
  const existe = compras.find(item => item.nome.toLowerCase() === nome.toLowerCase());
  if (existe) {
    return res.status(400).json({ erro: 'Item já existe na lista' });
  }

  const novoItem = {
    id: id++,
    nome,
    criadoEm: new Date(),
    atualizadoEm: new Date()
  };
  compras.push(novoItem);
  res.status(201).json(novoItem);
});

// PUT - atualiza um item
app.put('/compras/:id', (req, res) => {
  const item = compras.find(c => c.id == req.params.id);
  if (!item) {
    return res.status(404).json({ erro: 'Item não encontrado' });
  }

  const { nome } = req.body;
  if (nome) item.nome = nome;
  item.atualizadoEm = new Date();
  res.json(item);
});

// DELETE - remove um item
app.delete('/compras/:id', (req, res) => {
  const index = compras.findIndex(c => c.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Item não encontrado' });
  }
  compras.splice(index, 1);
  res.status(204).send();
});

// servidor
app.listen(3000, () => console.log('🚀 API rodando em http://localhost:3000'));
