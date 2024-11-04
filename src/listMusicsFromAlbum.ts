import context from './context.js';
import { MusicVideo } from './models.js';
import { parseAlbumHeader, parseMusicInAlbumItem } from './parsers.js';
import axios from 'axios';

export const parseListMusicsFromAlbumBody = (body: any): MusicVideo[] => {
  const { contents } =
    body.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicShelfRenderer;
  const songs: MusicVideo[] = [];
  const { thumbnailUrl, artist, album } = parseAlbumHeader(body.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0]);
  contents.forEach((element: any) => {
    try {
      const song = parseMusicInAlbumItem(element);
      if (song) {
        song.album = album;
        if (song.artists?.length === 0) song.artists = [{ name: artist }];
        song.thumbnailUrl = thumbnailUrl;
        songs.push(song);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return songs;
};

export async function ListMusicVideosFromAlbum(
  albumId: string
): Promise<MusicVideo[]> {
  try {
    const response = await axios.post(
      'https://music.youtube.com/youtubei/v1/browse',
      {
        ...context.body,
        browseId: albumId,
      }, 
      {
        params: {
          alt: 'json',
          key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
        },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          origin: 'https://music.youtube.com',
        }
      }
    );

    return parseListMusicsFromAlbumBody(response.data);
  } catch (e) {
    console.error(e);
    return [];
  }
}