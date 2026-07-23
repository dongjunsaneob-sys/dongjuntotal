const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

// dist/ 폴더에 배포용 정적 자산(admin, gif, 동영상 등)을 동기화.
// 소스가 dist보다 최신일 때만 복사해 매 저장마다 큰 파일(동영상 등)을 불필요하게 다시 쓰지 않는다.
function syncStaticAssetsToDist(distDir) {
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  const copyIfNewer = (src, dest) => {
    if (!fs.existsSync(src)) return;
    const srcStat = fs.statSync(src);
    if (fs.existsSync(dest)) {
      const destStat = fs.statSync(dest);
      if (destStat.mtimeMs >= srcStat.mtimeMs && destStat.size === srcStat.size) return;
    }
    fs.copyFileSync(src, dest);
  };

  ['admin.html', 'admin.css', 'admin.js', 'vercel.json',
   'demolition.gif', 'interior.gif', 'structure_demolition.gif', 'logo.jpg'].forEach(f => {
    copyIfNewer(path.join(PUBLIC_DIR, f), path.join(distDir, f));
  });

  const assetSrc = path.join(PUBLIC_DIR, 'design_handoff_onestop_landing');
  const assetDest = path.join(distDir, 'design_handoff_onestop_landing');
  if (fs.existsSync(assetSrc)) {
    if (!fs.existsSync(assetDest)) fs.mkdirSync(assetDest, { recursive: true });
    fs.readdirSync(assetSrc).forEach(file => {
      copyIfNewer(path.join(assetSrc, file), path.join(assetDest, file));
    });
  }
}

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // API Endpoint: Save directly to dist/ directory when user clicks "배포용 HTML 내보내기"
  if (req.method === 'POST' && reqUrl === '/api/save-dist') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const distDir = path.join(PUBLIC_DIR, 'dist');
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

        if (data.indexHtml) fs.writeFileSync(path.join(distDir, 'index.html'), data.indexHtml, 'utf8');
        if (data.interiorHtml) fs.writeFileSync(path.join(distDir, 'interior.html'), data.interiorHtml, 'utf8');

        syncStaticAssetsToDist(distDir);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, message: 'dist/ 폴더로 배포용 최적화 파일이 저장되었습니다.' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API Endpoint: 직접 연 index.html/interior.html에서, 또는 admin에서 "💾 저장하기"를 눌렀을 때
  // 편집한 내용을 실제 소스 파일(project 루트)과 배포용 dist/ 폴더 양쪽에 동일하게 저장해서
  // 새로고침해도 유지되고, 그대로 배포해도 방금 편집한 내용이 나가도록 한다.
  if (req.method === 'POST' && reqUrl === '/api/save-page') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const allowedPages = ['index.html', 'interior.html'];
        if (!allowedPages.includes(data.page)) {
          throw new Error('허용되지 않은 파일입니다: ' + data.page);
        }

        fs.writeFileSync(path.join(PUBLIC_DIR, data.page), data.html, 'utf8');

        const distDir = path.join(PUBLIC_DIR, 'dist');
        fs.writeFileSync(path.join(distDir, data.page), data.html, 'utf8');
        syncStaticAssetsToDist(distDir);

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, message: data.page + ' 파일이 프로젝트와 dist/ 폴더 양쪽에 저장되었습니다.' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  let filePath = path.join(PUBLIC_DIR, decodeURIComponent(reqUrl === '/' ? '/admin.html' : reqUrl));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType, 
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('\n====================================================');
  console.log(' ⚡ 원스톱 웹사이트 실시간 관리자 프로그램 가동 중!');
  console.log('====================================================');
  console.log(` • 브라우저 주소 : http://localhost:${PORT}/admin.html`);
  console.log(' • 편집 상태     : 실시간 미리보기 & 3D 모션 연동 100%');
  console.log('====================================================');
  console.log(' 이 창을 켜두신 상태에서 웹 편집을 진행하세요.\n');

  const openCmd = process.platform === 'win32' 
    ? `start http://localhost:${PORT}/admin.html` 
    : `open http://localhost:${PORT}/admin.html`;
  exec(openCmd);
});
