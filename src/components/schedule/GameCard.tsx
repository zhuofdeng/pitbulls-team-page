import React from 'react';
import { MapPin, Clock, Trophy, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { Game } from '../../types';
import { parseISO } from 'date-fns';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const gameDate = parseISO(game.date); // Ensures the date is parsed correctly
  const formattedDate = format(gameDate, 'EEEE, MMMM d, yyyy');
  const isPast = gameDate < new Date();
  
  return (
    <div className={`card overflow-hidden animate-fadeIn ${isPast && !game.result ? 'opacity-70' : ''}`}>
      {/* Top Bar - Home/Away + Date */}
      <div className={`py-2 px-4 ${game.isHome ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'} flex justify-between items-center`}>
        <div className="flex items-center">
          {game.isHome ? (
            <>
              <Shield size={16} className="mr-1" />
              <span className="text-sm font-medium">Home Game</span>
            </>
          ) : (
            <>
              <MapPin size={16} className="mr-1" />
              <span className="text-sm font-medium">Away Game</span>
            </>
          )}
        </div>
        <div className="text-sm">{formattedDate}</div>
      </div>
      
      {/* Game Details */}
      <div className="p-4">
        {/* Teams */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-primary-800">PB</span>
            </div>
            <span className="font-bold text-lg mx-2">Pitbulls</span>
          </div>
          
          <div className="text-lg font-bold">vs</div>
          
          <div className="flex items-center">
            <span className="font-bold text-lg mx-2">{game.opponent}</span>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="font-bold text-gray-800">{game.opponent.substring(0, 2)}</span>
            </div>
          </div>
        </div>
        
        {/* Game Result (if available) */}
        {game.result && game.score && (
          <div className={`mb-4 p-3 rounded-md text-center ${
            game.result === 'win' ? 'bg-success-100 text-success-800' : 
            game.result === 'loss' ? 'bg-error-100 text-error-800' : 
            'bg-gray-100 text-gray-800'
          }`}>


        {/* Game status if it was cancelled/posponed) */}
            {game.result === 'postponed' && (
              <div className={`mb-4 p-3 rounded-md text-center 'bg-error-100 text-error-800' : 
                'bg-gray-100 text-gray-800`}>
                <div className="text-sm mb-1">Postponed/ Rained Out</div>
              </div>
            )}

            {(game.result === 'win' || game.result === 'loss') && (
              <div>
                <div className="text-sm mb-1">Final Score</div>
                <div className="text-xl font-bold">
                  Pitbulls {game.score.team} - {game.score.opponent} {game.opponent}
                </div>
                <div className="text-sm mt-1 font-medium">
                  {game.result === 'win' ? 'Victory!' : game.result === 'loss' ? 'Defeat' : 'Tie Game'}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Game Information */}
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <Clock size={18} className="mr-2 text-secondary-500" />
            <span>{game.time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin size={18} className="mr-2 text-secondary-500" />
            <span>{game.location}</span>
            <a 
              href={game.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-primary-600 hover:underline"
            >
              View on Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;