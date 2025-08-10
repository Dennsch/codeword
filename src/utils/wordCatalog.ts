// Word catalog containing words between 3-6 letters
export const WORD_CATALOG: string[] = [
  // 3-letter words
  'cat', 'dog', 'sun', 'run', 'fun', 'car', 'bat', 'hat', 'rat', 'mat',
  'cup', 'pen', 'box', 'fox', 'mix', 'fix', 'six', 'win', 'bin', 'pin',
  'red', 'bed', 'led', 'fed', 'web', 'net', 'pet', 'set', 'get', 'let',
  
  // 4-letter words
  'word', 'game', 'play', 'code', 'time', 'home', 'love', 'life', 'work',
  'book', 'look', 'took', 'cook', 'good', 'food', 'moon', 'soon', 'door',
  'tree', 'free', 'blue', 'true', 'fire', 'wire', 'tire', 'hire', 'care',
  'dare', 'fare', 'rare', 'wave', 'save', 'gave', 'have', 'make', 'take',
  'wake', 'lake', 'cake', 'bake', 'face', 'race', 'pace', 'lace', 'nice',
  
  // 5-letter words
  'happy', 'world', 'great', 'small', 'right', 'light', 'night', 'might',
  'fight', 'sight', 'tight', 'white', 'black', 'green', 'brown', 'quick',
  'thick', 'stick', 'trick', 'brick', 'click', 'track', 'crack', 'stack',
  'plant', 'grand', 'brand', 'stand', 'sound', 'round', 'found', 'pound',
  'house', 'mouse', 'horse', 'nurse', 'purse', 'curse', 'worse', 'force',
  
  // 6-letter words
  'puzzle', 'simple', 'double', 'triple', 'circle', 'square', 'orange',
  'purple', 'yellow', 'silver', 'golden', 'broken', 'frozen', 'chosen',
  'spoken', 'woken', 'garden', 'hidden', 'wooden', 'modern', 'ancient',
  'future', 'nature', 'picture', 'culture', 'adventure', 'treasure',
  'measure', 'pleasure', 'weather', 'leather', 'feather', 'brother',
  'mother', 'father', 'sister', 'master', 'faster', 'winter', 'summer'
];

/**
 * Get a random word from the catalog
 */
export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * WORD_CATALOG.length);
  return WORD_CATALOG[randomIndex].toLowerCase();
};

/**
 * Encode a word by shifting each letter by 1 position in the alphabet
 * a -> b, b -> c, ..., z -> a
 */
export const encodeWord = (word: string): string => {
  return word
    .toLowerCase()
    .split('')
    .map(char => {
      if (char >= 'a' && char <= 'z') {
        // Shift by 1, wrap around from z to a
        return char === 'z' ? 'a' : String.fromCharCode(char.charCodeAt(0) + 1);
      }
      return char; // Return non-alphabetic characters unchanged
    })
    .join('');
};

/**
 * Decode a word by shifting each letter back by 1 position in the alphabet
 * b -> a, c -> b, ..., a -> z
 */
export const decodeWord = (encodedWord: string): string => {
  return encodedWord
    .toLowerCase()
    .split('')
    .map(char => {
      if (char >= 'a' && char <= 'z') {
        // Shift back by 1, wrap around from a to z
        return char === 'a' ? 'z' : String.fromCharCode(char.charCodeAt(0) - 1);
      }
      return char; // Return non-alphabetic characters unchanged
    })
    .join('');
};