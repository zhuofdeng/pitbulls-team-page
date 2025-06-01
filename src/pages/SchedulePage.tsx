import React, { useState } from 'react';
import { Calendar, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import GameCard from '../components/schedule/GameCard';
import { Game } from '../types';
import { format, parseISO } from 'date-fns';

const SchedulePage: React.FC = () => {
  const { games } = useTeam();
  const [showFilters, setShowFilters] = useState(false);
  const [filterHome, setFilterHome] = useState<boolean | null>(null);
  const [filterPlayed, setFilterPlayed] = useState<boolean | null>(null);
  
  // Group games by month
  const gamesByMonth = games.reduce((acc, game) => {
    const date = parseISO(game.date);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(game);
    return acc;
  }, {} as Record<string, Game[]>);
  
  // Sort months chronologically
  const sortedMonths = Object.keys(gamesByMonth).sort((a, b) => {
    return parseISO(gamesByMonth[a][0].date).getTime() - parseISO(gamesByMonth[b][0].date).getTime();
  });
  
  // Apply filters
  const filteredGames = (monthGames: Game[]) => {
    return monthGames.filter(game => {
      // Filter home/away games
      if (filterHome !== null && game.isHome !== filterHome) {
        return false;
      }
      
      // Filter played/upcoming games
      if (filterPlayed !== null) {
        const isPlayed = game.result !== null;
        if (isPlayed !== filterPlayed) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  // Toggle filters display
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilterHome(null);
    setFilterPlayed(null);
  };
  
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="bg-primary-800 text-white py-10">
        <div className="container-custom">
          <div className="flex items-center mb-2">
            <Calendar size={24} className="mr-2" />
            <h1 className="heading-lg">Season Schedule</h1>
          </div>
          <p className="opacity-80">View all upcoming and past games for the season</p>
        </div>
      </section>
      
      {/* Filters */}
      <section className="bg-white border-b">
        <div className="container-custom py-4">
          <button 
            className="flex items-center justify-between w-full md:w-auto px-4 py-2 bg-gray-100 rounded-md"
            onClick={toggleFilters}
          >
            <div className="flex items-center">
              <Filter size={18} className="mr-2 text-primary-600" />
              <span className="font-medium">Filter Games</span>
            </div>
            {showFilters ? (
              <ChevronUp size={18} className="ml-2" />
            ) : (
              <ChevronDown size={18} className="ml-2" />
            )}
          </button>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md animate-fadeIn">
              <div className="flex flex-wrap gap-4">
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">Game Location</span>
                  <div className="flex space-x-2">
                    <button 
                      className={`px-3 py-1 rounded-md text-sm ${filterHome === true ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => setFilterHome(filterHome === true ? null : true)}
                    >
                      Home
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-md text-sm ${filterHome === false ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => setFilterHome(filterHome === false ? null : false)}
                    >
                      Away
                    </button>
                  </div>
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-1">Game Status</span>
                  <div className="flex space-x-2">
                    <button 
                      className={`px-3 py-1 rounded-md text-sm ${filterPlayed === true ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => setFilterPlayed(filterPlayed === true ? null : true)}
                    >
                      Played
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-md text-sm ${filterPlayed === false ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                      onClick={() => setFilterPlayed(filterPlayed === false ? null : false)}
                    >
                      Upcoming
                    </button>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button 
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-400"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Schedule Content */}
      <section className="py-8">
        <div className="container-custom">
          {sortedMonths.length > 0 ? (
            sortedMonths.map(month => {
              const monthFilteredGames = filteredGames(gamesByMonth[month]);
              
              // Skip months with no games after filtering
              if (monthFilteredGames.length === 0) {
                return null;
              }
              
              return (
                <div key={month} className="mb-10">
                  <h2 className="heading-md text-primary-800 mb-4">{month}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {monthFilteredGames.map(game => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No games have been scheduled for this season yet.</p>
            </div>
          )}
          
          {sortedMonths.length > 0 && 
           sortedMonths.every(month => filteredGames(gamesByMonth[month]).length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No games match your filter criteria.</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;