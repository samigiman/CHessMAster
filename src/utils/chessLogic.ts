import { Board, Piece, Position, PieceType } from '../types/chess';

export const isValidMove = (
  board: Board,
  from: Position,
  to: Position,
  piece: Piece
): boolean => {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  const direction = piece.color === 'white' ? -1 : 1;

  // Check if destination has a piece of the same color
  if (board[to.y][to.x].piece?.color === piece.color) {
    return false;
  }

  switch (piece.type) {
    case 'pawn':
      // Basic pawn movement
      if (from.x === to.x && !board[to.y][to.x].piece) {
        if (to.y - from.y === direction) return true;
        // First move can be 2 squares
        if (
          (piece.color === 'white' && from.y === 6 && to.y === 4) ||
          (piece.color === 'black' && from.y === 1 && to.y === 3)
        ) {
          return !board[from.y + direction][from.x].piece;
        }
      }
      // Capture diagonally
      if (
        Math.abs(to.x - from.x) === 1 &&
        to.y - from.y === direction &&
        board[to.y][to.x].piece
      ) {
        return true;
      }
      return false;

    case 'knight':
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);

    case 'bishop':
      return dx === dy && !isPieceBetween(board, from, to);

    case 'rook':
      return (
        (dx === 0 || dy === 0) &&
        !isPieceBetween(board, from, to)
      );

    case 'queen':
      return (
        (dx === dy || dx === 0 || dy === 0) &&
        !isPieceBetween(board, from, to)
      );

    case 'king':
      return dx <= 1 && dy <= 1;

    default:
      return false;
  }
};

const isPieceBetween = (
  board: Board,
  from: Position,
  to: Position
): boolean => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xStep = dx / steps;
  const yStep = dy / steps;

  for (let i = 1; i < steps; i++) {
    const x = from.x + Math.round(xStep * i);
    const y = from.y + Math.round(yStep * i);
    if (board[y][x].piece) return true;
  }
  return false;
};

export const getValidMoves = (
  board: Board,
  position: Position,
  piece: Piece
): Position[] => {
  const validMoves: Position[] = [];
  
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (isValidMove(board, position, { x, y }, piece)) {
        validMoves.push({ x, y });
      }
    }
  }
  
  return validMoves;
};

export const initializeBoard = (): Board => {
  const board: Board = Array(8)
    .fill(null)
    .map((_, y) =>
      Array(8)
        .fill(null)
        .map((_, x) => ({
          piece: null,
          position: { x, y },
        }))
    );

  // Initialize pawns
  for (let x = 0; x < 8; x++) {
    board[1][x].piece = { type: 'pawn', color: 'black' };
    board[6][x].piece = { type: 'pawn', color: 'white' };
  }

  // Initialize other pieces
  const backRowPieces: PieceType[] = [
    'rook',
    'knight',
    'bishop',
    'queen',
    'king',
    'bishop',
    'knight',
    'rook',
  ];

  backRowPieces.forEach((type, x) => {
    board[0][x].piece = { type, color: 'black' };
    board[7][x].piece = { type, color: 'white' };
  });

  return board;
};