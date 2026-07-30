// 구글 드라이브 파일(id)을 서비스 계정 권한으로 대신 받아와 그대로 스트리밍한다.
// 드라이브 폴더를 "링크가 있는 모든 사용자"로 공개하지 않아도, 서비스 계정에만 공유해두면 동작한다.
const { getAccessToken } = require('./_lib/driveAuth');

module.exports = async (req, res) => {
  try {
    const id = req.query && req.query.id;
    if (!id) {
      res.status(400).send('id required');
      return;
    }

    const token = await getAccessToken();
    const driveResp = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!driveResp.ok) {
      res.status(502).send('이미지를 불러오지 못했습니다');
      return;
    }

    const contentType = driveResp.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await driveResp.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');
    res.status(200).send(buffer);
  } catch (err) {
    console.error('drive-image error:', err);
    res.status(500).send('서버 오류');
  }
};
