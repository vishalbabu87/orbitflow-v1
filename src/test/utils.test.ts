import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('removes falsy values', () => {
    expect(cn('foo', false, null, undefined, '')).toBe('foo');
  });

  it('handles conditional classes', () => {
    const active = true;
    expect(cn('base', active && 'active')).toBe('base active');
    expect(cn('base', !active && 'inactive')).toBe('base');
  });

  it('resolves Tailwind conflicts - last class wins', () => {
    // tailwind-merge resolves conflicts: p-4 + p-2 = p-2
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('handles object syntax from clsx', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('merges array syntax', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('deduplicates Tailwind color classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});
