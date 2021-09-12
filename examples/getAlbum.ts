import ytMusic from '../src';

// https://music.youtube.com/browse?id=MPREb_iWdtzQKst5b
const main = () =>
  ytMusic.listMusicsFromAlbum(
    'MPREb_iWdtzQKst5b',
    {
      lang: 'fr',
      country: 'FR',
    }
  );

main().then((results) => console.log(results));
