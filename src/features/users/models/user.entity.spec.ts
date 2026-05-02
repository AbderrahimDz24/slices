import { User } from '@users/models';

describe('User.assignId', () => {
  it('assigns a generated ID when one is missing', () => {
    const user = new User();

    user.assignId();

    expect(user.id).toMatch(/^usr_[0-9a-f]{16}$/);
  });

  it('preserves an explicit ID', () => {
    const user = new User();

    user.id = 'usr_1234567890abcdef';
    user.assignId();

    expect(user.id).toBe('usr_1234567890abcdef');
  });
});
