import { FC, useEffect, useState } from 'react';
import './game.scss';
import Cell from '@/components/Cell/Cell';
import IconLogo from '@/components/icons/IconLogo';
import Stat from '@/components/Stat/Stat';
import Turn from '@/components/Turn/Turn';
import IconRestart from '@/components/icons/IconRestart';
import { GameConfig } from '@/types/types';

interface GameProps {
  config: GameConfig;
}

type CellValue = 1 | 0 | null;
type BoardState = CellValue[];

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game: FC<GameProps> = ({ config }) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<1 | 0>(() => {
    return 1;
  });

  const playerSymbol = config.playerSymbol === 1 ? 1 : 0;
  const cpuSymbol = playerSymbol === 1 ? 0 : 1;

  const [xWins, setXWins] = useState(() => {
    const stats = JSON.parse(localStorage.getItem('tic-tac-toe-stats') || '{}');
    return stats.xWins || 0;
  });

  const [oWins, setOWins] = useState(() => {
    const stats = JSON.parse(localStorage.getItem('tic-tac-toe-stats') || '{}');
    return stats.oWins || 0;
  });

  const [ties, setTies] = useState(() => {
    const stats = JSON.parse(localStorage.getItem('tic-tac-toe-stats') || '{}');
    return stats.ties || 0;
  });

  useEffect(() => {
    const stats = { xWins, oWins, ties };
    localStorage.setItem('tic-tac-toe-stats', JSON.stringify(stats));
  }, [xWins, oWins, ties]);

  function handleCellClick(index: number) {
    if (board[index] !== null) return;
    if (config.mode === 'cpu' && currentTurn !== playerSymbol) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentTurn;
    setBoard(updatedBoard);
  }

  const checkWinner = (board: BoardState): 1 | 0 | 'tie' | null => {
    for (const [a, b, c] of WIN_PATTERNS) {
      if (
        board[a] !== null &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    if (board.every(cell => cell !== null)) return 'tie';
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentTurn(1);
  };

  useEffect(() => {
    const result = checkWinner(board);

    if (result === 1) {
      setXWins((prev: number) => prev + 1);
      setTimeout(() => {
        alert('X wins!');
        resetGame();
      }, 100);
    } else if (result === 0) {
      setOWins((prev: number) => prev + 1);
      setTimeout(() => {
        alert('O wins!');
        resetGame();
      }, 100);
    } else if (result === 'tie') {
      setTies((prev: number) => prev + 1);
      setTimeout(() => {
        alert("It's a tie!");
        resetGame();
      }, 100);
    } else {
      setCurrentTurn(prev => (prev === 1 ? 0 : 1));
    }
  }, [board]);

  useEffect(() => {
    if (config.mode !== 'cpu') return;
    if (currentTurn !== cpuSymbol) return;

    const timeout = setTimeout(() => {
      const move = getBestMove([...board], cpuSymbol, playerSymbol);
      if (move !== -1) {
        const newBoard = [...board];
        newBoard[move] = cpuSymbol;
        setBoard(newBoard);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [board, currentTurn, config.mode]);

  const getPlayerLabel = (symbol: 1 | 0) => {
    if (config.mode === 'cpu') {
      return symbol === playerSymbol ? '(YOU)' : '(CPU)';
    } else {
      return symbol === playerSymbol ? '(P1)' : '(P2)';
    }
  };

  const getBestMove = (board: BoardState, ai: CellValue, human: CellValue): number => {
    let bestScore = -Infinity;
    let move = -1;

    board.forEach((cell, index) => {
      if (cell === null) {
        board[index] = ai;
        const score = minimax(board, 0, false, ai, human);
        board[index] = null;

        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });

    return move;
  };

  const minimax = (
    board: BoardState,
    depth: number,
    isMaximizing: boolean,
    ai: CellValue,
    human: CellValue
  ): number => {
    const result = checkWinner(board);
    if (result === ai) return 10 - depth;
    if (result === human) return depth - 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let best = -Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = ai;
          best = Math.max(best, minimax(board, depth + 1, false, ai, human));
          board[index] = null;
        }
      });
      return best;
    } else {
      let best = Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = human;
          best = Math.min(best, minimax(board, depth + 1, true, ai, human));
          board[index] = null;
        }
      });
      return best;
    }
  };

  return (
    <div className="game">
      <div className="game__heading">
        <IconLogo />
        <Turn value={currentTurn === 1 ? 1 : 0} />
        <button
          className="game__restart"
          type="button"
          aria-label="restart button"
          onClick={() => {
            setXWins(0);
            setOWins(0);
            setTies(0);
            localStorage.removeItem('tic-tac-toe-stats');
          }}
        >
          <IconRestart />
        </button>
      </div>

      <div className="game__grid">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            onClick={() => handleCellClick(index)}
            preview={currentTurn}
          />
        ))}
      </div>

      <div className="game__statistics">
        <Stat title={`X ${getPlayerLabel(1)}`} color="blue" value={xWins} />
        <Stat title="TIES" color="silver" value={ties} />
        <Stat title={`O ${getPlayerLabel(0)}`} color="yellow" value={oWins} />
      </div>
    </div>
  );
};

export default Game;
