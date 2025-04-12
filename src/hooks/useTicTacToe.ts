import { useEffect, useRef, useState } from 'react';
import { GameConfig, WinnerResult } from '@/types/types';

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

  const savedState = (() => {
    try {
      const raw = localStorage.getItem('tic-tac-toe-state');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [board, setBoard] = useState<BoardState>(
    savedState?.board ?? Array(9).fill(null)
  );

  const [currentTurn, setCurrentTurn] = useState<1 | 0>(
    savedState?.currentTurn ?? 1
  );

  const [winner, setWinner] = useState<1 | 0 | 'tie' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winningPattern, setWinningPattern] = useState<number[] | null>(null);

  const [xWins, setXWins] = useState<number>(savedState?.xWins ?? 0);
  const [oWins, setOWins] = useState<number>(savedState?.oWins ?? 0);
  const [ties, setTies] = useState<number>(savedState?.ties ?? 0);

  const checkWinner = (board: BoardState): WinnerResult => {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], pattern };
      }
    }
  
    if (board.every(cell => cell !== null)) {
      return { winner: 'tie' };
    }
  
    return null;
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsGameOver(false);
    setCurrentTurn(1);
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

  const getBestMove = (
    board: BoardState,
    ai: CellValue,
    human: CellValue,
    difficulty = 0.8
  ): number => {
    const possibleMoves = board
      .map((cell, i) => (cell === null ? i : null))
      .filter((i): i is number => i !== null);
  
    const shouldPlayBest = Math.random() < difficulty;
  
    if (!shouldPlayBest) {
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      return possibleMoves[randomIndex];
    }
  
    let bestScore = -Infinity;
    let move = -1;
  
    possibleMoves.forEach((i) => {
      board[i] = ai;
      const score = minimax(board, 0, false, ai, human);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
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
  
    if (result !== null) {
      if (result.winner === ai) return 10 - depth;
      if (result.winner === human) return depth - 10;
      if (result.winner === 'tie') return 0;
    }
  
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
      setIsGameOver(true);
  
      if (result.winner === 'tie') {
        setWinner('tie');
        setTies(t => t + 1);
      } else {
        setWinner(result.winner);
        setWinningPattern(result.pattern);
        if (result.winner === 1) setXWins(x => x + 1);
        else setOWins(o => o + 1);
      }
  
      return;
    }
  }, [board]);

  useEffect(() => {
    if (config.mode !== 'cpu') return;
    if (currentTurn !== cpuSymbol) return;
    if (isGameOver) return;
  
    const isFirstMove = board.every(cell => cell === null);
    if (isFirstMove && cpuSymbol === 0) return;
  
    const timeout = setTimeout(() => {
      const move = getBestMove([...board], cpuSymbol, playerSymbol, 0.8);
      updateBoard(move, cpuSymbol);
      setCurrentTurn(playerSymbol);
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [board, currentTurn, isGameOver]);

  useEffect(() => {
    localStorage.setItem(
      'tic-tac-toe-state',
      JSON.stringify({
        board,
        currentTurn,
        xWins,
        oWins,
        ties,
      })
    );
  }, [board, xWins, oWins, ties, currentTurn])

  return {
    board,
    currentTurn,
    winner,
    xWins,
    oWins,
    ties,
    handlePlayerMove,
    reset,
    winningPattern,
  };
}
