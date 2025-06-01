import React from 'react';
import { Player } from '../../types';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // Calculate batting average
  const battingAvg = player.stats.atBats > 0 
    ? (player.stats.hits / player.stats.atBats).toFixed(3).substring(1) 
    : '.000';
  
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Player Number Banner */}
      <div className="bg-primary-600 text-white text-center py-2">
        <span className="text-lg font-bold">#{player.number}</span>
      </div>
      
      {/* Player Photo */}
      <div className="bg-gray-100 h-48 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-primary-200 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary-600">{player.name.charAt(0)}</span>
        </div>
      </div>
      
      {/* Player Info */}
      <div className="p-4">
        <h3 className="heading-sm text-primary-800 mb-1">{player.name}</h3>
        <p className="text-secondary-600 mb-4">{player.position}</p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">AVG</div>
            <div className="font-bold">{battingAvg}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">RBI</div>
            <div className="font-bold">{player.stats.rbi}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">HR</div>
            <div className="font-bold">{player.stats.homeRuns}</div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <div className="flex justify-between py-1">
            <span>Hits:</span>
            <span className="font-medium">{player.stats.hits}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Runs:</span>
            <span className="font-medium">{player.stats.runs}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Stolen Bases:</span>
            <span className="font-medium">{player.stats.stolenBases}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;