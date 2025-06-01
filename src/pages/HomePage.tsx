import React from 'react';
import { Link } from 'react-router-dom';
import { Baseline as Baseball, Calendar, TrendingUp } from 'lucide-react';
import { useTeam } from '../context/TeamContext';
import NextGameCard from '../components/home/NextGameCard';

const HomePage: React.FC = () => {
  const { upcomingGame } = useTeam();
  
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-primary-950 text-white">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ 
            backgroundImage: "url(/pitbull.jpg)",
            backgroundSize: "contain", // Change to fit the image
            backgroundRepeat: "repeat" // tile the image
          }}
        />
        <div className="container-custom relative py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="heading-xl mb-4 max-w-3xl">
            PITBULLS
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
            Building character, teamwork, and baseball skills in young athletes
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/schedule" className="btn bg-white text-primary-900 hover:bg-gray-100">
              View Schedule
            </Link>
            <Link to="/stats" className="btn bg-secondary-600 text-white hover:bg-secondary-700">
              Player Stats
            </Link>
          </div>
        </div>
      </section>
      
      {/* Quick Links */}
      <section className="bg-white py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/schedule" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors">
              <Calendar size={24} className="text-primary-600 mr-3" />
              <span className="font-semibold">Game Schedule</span>
            </Link>
            <Link to="/stats" className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors">
              <TrendingUp size={24} className="text-primary-600 mr-3" />
              <span className="font-semibold">Team Stats</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Next Game */}
            <div className="space-y-6">
              <h2 className="heading-lg text-primary-800 border-b border-gray-200 pb-2">Upcoming Game</h2>
              
              {upcomingGame ? (
                <NextGameCard game={upcomingGame} />
              ) : (
                <div className="card p-6 bg-white text-center">
                  <p className="text-gray-500">No upcoming games scheduled.</p>
                </div>
              )}
            </div>
            
            {/* Right Column - Stats & Announcements */}
            <div className="space-y-6">
              <div className="card p-6 bg-white">
                <h3 className="heading-sm text-primary-800 mb-4">Announcements</h3>
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-primary-500 bg-primary-50">
                    <p className="font-medium text-gray-800">Team Photos</p>
                    <p className="text-sm text-gray-600">
                      Team photos will be taken  on June 8th. Time will be announced soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component for MapPin since it wasn't imported at the top
const MapPin = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default HomePage;