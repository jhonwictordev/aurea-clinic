const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp' };
const server = http.createServer((req,res) => {
  const clean = decodeURIComponent((req.url || '/').split('?')[0]);
  const requested = clean === '/' ? '/index.html' : clean;
  const file = path.resolve(root, '.' + requested);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err,data) => {
    if (err) { res.writeHead(err.code === 'ENOENT' ? 404 : 500); return res.end(err.code === 'ENOENT' ? 'Not found' : 'Server error'); }
    res.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    res.end(data);
  });
});
server.listen(5173, '127.0.0.1', () => console.log('Auréa preview listening on http://127.0.0.1:5173'));
