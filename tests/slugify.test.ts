import { slugify } from '@/lib/slug';

describe('slugify', () => {
  it('should convert spaces to hyphens', () => {
    expect(slugify('New Town')).toBe('new-town');
  });

  it('should handle special characters', () => {
    expect(slugify("Bishop’s Gate")).toBe('bishops-gate');
  });

  it('should lowercase all characters', () => {
    expect(slugify('UPPERCASE')).toBe('uppercase');
  });

  it('should trim leading and trailing spaces', () => {
    expect(slugify('  Trim Me  ')).toBe('trim-me');
  });

  it('should handle empty strings', () => {
    expect(slugify('')).toBe('');
  });
});
