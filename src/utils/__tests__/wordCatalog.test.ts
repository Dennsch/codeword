import { WORD_CATALOG, getRandomWord, encodeWord, decodeWord } from '../wordCatalog';

describe('wordCatalog', () => {
  describe('WORD_CATALOG', () => {
    it('should contain words between 3 and 6 letters', () => {
      WORD_CATALOG.forEach(word => {
        expect(word.length).toBeGreaterThanOrEqual(3);
        expect(word.length).toBeLessThanOrEqual(6);
      });
    });

    it('should contain only lowercase letters', () => {
      WORD_CATALOG.forEach(word => {
        expect(word).toMatch(/^[a-z]+$/);
      });
    });

    it('should have at least some words', () => {
      expect(WORD_CATALOG.length).toBeGreaterThan(0);
    });
  });

  describe('getRandomWord', () => {
    it('should return a word from the catalog', () => {
      const word = getRandomWord();
      expect(WORD_CATALOG).toContain(word);
    });

    it('should return different words on multiple calls (probabilistic)', () => {
      const words = new Set();
      // Call multiple times to increase chance of getting different words
      for (let i = 0; i < 50; i++) {
        words.add(getRandomWord());
      }
      // With a large catalog, we should get at least a few different words
      expect(words.size).toBeGreaterThan(1);
    });
  });

  describe('encodeWord', () => {
    it('should shift each letter by 1 position', () => {
      expect(encodeWord('abc')).toBe('bcd');
      expect(encodeWord('xyz')).toBe('yza');
    });

    it('should handle single letters correctly', () => {
      expect(encodeWord('a')).toBe('b');
      expect(encodeWord('z')).toBe('a');
      expect(encodeWord('m')).toBe('n');
    });

    it('should handle mixed case by converting to lowercase', () => {
      expect(encodeWord('ABC')).toBe('bcd');
      expect(encodeWord('XyZ')).toBe('yza');
    });

    it('should handle empty string', () => {
      expect(encodeWord('')).toBe('');
    });

    it('should preserve non-alphabetic characters', () => {
      expect(encodeWord('a1b')).toBe('b1c');
      expect(encodeWord('a-b')).toBe('b-c');
    });
  });

  describe('decodeWord', () => {
    it('should shift each letter back by 1 position', () => {
      expect(decodeWord('bcd')).toBe('abc');
      expect(decodeWord('yza')).toBe('xyz');
    });

    it('should handle single letters correctly', () => {
      expect(decodeWord('b')).toBe('a');
      expect(decodeWord('a')).toBe('z');
      expect(decodeWord('n')).toBe('m');
    });

    it('should handle mixed case by converting to lowercase', () => {
      expect(decodeWord('BCD')).toBe('abc');
      expect(decodeWord('YzA')).toBe('xyz');
    });

    it('should handle empty string', () => {
      expect(decodeWord('')).toBe('');
    });

    it('should preserve non-alphabetic characters', () => {
      expect(decodeWord('b1c')).toBe('a1b');
      expect(decodeWord('b-c')).toBe('a-b');
    });
  });

  describe('encode and decode should be inverse operations', () => {
    it('should decode encoded words back to original', () => {
      const testWords = ['hello', 'world', 'test', 'abc', 'xyz'];
      
      testWords.forEach(word => {
        const encoded = encodeWord(word);
        const decoded = decodeWord(encoded);
        expect(decoded).toBe(word);
      });
    });

    it('should encode decoded words back to original', () => {
      const testWords = ['ifmmp', 'xpsme', 'uftu', 'bcd', 'yza'];
      
      testWords.forEach(word => {
        const decoded = decodeWord(word);
        const encoded = encodeWord(decoded);
        expect(encoded).toBe(word);
      });
    });
  });
});