import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { TeamStats } from '../../types';
import { Link } from 'react-router-dom';

interface TeamStatsCardProps {
  stats: TeamStats;
}

const TeamStatsCard: React.FC<TeamStatsCardProps> = ({ stats }) => {
  const calculatedWinPercentage = stats.gamesPlayed > 0 
    ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1)
    : '0.0';
    
  return (
    <div className="card p-6 bg-white hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="heading-md text-primary-800">Team Stats</h3>
        <Trophy size={20} className="text-secondary-600" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Record</div>
          <div className="text-xl font-bold text-primary-800">{stats.wins} - {stats.losses}</div>
        </div>
        
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Win %</div>
          <div className="text-xl font-bold text-primary-800">{calculatedWinPercentage}%</div>
        </div>
        
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Avg</div>
          <div className="text-xl font-bold text-primary-800">{stats.battingAverage}</div>
        </div>
        
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Runs</div>
          <div className="text-xl font-bold text-primary-800">{stats.totalRuns}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Link to="/stats" className="btn btn-primary">
          View Detailed Stats
        </Link>
        
        <div className="flex items-center text-success-700">
          <TrendingUp size={18} className="mr-1" />
          <span className="text-sm font-medium">Season Trending Up</span>
        </div>
      </div>
    </div>
  );
};

export default TeamStatsCard;