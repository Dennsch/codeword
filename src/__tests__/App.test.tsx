import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the WordPuzzleGame component to avoid complex setup
jest.mock('../components/WordPuzzleGame', () => {
  return function MockWordPuzzleGame() {
    return <div data-testid="word-puzzle-game">Word Puzzle Game Component</div>;
  };
});

describe('App', () => {
  it('renders the WordPuzzleGame component', () => {
    render(<App />);
    
    const gameComponent = screen.getByTestId('word-puzzle-game');
    expect(gameComponent).toBeInTheDocument();
    expect(gameComponent).toHaveTextContent('Word Puzzle Game Component');
  });
});