import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Chess, Square as ChessSquare } from 'chess.js';
import ChessSquareComponent from './Square';
import GameControls from './GameControls';
import MoveAlert from './MoveAlert';
import PromotionDialog from './PromotionDialog';
import GameEndDialog from './GameEndDialog';
import { getBestMove } from '../utils/computerPlayer';
import { playSound } from '../utils/sounds';

const isTouchDevice = 'ontouchstart' in window;
const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

interface ChessboardProps {
  vsComputer?: boolean;
  computerColor?: 'w' | 'b';
}

const Chessboard: React.FC<ChessboardProps> = ({ 
  vsComputer = false, 
  computerColor = 'b' 
}) => {
  const [game] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null);
  const [validMoves, setValidMoves] = useState<ChessSquare[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingPromotion, setPendingPromotion] = useState<{from: ChessSquare; to: ChessSquare} | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [kingInCheck, setKingInCheck] = useState<ChessSquare | null>(null);
  const [showGameEnd, setShowGameEnd] = useState(false);

  const updateKingInCheck = useCallback(() => {
    if (game.inCheck()) {
      const color = game.turn();
      const board = game.board();
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const piece = board[i][j];
          if (piece && piece.type === 'k' && piece.color === color) {
            const file = String.fromCharCode(97 + j);
            const rank = 8 - i;
            setKingInCheck(`${file}${rank}` as ChessSquare);
            return;
          }
        }
      }
    } else {
      setKingInCheck(null);
    }
  }, [game]);

  const makeMove = useCallback((from: ChessSquare, to: ChessSquare, promotion?: 'q' | 'r' | 'b' | 'n') => {
    try {
      // Check if it's a pawn promotion move
      const piece = game.get(from);
      const isPromotion = piece?.type === 'p' && (to[1] === '8' || to[1] === '1');
      
      if (isPromotion && !promotion) {
        setPendingPromotion({ from, to });
        return false;
      }

      const move = game.move({ from, to, promotion });
      if (move) {
        if (move.captured) {
          playSound('capture');
        } else {
          playSound('move');
        }

        if (game.inCheck()) {
          playSound('check');
        }

        setSelectedSquare(null);
        setValidMoves([]);
        setErrorMessage(null);
        updateKingInCheck();

        if (game.isGameOver()) {
          playSound('gameEnd');
          setShowGameEnd(true);
        }

        // Make computer move if enabled
        if (vsComputer && game.turn() === computerColor && !game.isGameOver()) {
          makeComputerMove();
        }

        return true;
      }
    } catch (e) {
      setErrorMessage('Invalid move!');
    }
    return false;
  }, [game, vsComputer, computerColor, updateKingInCheck]);

  const makeComputerMove = useCallback(async () => {
    setIsThinking(true);
    setTimeout(() => {
      const move = getBestMove(game);
      if (move) {
        game.move(move);
        updateKingInCheck();
        if (game.isGameOver()) {
          setShowGameEnd(true);
        }
      }
      setIsThinking(false);
    }, 500);
  }, [game, updateKingInCheck]);

  const handleSquareClick = useCallback((square: ChessSquare) => {
    if (isThinking) return;

    if (selectedSquare === null) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        setValidMoves(game.moves({ square, verbose: true }).map(move => move.to as ChessSquare));
      }
    } else {
      if (square === selectedSquare) {
        setSelectedSquare(null);
        setValidMoves([]);
      } else {
        makeMove(selectedSquare, square);
      }
    }
  }, [selectedSquare, game, makeMove, isThinking]);

  const handlePieceDrop = useCallback((from: ChessSquare, to: ChessSquare) => {
    if (from === to || isThinking) return;
    makeMove(from, to);
  }, [makeMove, isThinking]);

  const handlePromotionSelect = useCallback((piece: 'q' | 'r' | 'b' | 'n') => {
    if (pendingPromotion) {
      makeMove(pendingPromotion.from, pendingPromotion.to, piece);
      setPendingPromotion(null);
    }
  }, [pendingPromotion, makeMove]);

  const reset = useCallback(() => {
    game.reset();
    setSelectedSquare(null);
    setValidMoves([]);
    setErrorMessage(null);
    setPendingPromotion(null);
    setKingInCheck(null);
    setShowGameEnd(false);
    setIsThinking(false);
  }, [game]);

  // Initialize computer as black if enabled
  useEffect(() => {
    if (vsComputer && computerColor === 'w') {
      makeComputerMove();
    }
  }, [vsComputer, computerColor, makeComputerMove]);

  return (
    <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {errorMessage && (
          <MoveAlert message={errorMessage} />
        )}

        <div className="aspect-square grid grid-cols-8 chess-board rounded-lg overflow-hidden">
          {Array.from({ length: 8 }, (_, rank) =>
            Array.from({ length: 8 }, (_, file) => {
              const square = (String.fromCharCode(97 + file) + (8 - rank)) as ChessSquare;
              const piece = game.get(square);
              return (
                <ChessSquareComponent
                  key={square}
                  square={square}
                  piece={piece}
                  isBlack={(rank + file) % 2 === 1}
                  isSelected={selectedSquare === square}
                  isValidMove={validMoves.includes(square)}
                  isCheck={square === kingInCheck}
                  onSquareClick={handleSquareClick}
                  onPieceDrop={handlePieceDrop}
                />
              );
            })
          )}
        </div>

        <GameControls
          onReset={reset}
          onUndo={() => {
            game.undo();
            if (vsComputer) game.undo();
            updateKingInCheck();
          }}
          onRedo={() => {
            // Implement redo functionality
          }}
          canUndo={game.history().length > 0}
          canRedo={false}
          turn={game.turn() === 'w' ? 'White' : 'Black'}
          isGameOver={game.isGameOver()}
          isComputerThinking={isThinking}
        />

        {pendingPromotion && (
          <PromotionDialog
            color={game.turn()}
            onSelect={handlePromotionSelect}
            onClose={() => setPendingPromotion(null)}
          />
        )}

        {showGameEnd && (
          <GameEndDialog
            winner={game.turn() === 'w' ? 'black' : 'white'}
            reason={
              game.isCheckmate() ? 'Checkmate!' :
              game.isDraw() ? 'Draw!' :
              game.isStalemate() ? 'Stalemate!' :
              game.isThreefoldRepetition() ? 'Draw by repetition!' :
              game.isInsufficientMaterial() ? 'Draw by insufficient material!' :
              'Game Over!'
            }
            onNewGame={() => {
              reset();
              setShowGameEnd(false);
            }}
            onAnalyze={() => {
              setShowGameEnd(false);
            }}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default Chessboard;