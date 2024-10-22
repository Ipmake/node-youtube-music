import { test, expect } from 'vitest';
import { ListMusicVideosFromAlbum } from '../listMusicsFromAlbum.js';
import { SearchForAlbum } from '../searchAlbums.js';

test('Search for Heaven & Hell album, pick first and get song list', async () => {
  const query = 'Heaven & Hell';

  const results = await SearchForAlbum(query);
  expect(results.length).toBeGreaterThan(1);
  const firstAlbum = results.shift();
  expect(firstAlbum).toBeDefined();
  const albumId = firstAlbum?.albumId;
  expect(albumId).toBeDefined();
  const songsResult = await ListMusicVideosFromAlbum(albumId ?? '');
  console.log(albumId);
  console.log(songsResult[0].title);
  expect(songsResult.length).toBeGreaterThan(0);
});
