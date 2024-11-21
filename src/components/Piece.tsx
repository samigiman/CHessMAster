import React from 'react';
import { useDrag } from 'react-dnd';
import { Piece as ChessPiece, Square as ChessSquare } from 'chess.js';

interface PieceProps {
  piece: ChessPiece;
  square: ChessSquare;
}

const Piece: React.FC<PieceProps> = ({ piece, square }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { square },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getPieceImage = (type: string, color: string) => {
    const pieceColor = color === 'w' ? 'w' : 'b';
    const pieceType = type.toLowerCase();
    return `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${pieceColor}${pieceType}.png`;
  };

  return (
    <div
      ref={drag}
      className={`
        absolute inset-0
        flex items-center justify-center
        cursor-grab active:cursor-grabbing
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        transition-all duration-200 transform
        hover:scale-110
        p-1
      `}
      style={{ touchAction: 'none' }}
    >
      <img
        src={getPieceImage(piece.type, piece.color)}
        alt={`${piece.color} ${piece.type}`}
        className="w-full h-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
};

export default Piece;