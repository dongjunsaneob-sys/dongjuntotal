// 구글 드라이브 부모 폴더(DRIVE_PARENT_FOLDER_ID) 아래의 하위 폴더들을 읽어,
// 각 하위 폴더명을 캡션(제목)으로, 그 안의 이미지들을 무빙 갤러리 항목으로 반환한다.
// 실패하거나 환경변수가 없으면 빈 배열을 반환해 사이트가 깨지지 않게 한다.
const { getAccessToken } = require('./_lib/driveAuth');

module.exports = async (req, res) => {
  try {
    const parentId = process.env.DRIVE_PARENT_FOLDER_ID;
    if (!parentId) {
      res.setHeader('Cache-Control', 'public, s-maxage=60');
      res.status(200).json([]);
      return;
    }

    const token = await getAccessToken();
    const authHeaders = { Authorization: `Bearer ${token}` };

    const foldersUrl = 'https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
      q: `'${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id,name)',
      orderBy: 'createdTime desc',
      pageSize: '100'
    });
    const foldersResp = await fetch(foldersUrl, { headers: authHeaders });
    if (!foldersResp.ok) throw new Error('폴더 목록 조회 실패: ' + await foldersResp.text());
    const folders = (await foldersResp.json()).files || [];

    const results = [];
    for (const folder of folders) {
      const filesUrl = 'https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
        q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: 'files(id,name)',
        orderBy: 'name',
        pageSize: '50'
      });
      const filesResp = await fetch(filesUrl, { headers: authHeaders });
      if (!filesResp.ok) continue;
      const files = (await filesResp.json()).files || [];
      files.forEach(f => {
        results.push({
          img: `/api/drive-image?id=${f.id}`,
          title: folder.name,
          badge: 'PROJECT'
        });
      });
    }

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json(results);
  } catch (err) {
    console.error('marquee-photos error:', err);
    res.setHeader('Cache-Control', 'public, s-maxage=30');
    res.status(200).json([]);
  }
};
