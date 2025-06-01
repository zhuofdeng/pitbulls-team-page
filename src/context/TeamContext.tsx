import React, { createContext, useContext, useState, useEffect } from 'react';
import { Game, Player, TeamStats } from '../types';
import { sampleGames, samplePlayers, sampleTeamStats } from '../data/sampleData';
import { getGameDateTime } from '../utils/gametime';

interface TeamContextType {
  games: Game[];
  players: Player[];
  teamStats: TeamStats;
  upcomingGame: Game | null;
  addGame: (game: Game) => void;
  updateGame: (gameId: string, updatedGame: Partial<Game>) => void;
  deleteGame: (gameId: string) => void;
  updatePlayerStats: (playerId: string, stats: Partial<Player['stats']>) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Function to fetch and parse games data
const fetchGamesData = async (): Promise<Game[]> => {
  const response = await fetch(`/games.json?v=${Date.now()}`); // bust cache
  const gamesData = await response.text();
  const parsedGamesData: Game[] = JSON.parse(gamesData);

  return parsedGamesData.map((game: Game) => ({
    id: game.id,
    date: game.date,
    time: game.time,
    opponent: game.opponent,
    location: game.location,
    locationLink: game.locationLink,
    isHome: game.isHome,
    result: game.result,
    score: {
      team: game?.score?.team ?? 0,
      opponent: game?.score?.opponent ?? 0,
    },
  }));
};

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>(sampleGames);
  const [players, setPlayers] = useState<Player[]>(samplePlayers);
  const [teamStats, setTeamStats] = useState<TeamStats>(sampleTeamStats);

  const now = new Date();
  // Get the next upcoming game
  const upcomingGame = games
    .filter(game => getGameDateTime(game) >= now)
    .sort((a, b) => getGameDateTime(a).getTime() - getGameDateTime(b).getTime())[0] || null;

  // Add a new game
  const addGame = (game: Game) => {
    setGames(prevGames => [...prevGames, game]);
  };

  // Update an existing game
  const updateGame = (gameId: string, updatedGame: Partial<Game>) => {
    setGames(prevGames => 
      prevGames.map(game => 
        game.id === gameId ? { ...game, ...updatedGame } : game
      )
    );
  };

  // Delete a game
  const deleteGame = (gameId: string) => {
    setGames(prevGames => prevGames.filter(game => game.id !== gameId));
  };

  // Update a player's stats
  const updatePlayerStats = (playerId: string, stats: Partial<Player['stats']>) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === playerId 
          ? { ...player, stats: { ...player.stats, ...stats } } 
          : player
      )
    );
    
    // Recalculate team stats when player stats change
    calculateTeamStats();
  };

  // Calculate team stats based on individual player stats
  const calculateTeamStats = () => {
    const totalAtBats = players.reduce((sum, player) => sum + player.stats.atBats, 0);
    const totalHits = players.reduce((sum, player) => sum + player.stats.hits, 0);
    const totalRuns = players.reduce((sum, player) => sum + player.stats.runs, 0);
    const totalRBI = players.reduce((sum, player) => sum + player.stats.rbi, 0);
    
    setTeamStats({
      gamesPlayed: games.filter(game => (game.result && game.result !== 'postponed')).length,
      wins: games.filter(game => game.result === 'win').length,
      losses: games.filter(game => game.result === 'loss').length,
      battingAverage: totalAtBats > 0 ? (totalHits / totalAtBats).toFixed(3) : '0.000',
      totalRuns,
      totalHits,
      totalRBI,
    });
  };

  // Calculate team stats whenever games or players change
  useEffect(() => {
    calculateTeamStats();
  }, [games, players]);

  useEffect
  (() => {
    fetchGamesData()
      .then(fetchedGames => {
        setGames(fetchedGames);
      })
      .catch(error => {
        console.error('Error fetching games data:', error);
      });
  }, []);

  return (
    <TeamContext.Provider value={{
      games,
      players,
      teamStats,
      upcomingGame,
      addGame,
      updateGame,
      deleteGame,
      updatePlayerStats,
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};