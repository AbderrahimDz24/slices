import { generateUserId } from '@users/utils';

describe('generateUserId', () => {
  it('returns a prefixed 16-hex identifier', () => {
    expect(generateUserId()).toMatch(/^usr_[0-9a-f]{16}$/);
  });

  it('returns different identifiers across calls', () => {
    expect(generateUserId()).not.toBe(generateUserId());
  });
});
