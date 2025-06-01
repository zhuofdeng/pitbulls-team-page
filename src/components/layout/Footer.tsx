import React from 'react';
import { Link } from 'react-router-dom';
import { Baseline as Baseball} from 'lucide-react';

const Footer: React.FC = () => {
  
  return (
    <footer className="bg-primary-950 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Baseball size={32} className="text-white" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-xl font-bold">Pitbulls</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4">
              Developing young athletes into skilled baseball players and outstanding individuals through teamwork, discipline, and fun.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-300 hover:text-white transition-colors">Game Schedule</Link>
              </li>
              <li>
                <Link to="/stats" className="text-gray-300 hover:text-white transition-colors">Player Stats</Link>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;