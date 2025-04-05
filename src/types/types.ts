
export type GameMode = 'pvp' | 'cpu';

export type PlayerSymbol = 1 | 0;

export interface GameConfig {
  mode: GameMode;
  playerSymbol: PlayerSymbol;
}

export type BoardState = (PlayerSymbol)[];
