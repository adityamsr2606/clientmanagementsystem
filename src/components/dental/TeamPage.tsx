
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Calendar,
  Mail,
  ArrowRight
} from 'lucide-react';
import { useDental } from '../../contexts/DentalContext';
import { useNavigate } from 'react-router-dom';

const TeamPage = () => {
  const navigate = useNavigate();
  const { team } = useDental();

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Users className="h-4 w-4 mr-2" />
            Our Team
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Meet Our Dental Experts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our experienced and caring team of dental professionals is dedicated to providing 
            you with the highest quality care in a comfortable and welcoming environment.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {team.map((member) => (
            <Card key={member.id} className="card-hover overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-6">
                  {/* Profile Image Placeholder */}
                  <div className="w-24 h-24 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{member.name}</CardTitle>
                    <p className="text-primary font-semibold text-lg mb-3">{member.role}</p>
                    
                    {/* Qualifications */}
                    <div className="flex flex-wrap gap-2">
                      {member.qualifications.map((qualification, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {qualification}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Bio */}
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
                
                {/* Specialties */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="bg-secondary/20 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Our Team Excels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to continuous education and patient care sets us apart
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Years Experience', icon: Award },
              { number: '2,500+', label: 'Happy Patients', icon: Users },
              { number: '50+', label: 'Hours Annual Training', icon: GraduationCap },
              { number: '24/7', label: 'Emergency Support', icon: Calendar }
            ].map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{stat.number}</p>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Values & Approach</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Patient-Centered Care',
                  description: 'We put your comfort and needs at the center of everything we do, ensuring a positive experience every visit.'
                },
                {
                  title: 'Continuous Learning',
                  description: 'Our team regularly attends training and conferences to stay current with the latest dental techniques and technologies.'
                },
                {
                  title: 'Gentle & Compassionate',
                  description: 'We understand dental anxiety and take extra care to ensure all our patients feel comfortable and relaxed.'
                },
                {
                  title: 'Excellence in Everything',
                  description: 'From our clinical care to our customer service, we strive for excellence in every aspect of your dental experience.'
                }
              ].map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-professional">
            <h3 className="font-semibold text-lg mb-4">Join Our Team</h3>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented dental professionals to join our growing practice. 
              If you're passionate about providing excellent patient care, we'd love to hear from you.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm">Competitive compensation packages</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-sm">Continuing education support</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Collaborative team environment</span>
              </div>
            </div>
            
            <Button className="w-full btn-primary">
              <Mail className="h-4 w-4 mr-2" />
              Send Your CV
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Meet Our Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a consultation today and experience our personalized approach to dental care.
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

export default TeamPage;
