import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Calendar, TrendingUp } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import AdminGameForm from '../components/admin/AdminGameForm';
import AdminPlayerStatsForm from '../components/admin/AdminPlayerStatsForm';
import { Game } from '../types';
import { format, parseISO } from 'date-fns';

const AdminPage: React.FC = () => {
  const { games, players, addGame, updateGame, deleteGame, updatePlayerStats } = useTeam();
  
  const [activeTab, setActiveTab] = useState('schedule');
  const [showAddGameForm, setShowAddGameForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  
  // Handle form submission for adding/editing a game
  const handleGameSubmit = (game: Game) => {
    if (editingGame) {
      updateGame(game.id, game);
      setEditingGame(null);
    } else {
      addGame(game);
      setShowAddGameForm(false);
    }
  };
  
  // Handle game deletion
  const handleDeleteGame = (gameId: string) => {
    if (confirm('Are you sure you want to delete this game?')) {
      deleteGame(gameId);
    }
  };
  
  // Sort games by date
  const sortedGames = [...games].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="bg-primary-800 text-white py-8">
        <div className="container-custom">
          <h1 className="heading-lg">Coach Admin Portal</h1>
          <p className="opacity-80">Manage team schedule and player statistics</p>
        </div>
      </section>
      
      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="container-custom">
          <div className="flex">
            <button 
              className={`px-4 py-3 font-medium border-b-2 flex items-center ${
                activeTab === 'schedule' 
                  ? 'border-primary-600 text-primary-800' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('schedule')}
            >
              <Calendar size={18} className="mr-1" />
              Schedule Management
            </button>
            <button 
              className={`px-4 py-3 font-medium border-b-2 flex items-center ${
                activeTab === 'stats' 
                  ? 'border-primary-600 text-primary-800' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              <TrendingUp size={18} className="mr-1" />
              Player Stats
            </button>
          </div>
        </div>
      </section>
      
      {/* Admin Content */}
      <section className="py-8">
        <div className="container-custom">
          {/* Schedule Management Tab */}
          {activeTab === 'schedule' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="heading-md text-primary-800">Team Schedule</h2>
                
                {!showAddGameForm && !editingGame && (
                  <button 
                    className="btn btn-primary flex items-center"
                    onClick={() => setShowAddGameForm(true)}
                  >
                    <Plus size={18} className="mr-1" />
                    Add Game
                  </button>
                )}
              </div>
              
              {/* Add/Edit Game Form */}
              {(showAddGameForm || editingGame) && (
                <div className="card p-6 mb-6 animate-fadeIn">
                  <h3 className="heading-sm text-primary-800 mb-4">
                    {editingGame ? 'Edit Game' : 'Add New Game'}
                  </h3>
                  
                  <AdminGameForm 
                    game={editingGame || undefined}
                    onSubmit={handleGameSubmit}
                  />
                  
                  <button 
                    className="mt-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setShowAddGameForm(false);
                      setEditingGame(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
              
              {/* Game List */}
              {!showAddGameForm && !editingGame && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date & Time</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Opponent</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Location</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sortedGames.length > 0 ? (
                        sortedGames.map(game => (
                          <tr key={game.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium">{format(parseISO(game.date), 'MMM d, yyyy')}</div>
                              <div className="text-sm text-gray-500">{game.time}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{game.opponent}</div>
                              <div className="text-sm text-gray-500">
                                {game.isHome ? 'Home Game' : 'Away Game'}
                              </div>
                            </td>
                            <td className="py-3 px-4">{game.location}</td>
                            <td className="py-3 px-4">
                              {game.result ? (
                                <div>
                                  <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                    game.result === 'win' 
                                      ? 'bg-success-100 text-success-800' 
                                      : game.result === 'loss'
                                        ? 'bg-error-100 text-error-800'
                                        : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {game.result === 'win' ? 'Win' : game.result === 'loss' ? 'Loss' : 'Tie'}
                                  </span>
                                  {game.score && (
                                    <div className="text-sm text-gray-500 mt-1">
                                      {game.score.team} - {game.score.opponent}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-500">
                                  {new Date(game.date) < new Date() ? 'Needs Score' : 'Upcoming'}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center space-x-2">
                                <button 
                                  className="p-1 text-primary-600 hover:text-primary-800"
                                  onClick={() => setEditingGame(game)}
                                  title="Edit Game"
                                >
                                  <Edit3 size={18} />
                                </button>
                                <button 
                                  className="p-1 text-error-600 hover:text-error-800"
                                  onClick={() => handleDeleteGame(game.id)}
                                  title="Delete Game"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-500">
                            No games have been added to the schedule.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {/* Player Stats Tab */}
          {activeTab === 'stats' && (
            <div>
              <h2 className="heading-md text-primary-800 mb-6">Update Player Statistics</h2>
              
              {editingPlayerId ? (
                <div className="card p-6 mb-6 animate-fadeIn">
                  <h3 className="heading-sm text-primary-800 mb-4">
                    Update Player Stats
                  </h3>
                  
                  <AdminPlayerStatsForm 
                    player={players.find(p => p.id === editingPlayerId)!}
                    onSubmit={(playerId, stats) => {
                      updatePlayerStats(playerId, stats);
                      setEditingPlayerId(null);
                    }}
                  />
                  
                  <button 
                    className="mt-4 text-gray-500 hover:text-gray-700"
                    onClick={() => setEditingPlayerId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Player</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Position</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">AVG</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">HR</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">RBI</th>
                        <th className="py-3 px-4 text-center text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {players.length > 0 ? (
                        players.map(player => (
                          <tr key={player.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium">
                                #{player.number} {player.name}
                              </div>
                            </td>
                            <td className="py-3 px-4">{player.position}</td>
                            <td className="py-3 px-4 text-center">
                              {player.stats.atBats > 0 
                                ? (player.stats.hits / player.stats.atBats).toFixed(3).substring(1) 
                                : '.000'}
                            </td>
                            <td className="py-3 px-4 text-center">{player.stats.homeRuns}</td>
                            <td className="py-3 px-4 text-center">{player.stats.rbi}</td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center">
                                <button 
                                  className="p-1 text-primary-600 hover:text-primary-800"
                                  onClick={() => setEditingPlayerId(player.id)}
                                  title="Update Stats"
                                >
                                  <Edit3 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-gray-500">
                            No players have been added to the roster.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;