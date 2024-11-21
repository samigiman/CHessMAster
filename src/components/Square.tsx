import React from 'react';
import { useDrop } from 'react-dnd';
import { Square as ChessSquare, Piece as ChessPiece } from 'chess.js';
import Piece from './Piece';

interface SquareProps {
  square: ChessSquare;
  piece: ChessPiece | null;
  isBlack: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  isCheck: boolean;
  onSquareClick: (square: ChessSquare) => void;
  onPieceDrop: (from: ChessSquare, to: ChessSquare) => void;
}

const Square: React.FC<SquareProps> = ({
  square,
  piece,
  isBlack,
  isSelected,
  isValidMove,
  isCheck,
  onSquareClick,
  onPieceDrop,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item: { square: ChessSquare }) => {
      onPieceDrop(item.square, square);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      onClick={() => onSquareClick(square)}
      className={`
        relative w-full h-full
        ${isBlack ? 'square-dark' : 'square-light'}
        ${isSelected ? 'square-selected' : ''}
        ${isValidMove ? 'valid-move' : ''}
        ${isCheck ? 'check-highlight' : ''}
        ${isOver ? 'after:absolute after:inset-0 after:bg-blue-500 after:opacity-40' : ''}
        transition-colors duration-200
      `}
    >
      {piece && (
        <Piece
          piece={piece}
          square={square}
        />
      )}
    </div>
  );
};

export default Square;