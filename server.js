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

function sanitizeHtmlForDist(html) {
  if (!html) return '';
  let clean = html.replace(/const\s+EDIT_MODE\s*=\s*[\s\S]*?;/g, 'const EDIT_MODE = false;');
  clean = clean.replace(/\s*contenteditable\s*=\s*"(?:true|false)"/gi, '');
  clean = clean.replace(/\s*contenteditable\b/gi, '');
  clean = clean.replace(/\s*title\s*=\s*"✏️[^"]*"/gi, '');
  clean = clean.replace(/\s*title\s*=\s*"클릭하여[^"]*"/gi, '');
  clean = clean.replace(/<style[^>]*id="visual-editor-style"[^>]*>[\s\S]*?<\/style>/gi, '');
  clean = clean.replace(/<input[^>]*id="visual-editor-file-input"[^>]*\/?>/gi, '');
  clean = clean.replace(/<div[^>]*class="[^"]*floating-export-bar[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  clean = clean.replace(/<div[^>]*class="[^"]*admin-toast-notif[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  // 블록 단위 자유 편집(순서 이동·복제·삭제) 툴바 — 편집 화면 전용이므로 배포본에서는 제거.
  // 이 div 안에는 span/button만 있고 중첩 </div>가 없으므로 비탐욕 정규식으로 안전하게 잘린다.
  clean = clean.replace(/<div[^>]*class="[^"]*block-ctrl-bar[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  clean = clean.replace(/\s*data-block-ctrl-bound\s*=\s*"[^"]*"/gi, '');
  return clean;
}

// dist/ 폴더에 배포용 정적 자산(gif, 동영상, 이미지 등)을 동기화.
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

  ['vercel.json', 'responsive.css', 'typography.css', 'robots.txt', 'sitemap.xml',
   'demolition.gif', 'interior.gif', 'structure_demolition.gif', 'logo.jpg', 'favicon.ico',
   'logo_video.mp4', 'promo_video.mp4'].forEach(f => {
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

  // interior.html 등에서 쓰는 실제 시공 사진(photos/interior/*.jpg)을 dist/로 동기화
  const photosSrc = path.join(PUBLIC_DIR, 'photos', 'interior');
  const photosDest = path.join(distDir, 'photos', 'interior');
  if (fs.existsSync(photosSrc)) {
    if (!fs.existsSync(photosDest)) fs.mkdirSync(photosDest, { recursive: true });
    fs.readdirSync(photosSrc).forEach(file => {
      copyIfNewer(path.join(photosSrc, file), path.join(photosDest, file));
    });
  }

  // floor-demolition.html 등에서 쓰는 실제 현장 영상(videos/*.mp4)을 dist/로 동기화
  const videosSrc = path.join(PUBLIC_DIR, 'videos');
  const videosDest = path.join(distDir, 'videos');
  if (fs.existsSync(videosSrc)) {
    if (!fs.existsSync(videosDest)) fs.mkdirSync(videosDest, { recursive: true });
    fs.readdirSync(videosSrc).forEach(file => {
      copyIfNewer(path.join(videosSrc, file), path.join(videosDest, file));
    });
  }

  // 구글 드라이브 무빙 갤러리 자동 등록용 서버리스 함수(/api)를 dist/로 재귀 동기화
  const copyDirRecursive = (srcDir, destDir) => {
    if (!fs.existsSync(srcDir)) return;
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.readdirSync(srcDir, { withFileTypes: true }).forEach(entry => {
      const s = path.join(srcDir, entry.name);
      const d = path.join(destDir, entry.name);
      if (entry.isDirectory()) copyDirRecursive(s, d);
      else copyIfNewer(s, d);
    });
  };
  copyDirRecursive(path.join(PUBLIC_DIR, 'api'), path.join(distDir, 'api'));

  // ★ 배포가 "가끔 안 되는" 것처럼 보이는 원인 하나 ★
  // deployToVercelInBackground() 는 dist/ 안에서 `npx vercel --prod --yes` 를 실행한다.
  // 그런데 dist/.vercel/project.json (=이 폴더가 어느 Vercel 프로젝트인지 알려주는
  // 연결 파일)이 없으면, vercel CLI 는 어느 프로젝트에 배포할지 알 수 없다.
  // dist/ 는 통째로 재생성될 수 있는 빌드 산출물이라 이 연결 파일이 쉽게 유실될 수
  // 있으므로, 매 빌드마다 프로젝트 루트의 연결 정보로 다시 채워 넣는다.
  const vercelLinkSrc = path.join(PUBLIC_DIR, '.vercel', 'project.json');
  const vercelLinkDestDir = path.join(distDir, '.vercel');
  if (fs.existsSync(vercelLinkSrc)) {
    if (!fs.existsSync(vercelLinkDestDir)) fs.mkdirSync(vercelLinkDestDir, { recursive: true });
    copyIfNewer(vercelLinkSrc, path.join(vercelLinkDestDir, 'project.json'));
  }

  // dist/ 폴더에 혹시 남아있을 수 있는 어드민 관련 파일(admin.*) 제거
  ['admin.html', 'admin.css', 'admin.js'].forEach(adminFile => {
    const p = path.join(distDir, adminFile);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch(e){}
    }
  });
}

function buildDistFiles() {
  const distDir = path.join(PUBLIC_DIR, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  ['index.html', 'interior.html', 'floor-demolition.html', 'survey.html', 'waste.html'].forEach(page => {
    const srcPath = path.join(PUBLIC_DIR, page);
    if (fs.existsSync(srcPath)) {
      const raw = fs.readFileSync(srcPath, 'utf8');
      const clean = sanitizeHtmlForDist(raw);
      fs.writeFileSync(path.join(distDir, page), clean, 'utf8');
    }
  });

  syncStaticAssetsToDist(distDir);
  console.log('✅ 배포용 dist/ 폴더 최적화 빌드 완료 (편집 도구 및 어드민 제거됨)');
}

if (process.argv.includes('--build-dist')) {
  buildDistFiles();
  process.exit(0);
}

// ★ "배포까지 되는 부분을 확실하게" 요청에 대한 대응 ★
// 예전에는 여기서 exec() 를 실행만 해두고, 성공이든 실패든 결과를 서버를 띄운
// 터미널 창(콘솔)에만 찍었다. 브라우저의 관리자 화면은 파일 저장이 끝나는 즉시
// "Vercel 자동 배포가 시작되었습니다"라고만 보여줬을 뿐, 그 배포가 실제로
// 성공했는지는 전혀 확인하지 않고 늘 낙관적으로 표시했다 — 배포가 실패해도
// 사용자는 알 방법이 없었다. 이제 결과를 dist/ 바깥의 상태 파일에 기록하고,
// /api/deploy-status 로 조회할 수 있게 해서 admin.js가 실제 결과를 화면에 띄운다.
const DEPLOY_STATUS_PATH = path.join(PUBLIC_DIR, 'deploy-status.json');

function writeDeployStatus(status) {
  try {
    fs.writeFileSync(DEPLOY_STATUS_PATH, JSON.stringify(status, null, 2), 'utf8');
  } catch (e) {
    console.error('배포 상태 파일 기록 실패:', e.message);
  }
}

function deployToVercelInBackground() {
  const distDir = path.join(PUBLIC_DIR, 'dist');
  const startedAt = Date.now();
  
  if (process.env.ENABLE_VERCEL_DEPLOY !== 'true') {
    const msg = '로컬 파일 수정 전용 모드입니다. 웹사이트 외부 업로드를 건너뜁니다.';
    console.log('\n💾 [로컬 저장 완료] 파일이 project/ 및 project/dist/ 에 정상 저장되었습니다. (웹사이트 업로드 제외)');
    writeDeployStatus({ state: 'skipped', startedAt, finishedAt: Date.now(), message: msg, log: '' });
    return;
  }

  console.log('\n🚀 [Vercel 자동 배포 진행 중...] 수정사항을 라이브 서버에 반영하고 있습니다...');
  writeDeployStatus({ state: 'pending', startedAt, finishedAt: null, message: '배포 진행 중', log: '' });

  const linkFile = path.join(distDir, '.vercel', 'project.json');
  if (!fs.existsSync(linkFile)) {
    const msg = 'dist/.vercel/project.json 이 없어 배포를 건너뜁니다.';
    console.error('❌ [Vercel 자동 배포 건너뜀]:', msg);
    writeDeployStatus({ state: 'error', startedAt, finishedAt: Date.now(), message: msg, log: '' });
    return;
  }

  exec('npx vercel --prod --yes', { cwd: distDir, timeout: 180000 }, (err, stdout, stderr) => {
    const finishedAt = Date.now();
    const log = (String(stdout || '') + '\n' + String(stderr || '')).trim().slice(-4000);
    if (err) {
      console.error('❌ [Vercel 자동 배포 실패]:', err.message);
      if (log) console.error(log);
      writeDeployStatus({ state: 'error', startedAt, finishedAt, message: err.message, log });
    } else {
      const urlMatch = log.match(/https:\/\/\S+\.vercel\.app\S*/);
      console.log('✅ [Vercel 자동 배포 완료] 라이브 웹사이트(도메인)에 수정사항이 즉시 반영되었습니다!\n');
      writeDeployStatus({ state: 'success', startedAt, finishedAt, message: '배포 완료', url: urlMatch ? urlMatch[0] : null, log });
    }
  });
}


function requestHandler(req, res) {
  let reqUrl = req.url.split('?')[0];

  if (req.method === 'GET' && reqUrl === '/api/deploy-status') {
    fs.readFile(DEPLOY_STATUS_PATH, 'utf8', (err, content) => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      if (err) { res.end(JSON.stringify({ state: 'unknown', message: '아직 배포 기록이 없습니다.' })); return; }
      res.end(content);
    });
    return;
  }

  // 네이버 블로그 RSS → 현장 작업사진 목록 (배포 시에는 Vercel의 api/blog-posts.js가 같은 역할)
  if (req.method === 'GET' && reqUrl === '/api/blog-posts') {
    require('./api/blog-posts.js')(req, res);
    return;
  }

  if (req.method === 'POST' && reqUrl === '/api/save-dist') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const distDir = path.join(PUBLIC_DIR, 'dist');
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

        if (data.indexHtml) fs.writeFileSync(path.join(distDir, 'index.html'), sanitizeHtmlForDist(data.indexHtml), 'utf8');
        if (data.interiorHtml) fs.writeFileSync(path.join(distDir, 'interior.html'), sanitizeHtmlForDist(data.interiorHtml), 'utf8');

        syncStaticAssetsToDist(distDir);
        deployToVercelInBackground();

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, message: 'dist/ 폴더로 배포용 최적화 파일이 저장되었습니다.' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && reqUrl === '/api/save-page') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const allowedPages = ['index.html', 'interior.html', 'floor-demolition.html', 'survey.html', 'waste.html'];
        if (!allowedPages.includes(data.page)) {
          throw new Error('허용되지 않은 파일입니다: ' + data.page);
        }

        fs.writeFileSync(path.join(PUBLIC_DIR, data.page), data.html, 'utf8');
        buildDistFiles();
        deployToVercelInBackground();

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, message: data.page + ' 원본 및 dist/ 배포용 파일 전체 저장 완료!' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  let decodedPath = reqUrl === '/' ? '/index.html' : reqUrl;
  try {
    decodedPath = decodeURIComponent(decodedPath);
  } catch(e) {}

  let filePath = path.join(PUBLIC_DIR, decodedPath);
  // 배포 사이트처럼 확장자 없는 주소(/interior, /index 등)와 폴더 주소(/)도 열리게 처리
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) filePath += '.html';
  else if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 
      'Content-Type': contentType, 
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500);
        res.end('Server Error');
      }
    });
    stream.pipe(res);
  });
}

function startServerOnFreePort(handler, ports) {
  function tryPort(index) {
    if (index >= ports.length) {
      console.error('❌ 사용 가능한 포트를 찾지 못했습니다.');
      return;
    }
    const port = ports[index];
    const srv = http.createServer(handler);
    srv.on('error', (err) => {
      if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        console.log(`⚠️ 포트 ${port} 사용 불가 (${err.code}). 다음 포트로 재시도합니다...`);
        tryPort(index + 1);
      } else {
        console.error('서버 오류:', err);
      }
    });

    srv.listen(port, '0.0.0.0', () => {
      console.log('\n====================================================');
      console.log(' ⚡ 원스톱 웹사이트 실시간 서버가 성공적으로 가동되었습니다!');
      console.log('====================================================');
      console.log(` • 메인 사이트   : http://localhost:${port}/index.html`);
      console.log(` • 실시간 관리자 : http://localhost:${port}/admin.html`);
      console.log('====================================================');
      console.log(' 이 창을 켜두신 상태에서 웹 편집을 진행하세요.\n');
    });
  }

  tryPort(0);
}

const PREFERRED_PORTS = [8000, 8888, 9000, 3000, 5000];
startServerOnFreePort(requestHandler, PREFERRED_PORTS);


