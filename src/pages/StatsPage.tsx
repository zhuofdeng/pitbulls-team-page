import React, { useState } from 'react';
import { TrendingUp, Trophy } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import PlayerStatsTable from '../components/stats/PlayerStatsTable';

const StatsPage: React.FC = () => {
  const { teamStats } = useTeam();
  const [activeTab, setActiveTab] = useState('player');
  
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="bg-primary-800 text-white py-10">
        <div className="container-custom">
          <div className="flex items-center mb-2">
            <TrendingUp size={24} className="mr-2" />
            <h1 className="heading-lg">Team Statistics</h1>
          </div>
          <p className="opacity-80">Season performance metrics for team and individual players</p>
        </div>
      </section>
      
      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="container-custom">
          <div className="flex">
            <button 
              className={`px-4 py-3 font-medium border-b-2 ${
                activeTab === 'player' 
                  ? 'border-primary-600 text-primary-800' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('player')}
            >
              Player Stats
            </button>
          </div>
        </div>
      </section>
      
      {/* Stats Content */}
      <section className="py-8">
        <div className="container-custom">
          {/* Player Stats Tab */}
          {activeTab === 'player' && (
            <div>
              
              <h2 className="heading-md text-primary-800 mb-6">Team Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <Trophy size={24} className="text-primary-600 mr-2" />
                    <h3 className="heading-sm text-primary-800">Season Record</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-gray-500 mb-1">Games Played</div>
                      <div className="text-3xl font-bold text-primary-800">{teamStats.gamesPlayed}</div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary-50 rounded-lg">
                      <div className="text-gray-500 mb-1">Record</div>
                      <div className="text-3xl font-bold text-primary-800">
                        {teamStats.wins}-{teamStats.losses}
                      </div>
                      <div className="text-sm text-gray-500">
                        {teamStats.gamesPlayed > 0
                          ? `${((teamStats.wins / teamStats.gamesPlayed) * 100).toFixed(1)}%`
                          : '0.0%'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary-600"
                      style={{ 
                        width: teamStats.gamesPlayed > 0 
                          ? `${(teamStats.wins / teamStats.gamesPlayed) * 100}%` 
                          : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <h2 className="heading-md text-primary-800 mb-6">Individual Player Statistics</h2>
              
              <PlayerStatsTable/>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-md text-sm text-gray-600">
                <p className="font-medium mb-1">Stats Legend:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-2">
                  <div><strong>AB</strong>: At Bats</div>
                  <div><strong>H</strong>: Hits</div>
                  <div><strong>2B</strong>: Doubles</div>
                  <div><strong>3B</strong>: Triples</div>
                  <div><strong>HR</strong>: Home Runs</div>
                  <div><strong>R</strong>: Runs</div>
                  <div><strong>RBI</strong>: Runs Batted In</div>
                  <div><strong>SB</strong>: Stolen Bases</div>
                  <div><strong>BB</strong>: Walks</div>
                  <div><strong>SO</strong>: Strikeouts</div>
                  <div><strong>AVG</strong>: Batting Average</div>
                  <div><strong>IP</strong>: Innings Pitched</div>
                  <div><strong>ERA</strong>: Earned Run Average</div>
                  <div><strong>HIT</strong>: Hits Allowed</div>
                  <div><strong>ER</strong>: Earned Runs</div>
                  <div><strong>WB</strong>: Walked Batter</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StatsPage;