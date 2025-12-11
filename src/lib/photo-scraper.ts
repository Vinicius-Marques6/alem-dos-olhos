import * as cheerio from 'cheerio';

const cache = new Map();

export async function fetchRepositoryPhotos(offset = '0') {
  if (cache.has(offset)) return cache.get(offset);

  const baseUrl = 'https://repositorio.ufms.br';
  const listUrl = `${baseUrl}/handle/123456789/3281?offset=${offset}`;

  try {
    const responseList = await fetch(listUrl);
    const htmlList = await responseList.text();
    const $list = cheerio.load(htmlList);
    const linksToProcess: string[] = [];

    $list('td[headers="t2"] a').each((_, element) => {
      const href = $list(element).attr('href');
      if (href) linksToProcess.push(`${baseUrl}${href}`);
    });

    if (linksToProcess.length === 0) return [];

    const detailedPhotos = await Promise.all(
      linksToProcess.map(async (detailUrl) => {
        try {
          const responseDetail = await fetch(detailUrl);
          const htmlDetail = await responseDetail.text();
          const $detail = cheerio.load(htmlDetail);

          const imageUrl = $detail('meta[name="citation_pdf_url"]').attr('content');
          const title = $detail('meta[name="DC.title"]').attr('content');
          const creator = $detail('meta[name="DC.creator"]').attr('content');
          
          if (!imageUrl) return null;

          return {
            id: detailUrl.split('/').pop(),
            url: imageUrl,
            title,
            creator,
          };
        } catch (err) { return null; }
      })
    );

    const finalResult = detailedPhotos.filter(f => f !== null);
    
    cache.set(offset, finalResult);
    
    return finalResult;

  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}