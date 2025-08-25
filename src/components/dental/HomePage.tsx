
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Shield,
  Heart,
  Smile,
  Users,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useDental } from '../../contexts/DentalContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { services, team, contactInfo } = useDental();

  const featuredServices = services.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="mb-4">
                <Award className="h-4 w-4 mr-2" />
                Award-Winning Dental Practice
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
                Your Perfect Smile 
                <span className="text-primary block">Starts Here</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience exceptional dental care at Tewkesbury Dental Practice. 
                Our expert team provides comprehensive treatments in a comfortable, 
                modern environment using the latest technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
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
                  onClick={() => navigate('/services')}
                >
                  View Services
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Open Today</p>
                    <p className="text-muted-foreground">8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-professional-lg p-8 border border-border">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                  <Smile className="h-24 w-24 text-primary" />
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Patient Satisfaction</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 font-semibold">4.9/5</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Years of Experience</span>
                    <span className="font-semibold text-primary">15+</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Happy Patients</span>
                    <span className="font-semibold text-primary">2,500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Heart className="h-4 w-4 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Comprehensive Dental Care
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From routine check-ups to complex treatments, we provide a full range 
              of dental services to keep your smile healthy and beautiful.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card key={service.id} className="card-hover group cursor-pointer">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-primary">{service.price}</span>
                    <span className="text-sm text-muted-foreground">{service.duration}</span>
                  </div>
                  <div className="space-y-2">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/services')}
            >
              View All Services
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Excellence in Dental Care
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Expert Team',
                description: 'Highly qualified dentists with years of experience'
              },
              {
                icon: Shield,
                title: 'Latest Technology',
                description: 'State-of-the-art equipment for precise treatments'
              },
              {
                icon: Heart,
                title: 'Gentle Care',
                description: 'Comfortable treatments with a caring approach'
              },
              {
                icon: Users,
                title: 'Family Friendly',
                description: 'Welcoming environment for patients of all ages'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Users className="h-4 w-4 mr-2" />
              Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Meet Our Dental Experts
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our experienced team of dental professionals is dedicated to providing 
              you with the highest quality care in a comfortable environment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.id} className="text-center p-6 card-hover">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio.substring(0, 80)}...</p>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/team')}
            >
              Meet Our Full Team
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to schedule your consultation and take the first step 
            towards a healthier, more confident smile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/book-appointment')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => navigate('/contact')}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>{contactInfo.address}</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-5 w-5" />
              <span>{contactInfo.phone}</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-5 w-5" />
              <span>Mon-Fri: 8AM-6PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
