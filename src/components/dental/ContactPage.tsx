
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  AlertTriangle,
  Car,
  Bus,
  Navigation
} from 'lucide-react';
import { useDental } from '../../contexts/DentalContext';
import { toast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { contactInfo } = useDental();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to a server
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Phone className="h-4 w-4 mr-2" />
            Contact Us
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our services or want to schedule an appointment? 
            We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-professional">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <Label htmlFor="name" className="form-label">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <Label htmlFor="phone" className="form-label">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Label htmlFor="email" className="form-label">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="subject" className="form-label">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="message" className="form-label">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input min-h-[120px] resize-none"
                    placeholder="Please describe your inquiry or concern..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full btn-primary" size="lg">
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className="text-muted-foreground">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(contactInfo.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="font-medium">{day}</span>
                      <span className={`text-muted-foreground ${
                        hours.includes('Emergency') ? 'text-warning' : ''
                      }`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Dental Emergency?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have a dental emergency outside of our normal hours, 
                  please call our emergency line:
                </p>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => window.open(`tel:${contactInfo.emergencyPhone}`, '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency: {contactInfo.emergencyPhone}
                </Button>
              </CardContent>
            </Card>

            {/* Directions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  How to Find Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">By Car</h4>
                    <p className="text-sm text-muted-foreground">
                      Free parking available on High Street and nearby car parks. 
                      We're located in the town center, easily accessible from the M5.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bus className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Public Transport</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular bus services stop near our practice. Tewkesbury train station 
                      is a 10-minute walk away with connections to major cities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mt-12">
          <CardContent className="p-0">
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map would go here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  High Street, Tewkesbury, Gloucestershire GL20 5AL
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
