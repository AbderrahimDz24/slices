import { generateApiKeyId } from '@api-keys/utils';

describe('generateApiKeyId', () => {
  it('returns a prefixed 16-hex identifier', () => {
    expect(generateApiKeyId()).toMatch(/^apk_[0-9a-f]{16}$/);
  });

  it('returns different identifiers across calls', () => {
    expect(generateApiKeyId()).not.toBe(generateApiKeyId());
  });
});
