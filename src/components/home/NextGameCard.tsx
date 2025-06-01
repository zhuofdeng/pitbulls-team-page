import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { MapPin, Clock } from 'lucide-react';
import { Game } from '../../types';
import { Link } from 'react-router-dom';
// If the file exists elsewhere, update the path accordingly, for example:
import { getGameDateTime } from '../../utils/gametime';

interface NextGameCardProps {
  game: Game;
}

const NextGameCard: React.FC<NextGameCardProps> = ({ game }) => {
  const gameDateTime = getGameDateTime(game);
  const now = new Date();
  const isToday = gameDateTime.toDateString() === now.toDateString();
  const timeRemaining = isToday
    ? "Today!"
    : formatDistanceToNow(gameDateTime, { addSuffix: true });
  const formattedDate = format(gameDateTime, 'EEEE, MMMM d, yyyy');

  return (
    <div className="card p-6 bg-white hover:transform hover:scale-102 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="heading-md text-primary-800">Next Game</h3>
        <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
          {timeRemaining}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-800 font-bold">PB</span>
            </div>
            <span className="mx-3 text-gray-500">vs</span>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-800 font-bold">{game.opponent.substring(0, 2)}</span>
            </div>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${game.isHome ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-700'}`}>
              {game.isHome ? 'Home' : 'Away'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-700">
          <Clock size={18} className="mr-2 text-secondary-600" />
          <div>
            <div>{formattedDate}</div>
            <div className="text-sm">{game.time}</div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-700">
          <MapPin size={18} className="mr-2 text-secondary-600" />
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
      
      <div className="flex justify-between">
        <Link to="/schedule" className="btn btn-primary">
          View Full Schedule
        </Link>
      </div>
    </div>
  );
};

export default NextGameCard;