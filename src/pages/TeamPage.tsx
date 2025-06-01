import React from 'react';
import { Users } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import PlayerCard from '../components/team/PlayerCard';

const TeamPage: React.FC = () => {
  const { players } = useTeam();
  
  // Group players by position
  const groupedPlayers = players.reduce((acc, player) => {
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    
    acc[player.position].push(player);
    return acc;
  }, {} as Record<string, typeof players>);
  
  // Define position order for display
  const positionOrder = [
    'Pitcher',
    'Catcher',
    'First Base',
    'Second Base',
    'Shortstop',
    'Third Base',
    'Left Field',
    'Center Field',
    'Right Field',
  ];
  
  // Sort positions based on predefined order
  const sortedPositions = Object.keys(groupedPlayers).sort((a, b) => {
    return positionOrder.indexOf(a) - positionOrder.indexOf(b);
  });
  
  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <section className="bg-primary-800 text-white py-10">
        <div className="container-custom">
          <div className="flex items-center mb-2">
            <Users size={24} className="mr-2" />
            <h1 className="heading-lg">Meet the Team</h1>
          </div>
          <p className="opacity-80">Get to know our talented players and coaching staff</p>
        </div>
      </section>
      
      {/* Team Photo */}
      <section className="bg-white py-8 border-b">
        <div className="container-custom">
          <div className="aspect-[16/6] max-h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Team Photo</p>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="heading-md text-primary-800">Pitbulls Baseball</h2>
            <p className="text-gray-600">Youth Baseball Team - Spring 2025 Season</p>
          </div>
        </div>
      </section>
      
      {/* Players Section */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="heading-md text-primary-800 mb-8">Player Roster</h2>
          
          {sortedPositions.length > 0 ? (
            sortedPositions.map(position => (
              <div key={position} className="mb-12">
                <h3 className="heading-sm text-gray-700 mb-4 pb-2 border-b">{position}s</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groupedPlayers[position].map(player => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No players have been added to the roster yet.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Coaching Staff */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-md text-primary-800 mb-8">Coaching Staff</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary-200 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary-600">M</span>
              </div>
              <h3 className="heading-sm text-primary-800 mb-1">Michael Johnson</h3>
              <p className="text-secondary-600 mb-4">Head Coach</p>
              <p className="text-gray-600 text-sm">
                Coach Johnson has been coaching youth baseball for over 10 years. 
                He focuses on fundamentals, teamwork, and having fun while developing 
                solid baseball skills.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary-200 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary-600">S</span>
              </div>
              <h3 className="heading-sm text-primary-800 mb-1">Sarah Wilson</h3>
              <p className="text-secondary-600 mb-4">Assistant Coach</p>
              <p className="text-gray-600 text-sm">
                Coach Wilson specializes in batting technique and brings her experience 
                as a former college softball player to help our team develop their hitting skills.
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-primary-200 mx-auto flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary-600">D</span>
              </div>
              <h3 className="heading-sm text-primary-800 mb-1">David Thompson</h3>
              <p className="text-secondary-600 mb-4">Pitching Coach</p>
              <p className="text-gray-600 text-sm">
                Coach Thompson focuses on developing our pitchers with proper mechanics 
                and pitch selection. He emphasizes control and consistency over velocity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;