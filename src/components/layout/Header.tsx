import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Baseline as Baseball } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Baseball 
              size={32} 
              className="text-primary-600"
              strokeWidth={1.5}
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary-900">Kings Bay 10U : PITBULLS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${location.pathname === '/' ? 'text-primary-800 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-700'}`}
            >
              Home
            </Link>
            <Link 
              to="/schedule" 
              className={`font-medium transition-colors ${location.pathname === '/schedule' ? 'text-primary-800 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-700'}`}
            >
              Schedule
            </Link>
            <Link 
              to="/stats" 
              className={`font-medium transition-colors ${location.pathname === '/stats' ? 'text-primary-800 border-b-2 border-primary-600' : 'text-gray-600 hover:text-primary-700'}`}
            >
              Stats
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`py-2 px-4 font-medium transition-colors ${location.pathname === '/' ? 'text-primary-800 bg-primary-50 rounded' : 'text-gray-600'}`}
              >
                Home
              </Link>
              <Link 
                to="/schedule" 
                className={`py-2 px-4 font-medium transition-colors ${location.pathname === '/schedule' ? 'text-primary-800 bg-primary-50 rounded' : 'text-gray-600'}`}
              >
                Schedule
              </Link>
              <Link 
                to="/stats" 
                className={`py-2 px-4 font-medium transition-colors ${location.pathname === '/stats' ? 'text-primary-800 bg-primary-50 rounded' : 'text-gray-600'}`}
              >
                Stats
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;