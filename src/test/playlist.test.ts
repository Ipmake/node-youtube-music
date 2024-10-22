import { test, expect } from 'vitest';
import { ListMusicVideosFromPlaylist } from '../listMusicsFromPlaylist.js';
import { SearchForPlaylists } from '../searchPlaylists.js';

test('Search for Jazz playlists and the first one should return a list of results', async () => {
  const query = 'jazz';

  const results = await SearchForPlaylists(query);
  expect(results.length).toBeGreaterThan(1);
  const firstPlaylist = results.shift();
  expect(firstPlaylist).toBeDefined();
  expect(firstPlaylist?.playlistId).toBeDefined();
  const songsResult = await ListMusicVideosFromPlaylist(
    firstPlaylist?.playlistId ?? ''
  );
  console.log(firstPlaylist?.playlistId);
  expect(songsResult.length).toBeGreaterThan(1);
});
