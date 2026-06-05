import { loadBootstrapAdminCredentials } from './bootstrap-admin.config';

describe('loadBootstrapAdminCredentials', () => {
  it('loads bootstrap credentials from environment values', () => {
    expect(
      loadBootstrapAdminCredentials({
        BOOTSTRAP_ADMIN_EMAIL: 'admin@example.com',
        BOOTSTRAP_ADMIN_PASSWORD: 'strongPassword123',
      }),
    ).toEqual({
      email: 'admin@example.com',
      password: 'strongPassword123',
    });
  });

  it('rejects missing bootstrap credentials', () => {
    expect(() => loadBootstrapAdminCredentials({})).toThrow();
  });

  it('rejects invalid bootstrap credentials', () => {
    expect(() =>
      loadBootstrapAdminCredentials({
        BOOTSTRAP_ADMIN_EMAIL: 'not-an-email',
        BOOTSTRAP_ADMIN_PASSWORD: 'short',
      }),
    ).toThrow();
  });
});
