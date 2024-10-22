import { test, expect } from 'vitest';
import { GetMusicVideoBasedSuggestions } from '../suggestions.js';

test('Should always return a list of suggestions', async () => {
  const result = await GetMusicVideoBasedSuggestions('ronQgBo0ZCY');
  expect(result.length).toBeGreaterThan(1);
});
