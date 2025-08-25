
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Smile,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useDental } from '../../contexts/DentalContext';

const DentalFooter = () => {
  const { contactInfo } = useDental();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Our Team', href: '/team' },
    { name: 'Book Appointment', href: '/book-appointment' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const services = [
    'General Dentistry',
    'Cosmetic Dentistry', 
    'Orthodontics',
    'Dental Implants',
    'Emergency Care',
    'Periodontal Treatment'
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Practice Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Tewkesbury Dental</h3>
                <p className="text-sm text-background/70">Complete Dental Care</p>
              </div>
            </Link>
            
            <p className="text-background/70 mb-6 leading-relaxed">
              Providing exceptional dental care to the Tewkesbury community for over 15 years. 
              Our experienced team is committed to your oral health and comfort.
            </p>
            
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-background/10 p-2 rounded-lg hover:bg-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-background/70">
                    {contactInfo.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-background/70 hover:text-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-background/70">
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 2:00 PM</p>
                  <p>Sunday: Emergency Only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/20 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-background/70 text-sm">
            © 2024 Tewkesbury Dental Practice. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm text-background/70 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DentalFooter;
