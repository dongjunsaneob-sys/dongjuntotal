// 네이버 블로그(dongji78) RSS를 읽어 "현장 작업사진" 섹션용 목록(JSON)으로 돌려준다.
// 블로그에 새 글을 올리면 사이트에 자동으로 반영된다(최대 10분 캐시).
// 실패해도 빈 배열을 돌려줘 사이트가 깨지지 않게 한다.
const BLOG_ID = 'dongji78';
const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;

function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : '';
}

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
}

function parseRss(xml, limit) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) && items.length < limit) {
    const block = m[1];
    const rawDesc = decodeEntities(pick(block, 'description'));
    const imgMatch = rawDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
    // RSS 기본 썸네일(type=s3)은 작아서 더 큰 버전(type=w2)으로 바꿔 쓴다.
    const img = imgMatch ? imgMatch[1].replace(/type=s3\b/, 'type=w2') : '';
    const excerpt = rawDesc.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').replace(/\.{3,}\s*$/, '').trim();
    const guid = pick(block, 'guid');
    items.push({
      title: decodeEntities(pick(block, 'title')),
      link: guid || pick(block, 'link').split('?')[0],
      category: decodeEntities(pick(block, 'category')),
      date: pick(block, 'pubDate'),
      excerpt: excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt,
      img
    });
  }
  return items;
}

async function getBlogPosts(limit = 12) {
  const res = await fetch(RSS_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (onestop-site)' } });
  if (!res.ok) throw new Error('RSS ' + res.status);
  return parseRss(await res.text(), limit);
}

module.exports = async (req, res) => {
  let posts = [];
  try {
    const q = new URL(req.url, 'http://x').searchParams;
    const limit = Math.min(parseInt(q.get('limit'), 10) || 12, 50);
    posts = await getBlogPosts(limit);
  } catch (e) {
    posts = [];
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=3600');
  res.statusCode = 200;
  res.end(JSON.stringify(posts));
};

module.exports.getBlogPosts = getBlogPosts;
