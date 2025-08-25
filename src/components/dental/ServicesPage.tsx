
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Shield,
  Sparkles,
  Grid3x3,
  Anchor,
  AlertTriangle,
  Heart,
  ArrowRight
} from 'lucide-react';
import { useDental } from '../../contexts/DentalContext';

const serviceIcons: Record<string, any> = {
  'Stethoscope': Shield,
  'Sparkles': Sparkles,
  'Grid3x3': Grid3x3,
  'Anchor': Anchor,
  'AlertTriangle': AlertTriangle,
  'Heart': Heart
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const { services } = useDental();

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Our Services
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive Dental Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer a complete range of dental treatments using the latest technology 
            and techniques to ensure the best possible outcomes for our patients.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = serviceIcons[service.icon] || Shield;
            
            return (
              <Card key={service.id} className="card-hover group h-full">
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col flex-1">
                  <p className="text-muted-foreground mb-6 flex-1">
                    {service.description}
                  </p>
                  
                  <div className="space-y-4">
                    {/* Price and Duration */}
                    <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary">{service.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        What's Included:
                      </h4>
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Book Button */}
                    <Button 
                      className="w-full btn-primary mt-4"
                      onClick={() => navigate('/book-appointment', { 
                        state: { selectedService: service.name } 
                      })}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book This Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="bg-secondary/20 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Advanced Technology & Techniques
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Tewkesbury Dental Practice, we invest in the latest dental technology 
                to provide our patients with the most effective and comfortable treatments available. 
                Our modern equipment ensures precise diagnoses and superior treatment outcomes.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  'Digital X-Rays',
                  'Intraoral Cameras',
                  'Laser Dentistry',
                  'CAD/CAM Technology'
                ].map((tech, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => navigate('/contact')}
              >
                Learn More About Our Technology
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-professional">
              <h3 className="font-semibold text-lg mb-4">Emergency Dental Care</h3>
              <p className="text-muted-foreground mb-4">
                Dental emergencies can happen at any time. We provide prompt emergency 
                care to relieve pain and address urgent dental problems.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm">Same-day emergency appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm">Out-of-hours emergency line</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm">Pain relief treatments</span>
                </div>
              </div>
              
              <Button 
                className="w-full btn-primary"
                onClick={() => navigate('/contact')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Contact
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Treatment?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our friendly team is ready to help you achieve optimal oral health. 
            Contact us today to schedule your consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-primary"
              onClick={() => navigate('/book-appointment')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Contact Us
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
