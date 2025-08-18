import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordPuzzleGame from '../WordPuzzleGame';
import * as wordCatalog from '../../utils/wordCatalog';

// Mock the wordCatalog module
jest.mock('../../utils/wordCatalog');

const mockWordCatalog = wordCatalog as jest.Mocked<typeof wordCatalog>;

describe('WordPuzzleGame', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Set up default mock implementations
    mockWordCatalog.getRandomWord.mockReturnValue('test');
    mockWordCatalog.encodeWord.mockReturnValue('uftu');
  });

  it('renders the game title and instructions', () => {
    render(<WordPuzzleGame />);
    
    expect(screen.getByText('🔤 Codeword Puzzle')).toBeInTheDocument();
    expect(screen.getByText(/Decode the word! Each letter is shifted by 1 position/)).toBeInTheDocument();
  });

  it('displays the encoded word', () => {
    render(<WordPuzzleGame />);
    
    expect(screen.getByText('Encoded Word:')).toBeInTheDocument();
    // Should display the encoded letters
    expect(screen.getByText('U')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('renders input fields for each letter of the word', () => {
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4); // 'test' has 4 letters
    
    inputs.forEach(input => {
      expect(input).toHaveAttribute('maxLength', '1');
      expect(input).toHaveAttribute('placeholder', '?');
    });
  });

  it('allows user to type in input fields', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    
    await user.type(inputs[0], 't');
    await user.type(inputs[1], 'e');
    await user.type(inputs[2], 's');
    await user.type(inputs[3], 't');
    
    expect(inputs[0]).toHaveValue('T');
    expect(inputs[1]).toHaveValue('E');
    expect(inputs[2]).toHaveValue('S');
    expect(inputs[3]).toHaveValue('T');
  });

  it('limits input to single characters', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const input = screen.getAllByRole('textbox')[0];
    
    await user.type(input, 'abc');
    expect(input).toHaveValue('A'); // Should only keep the first character (uppercase)
  });

  it('converts input to uppercase', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const input = screen.getAllByRole('textbox')[0];
    
    await user.type(input, 't');
    expect(input).toHaveValue('T');
  });

  it('disables check button when not all fields are filled', () => {
    render(<WordPuzzleGame />);
    
    const checkButton = screen.getByText('Check Answer');
    expect(checkButton).toBeDisabled();
  });

  it('enables check button when all fields are filled', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    const checkButton = screen.getByText('Check Answer');
    
    // Fill all inputs
    await user.type(inputs[0], 'T');
    await user.type(inputs[1], 'E');
    await user.type(inputs[2], 'S');
    await user.type(inputs[3], 'T');
    
    expect(checkButton).not.toBeDisabled();
  });

  it('shows winning message when guess is correct', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    const checkButton = screen.getByText('Check Answer');
    
    // Fill with correct answer
    await user.type(inputs[0], 'T');
    await user.type(inputs[1], 'E');
    await user.type(inputs[2], 'S');
    await user.type(inputs[3], 'T');
    
    await user.click(checkButton);
    
    expect(screen.getByText(/🎉 Congratulations! You solved the puzzle!/)).toBeInTheDocument();
  });

  it('shows losing message when guess is incorrect', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    const checkButton = screen.getByText('Check Answer');
    
    // Fill with incorrect answer
    await user.type(inputs[0], 'W');
    await user.type(inputs[1], 'R');
    await user.type(inputs[2], 'O');
    await user.type(inputs[3], 'N');
    
    await user.click(checkButton);
    
    expect(screen.getByText(/❌ Sorry! The correct word was "TEST"/)).toBeInTheDocument();
  });

  it('disables inputs after game ends', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    const checkButton = screen.getByText('Check Answer');
    
    // Fill with correct answer
    await user.type(inputs[0], 'T');
    await user.type(inputs[1], 'E');
    await user.type(inputs[2], 'S');
    await user.type(inputs[3], 'T');
    
    await user.click(checkButton);
    
    // All inputs should be disabled
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it('shows play again button after game ends', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    const checkButton = screen.getByText('Check Answer');
    
    // Fill with correct answer
    await user.type(inputs[0], 'T');
    await user.type(inputs[1], 'E');
    await user.type(inputs[2], 'S');
    await user.type(inputs[3], 'T');
    
    await user.click(checkButton);
    
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('starts a new game when play again is clicked', async () => {
    const user = userEvent.setup();
    
    // Set up different words for new game
    mockWordCatalog.getRandomWord
      .mockReturnValueOnce('test')
      .mockReturnValueOnce('word');
    mockWordCatalog.encodeWord
      .mockReturnValueOnce('uftu')
      .mockReturnValueOnce('xpse');
    
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    const checkButton = screen.getByText('Check Answer');
    
    // Complete first game
    await user.type(inputs[0], 'T');
    await user.type(inputs[1], 'E');
    await user.type(inputs[2], 'S');
    await user.type(inputs[3], 'T');
    await user.click(checkButton);
    
    // Click play again
    const playAgainButton = screen.getByText('Play Again');
    await user.click(playAgainButton);
    
    // Should have new encoded word displayed
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('S')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
    
    // Inputs should be enabled and empty
    const newInputs = screen.getAllByRole('textbox');
    newInputs.forEach(input => {
      expect(input).not.toBeDisabled();
      expect(input).toHaveValue('');
    });
  });

  it('displays game instructions', () => {
    render(<WordPuzzleGame />);
    
    expect(screen.getByText('How to play:')).toBeInTheDocument();
    expect(screen.getByText(/Look at the encoded word above/)).toBeInTheDocument();
    expect(screen.getByText(/Each letter has been shifted forward by 1/)).toBeInTheDocument();
    expect(screen.getByText(/For example: A becomes B, B becomes C, Z becomes A/)).toBeInTheDocument();
  });

  it('automatically focuses next input field when a character is entered', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Focus first input and type a character
    inputs[0].focus();
    await user.type(inputs[0], 'T');
    
    // Second input should now be focused
    expect(inputs[1]).toHaveFocus();
    
    // Type in second input
    await user.type(inputs[1], 'E');
    
    // Third input should now be focused
    expect(inputs[2]).toHaveFocus();
    
    // Type in third input
    await user.type(inputs[2], 'S');
    
    // Fourth input should now be focused
    expect(inputs[3]).toHaveFocus();
  });

  it('does not auto-focus when typing in the last input field', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Focus last input and type a character
    inputs[3].focus();
    await user.type(inputs[3], 'T');
    
    // Last input should still be focused (no next input to focus)
    expect(inputs[3]).toHaveFocus();
  });

  it('does not auto-focus when input field is cleared', async () => {
    const user = userEvent.setup();
    render(<WordPuzzleGame />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Type a character first
    inputs[0].focus();
    await user.type(inputs[0], 'T');
    
    // Clear the input (this should not trigger auto-focus)
    await user.clear(inputs[0]);
    
    // First input should still be focused
    expect(inputs[0]).toHaveFocus();
  });
});