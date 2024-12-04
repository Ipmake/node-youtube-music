import axios from 'axios';
import context from './context.js';
import { PlaylistPreview } from './models.js';
import { parsePlaylistItem } from './parsers.js';

export const parseSearchPlaylistsBody = (
  body: any,
  onlyOfficialPlaylists: boolean
): PlaylistPreview[] => {
  try {
    const contents =
      body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
        .musicShelfRenderer?.contents;
    if (!contents) {
      return [];
    }
    const results: PlaylistPreview[] = [];
    contents.forEach((content: any) => {
      try {
        const playlist = parsePlaylistItem(content, onlyOfficialPlaylists);
        if (playlist) {
          results.push(playlist);
        }
      } catch (e) {
        console.error(e);
      }
    });
    return results;
  } catch (err) {
    console.log("Failed to searchPlaylists", err)
    return [];
  }
};

export async function SearchForPlaylists(
  query: string,
  options?: {
    onlyOfficialPlaylists?: boolean;
  }
): Promise<PlaylistPreview[]> {
  const response = await axios.post(
    'https://music.youtube.com/youtubei/v1/search',
    {
      ...context.body,
      params: 'EgWKAQIoAWoKEAoQAxAEEAUQCQ%3D%3D',
      query,
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

  try {
    return parseSearchPlaylistsBody(
      response.data,
      options?.onlyOfficialPlaylists ?? false
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}