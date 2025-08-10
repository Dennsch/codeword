# Codeword Puzzle Game

A fun React TypeScript word puzzle game where players decode words by figuring out letters that have been shifted by one position in the alphabet.

## Game Rules

- Each round presents an encoded word where every letter has been shifted forward by 1 position in the alphabet
- For example: A becomes B, B becomes C, Z becomes A
- Players must figure out the original word and enter it in the input fields
- Words are between 3-6 letters long from a curated catalog
- Click "Check Answer" to see if you guessed correctly!

## Features

- 🎮 Interactive word puzzle gameplay
- 🎨 Beautiful gradient UI design
- 📱 Responsive design for mobile and desktop
- 🔄 Play again functionality for endless fun
- ✅ Comprehensive unit test coverage
- 🎯 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codeword
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner in interactive watch mode
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Testing

The project includes comprehensive unit tests covering:

- Word catalog utilities (encoding/decoding functions)
- Game component functionality
- User interactions and game flow

Run tests with:
```bash
npm test
```

For coverage report:
```bash
npm test -- --coverage
```

## Project Structure

```
src/
├── components/
│   ├── WordPuzzleGame.tsx      # Main game component
│   ├── WordPuzzleGame.css      # Game styling
│   └── __tests__/
│       └── WordPuzzleGame.test.tsx
├── utils/
│   ├── wordCatalog.ts          # Word catalog and encoding utilities
│   └── __tests__/
│       └── wordCatalog.test.ts
├── App.tsx                     # Root component
├── App.css                     # Global styles
├── index.tsx                   # Application entry point
└── setupTests.ts               # Test configuration
```

## How It Works

1. **Word Selection**: A random word is selected from a catalog of 3-6 letter words
2. **Encoding**: Each letter is shifted forward by 1 position (Caesar cipher with shift +1)
3. **Display**: The encoded word is shown to the player
4. **Input**: Player enters their guess letter by letter
5. **Evaluation**: The game checks if the guess matches the original word
6. **Feedback**: Win/lose message is displayed with option to play again

## Technologies Used

- React 18
- TypeScript
- CSS3 with modern features (Grid, Flexbox, Gradients)
- Jest & React Testing Library
- Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).