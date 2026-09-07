const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const decodedPath = decodeURIComponent(parsedUrl.pathname);
    let safePath = path.normalize(path.join(BASE_DIR, decodedPath));

    if (!safePath.startsWith(BASE_DIR)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Proibido');
      return;
    }

    // Arquivos que NUNCA podem ser servidos ao visitante.
    // leads.json guarda nome e telefone de pessoas reais: entrega-lo
    // publicamente contradiz a promessa de sigilo feita na pagina.
    const relativo = path.relative(BASE_DIR, safePath).split(path.sep).join('/');
    const BLOQUEADOS = ['leads.json', 'server.js', '.gitignore'];
    if (BLOQUEADOS.includes(relativo) || relativo.startsWith('.git') || /^leads-.*\.json$/.test(relativo)) {
      // 404 em vez de 403: nao confirma que o arquivo existe.
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Nao Encontrado');
      return;
    }

    // Lead collection endpoint
    if (parsedUrl.pathname === '/api/lead' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const lead = JSON.parse(body);
          lead.timestamp = new Date().toISOString();
          const leadsFile = path.join(BASE_DIR, 'leads.json');
          let leads = [];
          if (fs.existsSync(leadsFile)) {
            try {
              leads = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
              if (!Array.isArray(leads)) leads = [];
            } catch (e) {
              leads = [];
            }
          }
          leads.push(lead);
          fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true, count: leads.length }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      });
      return;
    }

    if (fs.existsSync(safePath) && fs.statSync(safePath).isDirectory()) {
      safePath = path.join(safePath, 'index.html');
    }

    if (!fs.existsSync(safePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Não Encontrado');
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(safePath);

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(content);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`500 Erro Interno: ${err.message}`);
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
