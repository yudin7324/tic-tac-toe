import { FC } from 'react';
import './game.scss';
import Cell from '@/components/Cell/Cell';
import IconLogo from '@/components/icons/IconLogo';
import Stat from '@/components/Stat/Stat';
import Turn from '@/components/Turn/Turn';
import IconRestart from '@/components/icons/IconRestart';
import { GameConfig } from '@/types/types';
import { useTicTacToe } from '@/hooks/useTicTacToe';
import Modal from '@/components/Modal/Modal';
import { useNavigate } from 'react-router-dom';


interface GameProps {
  config: GameConfig;
}

const Game: FC<GameProps> = ({ config }) => {
  const navigate = useNavigate();
  const {
    board,
    currentTurn,
    xWins,
    oWins,
    ties,
    winner,
    handlePlayerMove,
    reset,
    winningPattern,
  } = useTicTacToe(config);

  const getPlayerLabel = (symbol: 1 | 0) => {
    if (config.mode === 'cpu') {
      return config.playerSymbol === symbol ? '(YOU)' : '(CPU)';
    } else {
      return config.playerSymbol === symbol ? '(P1)' : '(P2)';
    }
  };

  return (
    <div className="game">
      <div className='game__wrap'>
        <div className="game__heading">
          <IconLogo />
          <Turn value={currentTurn} />
          <button
            className="game__restart"
            type="button"
            aria-label="restart button"
            onClick={reset}
          >
            <IconRestart />
          </button>
        </div>

        <div className="game__grid">
          {board.map((value, index) => {
            const isWinning = winningPattern?.includes(index) ?? false;

            return (
              <Cell
                key={index}
                value={value}
                preview={currentTurn}
                onClick={() => handlePlayerMove(index)}
                isWinning={isWinning}
                winner={winner === 0 || winner === 1 ? winner : null}
              />
            );
          })}
        </div>

        <div className="game__statistics">
          <Stat title={`X ${getPlayerLabel(1)}`} color="blue" value={xWins} />
          <Stat title="TIES" color="silver" value={ties} />
          <Stat title={`O ${getPlayerLabel(0)}`} color="yellow" value={oWins} />
        </div>

        <Modal
          isOpen={winner !== null}
          winner={winner}
          playerSymbol={config.playerSymbol}
          onQuit={() => navigate('/')}
          onNext={() => reset()}
        />
      </div>
    </div>
  );
};

export default Game;
