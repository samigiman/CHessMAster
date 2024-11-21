import { Chess } from 'chess.js';

// Simple evaluation function for piece values
const PIECE_VALUES = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0
};

// Evaluate board position
const evaluatePosition = (game: Chess): number => {
  const fen = game.fen();
  let score = 0;

  // Material evaluation
  for (let i = 0; i < fen.length; i++) {
    const char = fen[i];
    if (PIECE_VALUES.hasOwnProperty(char.toLowerCase())) {
      const value = PIECE_VALUES[char.toLowerCase()];
      score += char === char.toLowerCase() ? -value : value;
    }
  }

  // Add some randomness to make the game more interesting
  score += (Math.random() - 0.5) * 0.2;

  return score;
};

// Get the best move for the computer
export const getBestMove = (game: Chess, depth: number = 2): string => {
  const moves = game.moves({ verbose: true });
  let bestMove = null;
  let bestScore = -Infinity;

  for (const move of moves) {
    game.move(move);
    const score = -minimax(game, depth - 1, -Infinity, Infinity, false);
    game.undo();

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove ? bestMove.san : '';
};

// Minimax algorithm with alpha-beta pruning
const minimax = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number => {
  if (depth === 0 || game.isGameOver()) {
    return evaluatePosition(game);
  }

  const moves = game.moves();

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (const move of moves) {
      game.move(move);
      const score = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const move of moves) {
      game.move(move);
      const score = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return minScore;
  }
};