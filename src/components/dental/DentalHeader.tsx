
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Phone, 
  Clock, 
  MapPin, 
  Smile,
  Calendar
} from 'lucide-react';
import { useDental } from '../../contexts/DentalContext';

const DentalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { contactInfo } = useDental();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Our Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Mon-Fri: 8AM-6PM</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden md:inline">{contactInfo.address}</span>
            <span className="md:hidden">Tewkesbury, GL20 5AL</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Smile className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Tewkesbury Dental
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete Dental Care
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(item.href) 
                    ? 'text-primary' 
                    : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => window.open(`tel:${contactInfo.phone}`, '_self')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            
            <Button
              className="btn-primary"
              onClick={() => navigate('/book-appointment')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Online
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col gap-4 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive(item.href) 
                      ? 'text-primary' 
                      : 'text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(`tel:${contactInfo.phone}`, '_self');
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                
                <Button
                  className="btn-primary justify-start"
                  onClick={() => {
                    navigate('/book-appointment');
                    setIsMenuOpen(false);
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default DentalHeader;
