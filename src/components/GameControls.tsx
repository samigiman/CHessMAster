import React from 'react';
import { Undo2, Redo2, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  canUndo: boolean;
  canRedo: boolean;
  turn: string;
  isGameOver: boolean;
  isComputerThinking?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onUndo,
  onRedo,
  onReset,
  canUndo,
  canRedo,
  turn,
  isGameOver,
  isComputerThinking,
}) => {
  return (
    <div className="flex items-center justify-between mt-4 bg-[#262421] p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={onUndo}
          disabled={!canUndo || isComputerThinking}
          className="p-2 rounded-lg bg-[#363432] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#464442] transition-colors"
          title="Undo move"
        >
          <Undo2 size={20} />
        </button>
        <button
          onClick={onReset}
          disabled={isComputerThinking}
          className="p-2 rounded-lg bg-[#363432] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#464442] transition-colors"
          title="Reset board"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo || isComputerThinking}
          className="p-2 rounded-lg bg-[#363432] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#464442] transition-colors"
          title="Redo move"
        >
          <Redo2 size={20} />
        </button>
      </div>
      <div className="text-white px-4 py-2 rounded font-semibold">
        {isGameOver ? (
          <span className="text-red-400">Game Over</span>
        ) : isComputerThinking ? (
          <span className="text-yellow-400">Computer is thinking...</span>
        ) : (
          <span>{turn}'s turn</span>
        )}
      </div>
    </div>
  );
};

export default GameControls;