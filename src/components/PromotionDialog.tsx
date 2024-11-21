import React from 'react';

interface PromotionDialogProps {
  color: 'w' | 'b';
  onSelect: (piece: 'q' | 'r' | 'b' | 'n') => void;
  onClose: () => void;
}

const PromotionDialog: React.FC<PromotionDialogProps> = ({ color, onSelect, onClose }) => {
  const pieces: Array<{ type: 'q' | 'r' | 'b' | 'n', label: string }> = [
    { type: 'q', label: 'Queen' },
    { type: 'r', label: 'Rook' },
    { type: 'b', label: 'Bishop' },
    { type: 'n', label: 'Knight' }
  ];

  const getPieceImage = (type: string) => {
    return `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${color}${type}.png`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#262421] p-6 rounded-lg shadow-xl animate-fade-in">
        <h3 className="text-white text-xl font-bold mb-4">Choose promotion piece:</h3>
        <div className="grid grid-cols-4 gap-4">
          {pieces.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className="bg-[#363432] hover:bg-[#464442] p-4 rounded-lg transition-colors flex flex-col items-center"
            >
              <img
                src={getPieceImage(type)}
                alt={label}
                className="w-16 h-16 object-contain mb-2"
                draggable={false}
              />
              <span className="text-white text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionDialog;