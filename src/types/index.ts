export interface Game {
  id: string;
  date: string;
  time: string;
  opponent: string;
  location: string;
  locationLink?: string;
  isHome: boolean;
  result?: 'win' | 'loss' | 'tie' | 'postponed' | null;
  score?: {
    team: number;
    opponent: number;
  } | null;
}

export interface PlayerStats {
  atBats: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  runs: number;
  rbi: number;
  stolenBases: number;
  walks: number;
  strikeouts: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  stats: PlayerStats;
}

export interface TeamStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  battingAverage: string;
  totalRuns: number;
  totalHits: number;
  totalRBI: number;
}