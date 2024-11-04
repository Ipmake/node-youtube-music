import { test, expect } from 'vitest';
import { getVideo } from '../getVideo';

test('Should always return the video data', async () => {
    const result = await getVideo('TrjzOu-JXa8');
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
});
