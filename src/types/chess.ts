import { Chess, Move, Square as ChessSquare } from 'chess.js';

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  board: Chess;
  history: Move[];
  currentIndex: number;
}

export interface SquareData {
  piece: {
    type: PieceType;
    color: PieceColor;
  } | null;
  square: ChessSquare;
}