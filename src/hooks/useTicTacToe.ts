import { useEffect, useRef, useState } from 'react';
import { GameConfig } from '@/types/types';

type CellValue = 1 | 0 | null;
type BoardState = CellValue[];

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function useTicTacToe(config: GameConfig) {
  const playerSymbol = useRef(config.playerSymbol).current;
  const cpuSymbol = useRef(playerSymbol === 1 ? 0 : 1).current;

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<1 | 0>(1);
  const [winner, setWinner] = useState<1 | 0 | 'tie' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [ties, setTies] = useState(0);

  const checkWinner = (board: BoardState): 1 | 0 | 'tie' | null => {
    for (const [a, b, c] of WIN_PATTERNS) {
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.every(cell => cell !== null) ? 'tie' : null;
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsGameOver(false);
    setCurrentTurn(1);
  };

  const resetStats = () => {
    setXWins(0);
    setOWins(0);
    setTies(0);
    localStorage.removeItem('tic-tac-toe-stats');
  };

  const updateBoard = (index: number, value: 1 | 0) => {
    const newBoard = [...board];
    newBoard[index] = value;
    setBoard(newBoard);
  };

  const handlePlayerMove = (index: number) => {
    if (isGameOver || board[index] !== null) return;
    if (config.mode === 'cpu' && currentTurn !== playerSymbol) return;
  
    updateBoard(index, currentTurn);
    setCurrentTurn((prev) => (prev === 1 ? 0 : 1));
  };

  const getBestMove = (board: BoardState, ai: CellValue, human: CellValue): number => {
    let bestScore = -Infinity;
    let move = -1;

    board.forEach((cell, i) => {
      if (cell === null) {
        board[i] = ai;
        const score = minimax(board, 0, false, ai, human);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    });

    return move;
  };

  const minimax = (
    board: BoardState,
    depth: number,
    isMax: boolean,
    ai: CellValue,
    human: CellValue
  ): number => {
    const result = checkWinner(board);
    if (result === ai) return 10 - depth;
    if (result === human) return depth - 10;
    if (board.every(c => c !== null)) return 0;

    if (isMax) {
      let best = -Infinity;
      board.forEach((c, i) => {
        if (c === null) {
          board[i] = ai;
          best = Math.max(best, minimax(board, depth + 1, false, ai, human));
          board[i] = null;
        }
      });
      return best;
    } else {
      let best = Infinity;
      board.forEach((c, i) => {
        if (c === null) {
          board[i] = human;
          best = Math.min(best, minimax(board, depth + 1, true, ai, human));
          board[i] = null;
        }
      });
      return best;
    }
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result !== null) {
      setWinner(result);
      setIsGameOver(true);
  
      if (result === 1) setXWins(x => x + 1);
      else if (result === 0) setOWins(o => o + 1);
      else setTies(t => t + 1);
    }
  }, [board]);

  useEffect(() => {
    if (config.mode !== 'cpu') return;
    if (currentTurn !== cpuSymbol) return;
    if (isGameOver) return;
  
    const isFirstMove = board.every(cell => cell === null);
    if (isFirstMove && cpuSymbol === 0) return;
  
    const timeout = setTimeout(() => {
      const move = getBestMove([...board], cpuSymbol, playerSymbol);
      updateBoard(move, cpuSymbol);
      setCurrentTurn(playerSymbol);
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [board, currentTurn, isGameOver]);

  return {
    board,
    currentTurn,
    winner,
    xWins,
    oWins,
    ties,
    handlePlayerMove,
    reset,
    resetStats,
    playerSymbol,
    cpuSymbol,
  };
}
