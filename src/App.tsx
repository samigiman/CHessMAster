import React, { useState } from 'react';
import Chessboard from './components/Chessboard';

function App() {
  const [vsComputer, setVsComputer] = useState(false);
  const [computerColor, setComputerColor] = useState<'w' | 'b'>('b');

  return (
    <div className="min-h-screen bg-[#312e2b] flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-[#262421] hidden lg:block">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <img src="https://www.chess.com/bundles/web/images/logo/chess-com-logo-dark.svg" alt="Chess.com" className="h-8" />
          </div>
          <nav className="space-y-2">
            {[
              { name: 'Play', icon: '♟️' },
              { name: 'Puzzles', icon: '🧩' },
              { name: 'Learn', icon: '📚' },
              { name: 'Watch', icon: '👀' },
              { name: 'News', icon: '📰' },
              { name: 'Social', icon: '👥' },
            ].map((item) => (
              <button
                key={item.name}
                className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[#363432] rounded flex items-center space-x-3"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setVsComputer(false);
                    setComputerColor('b');
                  }}
                  className={`px-6 py-2 transition-colors font-semibold rounded ${
                    !vsComputer 
                      ? 'bg-[#7fa650] text-white hover:bg-[#6d9343]' 
                      : 'bg-[#363432] text-white hover:bg-[#464442]'
                  }`}
                >
                  New Game
                </button>
                <button 
                  onClick={() => setVsComputer(true)}
                  className={`px-6 py-2 transition-colors rounded ${
                    vsComputer 
                      ? 'bg-[#7fa650] text-white hover:bg-[#6d9343]' 
                      : 'bg-[#363432] text-white hover:bg-[#464442]'
                  }`}
                >
                  vs Computer
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-[#bababa] text-2xl font-digital">10:00</div>
              <select 
                className="bg-[#363432] px-4 py-2 rounded text-white"
                onChange={(e) => setComputerColor(e.target.value as 'w' | 'b')}
                value={computerColor}
              >
                <option value="b">Play as White</option>
                <option value="w">Play as Black</option>
              </select>
            </div>
          </div>
          
          <Chessboard vsComputer={vsComputer} computerColor={computerColor} />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-[#262421] hidden xl:block">
        <div className="p-4">
          <div className="bg-[#363432] rounded-lg p-4 h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-bold">Game Chat</h2>
              <button className="text-gray-400 hover:text-white">
                <span className="sr-only">Settings</span>
                ⚙️
              </button>
            </div>
            <div className="text-gray-400 text-sm">
              Chat is disabled in preview mode
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;