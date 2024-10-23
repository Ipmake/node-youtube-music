import got from 'got';
import context from './context.js';
import { Playlist } from './models.js';
import { parseAlbumItem, parseArtistData, parsePlaylist, parsePlaylistItem } from './parsers.js';

export async function getPlaylist(
  playlistId: string,
  options?: {
    lang: string;
    country: string;
  }
): Promise<Playlist | null> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body,
        browseId: playlistId,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept-Language': options?.lang ?? 'en',
        origin: 'https://music.youtube.com',
      },
    }
  );

  try {
    return parsePlaylist((JSON.parse(response.body)).contents);
  } catch (e) {
    console.error(e);
    return null;
  }
}
