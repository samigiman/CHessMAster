import React from 'react';
import { Trophy, X } from 'lucide-react';

interface GameEndDialogProps {
  winner: 'white' | 'black' | 'draw';
  reason: string;
  onNewGame: () => void;
  onAnalyze: () => void;
}

const GameEndDialog: React.FC<GameEndDialogProps> = ({
  winner,
  reason,
  onNewGame,
  onAnalyze,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#262421] rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-[#7fa650]" />
              {winner === 'draw' ? 'Draw' : `${winner === 'white' ? 'White' : 'Black'} Won`}
            </h2>
            <button
              onClick={onNewGame}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <p className="text-gray-300 mb-6">{reason}</p>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={onNewGame}
              className="w-full py-3 px-4 bg-[#7fa650] hover:bg-[#6d9343] text-white font-semibold rounded-lg transition-colors"
            >
              New Game
            </button>
            <button
              onClick={onAnalyze}
              className="w-full py-3 px-4 bg-[#363432] hover:bg-[#464442] text-white font-semibold rounded-lg transition-colors"
            >
              Analysis Board
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-[#7fa650] font-bold">1</div>
              <div className="text-gray-400">Mistakes</div>
            </div>
            <div>
              <div className="text-red-500 font-bold">3</div>
              <div className="text-gray-400">Blunders</div>
            </div>
            <div>
              <div className="text-gray-300 font-bold">0</div>
              <div className="text-gray-400">Missed Wins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEndDialog;