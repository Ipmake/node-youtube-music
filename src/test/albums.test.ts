import { test, expect } from 'vitest';
import { ListMusicVideosFromAlbum } from '../listMusicsFromAlbum.js';
import { SearchForAlbum } from '../searchAlbums.js';
import { getPlaylist } from '../getPlaylist.js';

test('Search for Heaven & Hell album, pick first and get song list', async () => {
  const query = 'Heaven & Hell';

  const results = await SearchForAlbum(query);
  expect(results.length).toBeGreaterThan(1);
  const firstAlbum = results.shift();
  expect(firstAlbum).toBeDefined();
  const albumId = firstAlbum?.albumId;
  expect(albumId).toBeDefined();
  const songsResult = await ListMusicVideosFromAlbum(albumId ?? '');
  expect(songsResult.length).toBeGreaterThan(0);

  const albumDeet = await getPlaylist(albumId ?? '');
  expect(albumDeet).toBeDefined();
  expect(albumDeet?.title).toBeDefined();
  expect(albumDeet?.tracks.length).toBeGreaterThan(0);

  albumDeet?.tracks.forEach((track) => {
    expect(track.title).toBeDefined();
    expect(track.id).toBeDefined();
  });
});
