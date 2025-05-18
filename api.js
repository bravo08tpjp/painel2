const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 10000;

// Rota inicial para exibir o HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // <-- arquivo HTML na raiz
});

app.get('/info-kkgr', (req, res) => {
  res.sendFile(path.join(__dirname, 'info.html')); // <-- arquivo HTML na raiz
});

app.get('/api/grupos', (req, res) => {
  fs.readFile('./grupos.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ erro: 'Erro ao ler os grupos' });
    try {
      const grupos = JSON.parse(data);
      res.json(grupos);
    } catch (e) {
      res.status(500).json({ erro: 'Erro ao parsear JSON' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando: http://localhost:${PORT}`);
});
