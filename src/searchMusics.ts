import got from 'got';
import { MusicVideo } from './models.js';
import { parseMusicItem } from './parsers.js';
import context from './context.js';

export const parseSearchMusicsBody = (body: {
  contents: any;
}): MusicVideo[] => {
  const { contents } =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer;
  const results: MusicVideo[] = [];
  contents.forEach((content: any) => {
    try {
      const song = parseMusicItem(content);
      if (song) {
        results.push(song);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export async function SearchForMusicVideos(query: string): Promise<MusicVideo[]> {
  const url = 'https://music.youtube.com/youtubei/v1/search?alt=json';
  const body = {
    ...context.body,
    params: 'EgWKAQIIAWoKEAoQCRADEAQQBQ%3D%3D',
    query,
    originalQuery: query,
    searchMethod: "ENTER_KEY",
    validationStatus: "VALID",
  };

  const headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Origin': 'https://music.youtube.com',
  };

  const options: any = {
    method: 'POST',
    headers,
    json: body,
    responseType: 'json',
  };

  try {
    const response = await got(url, options);    
    return parseSearchMusicsBody(response.body as any);
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}