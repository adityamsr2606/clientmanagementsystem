
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useDental } from '../../contexts/DentalContext';
import { toast } from '@/hooks/use-toast';

const BookAppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { services, addAppointment } = useDental();
  
  const selectedService = location.state?.selectedService || '';
  
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    service: selectedService,
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred date';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await addAppointment(formData);
      
      if (success) {
        toast({
          title: "Appointment Request Sent!",
          description: "We'll contact you within 24 hours to confirm your appointment.",
        });
        
        // Reset form
        setFormData({
          patientName: '',
          email: '',
          phone: '',
          service: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Failed to submit appointment');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit appointment request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Book Appointment
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Schedule Your Visit
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to take care of your dental health? Fill out the form below and 
            we'll contact you to confirm your appointment within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Appointment Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-professional">
              <CardHeader>
                <CardTitle className="text-2xl">Appointment Details</CardTitle>
                <p className="text-muted-foreground">
                  Please provide your information and preferred appointment time.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <Label htmlFor="patientName" className="form-label">Full Name *</Label>
                        <Input
                          id="patientName"
                          name="patientName"
                          type="text"
                          value={formData.patientName}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Enter your full name"
                          required
                        />
                        {errors.patientName && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.patientName}
                          </p>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <Label htmlFor="phone" className="form-label">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Enter your phone number"
                          required
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
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
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Appointment Details
                    </h3>
                    
                    <div className="form-group">
                      <Label htmlFor="service" className="form-label">Service Needed *</Label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="form-input"
                        required
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.name}>
                            {service.name} - {service.price}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.service}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <Label htmlFor="preferredDate" className="form-label">Preferred Date *</Label>
                        <Input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="form-input"
                          min={today}
                          required
                        />
                        {errors.preferredDate && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.preferredDate}
                          </p>
                        )}
                      </div>
                      
                      <div className="form-group">
                        <Label htmlFor="preferredTime" className="form-label">Preferred Time *</Label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          className="form-input"
                          required
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {errors.preferredTime && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.preferredTime}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="form-group">
                    <Label htmlFor="message" className="form-label flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Additional Information (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input min-h-[100px] resize-none"
                      placeholder="Any specific concerns, dental anxiety, or special requirements?"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting Request...'
                    ) : (
                      <>
                        <Calendar className="h-5 w-5 mr-2" />
                        Request Appointment
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* What to Expect */}
            <Card>
              <CardHeader>
                <CardTitle>What to Expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Confirmation Call</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll call you within 24 hours to confirm your appointment
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Preparation Info</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll send you pre-appointment instructions if needed
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Reminder</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatic reminders sent 24 hours before your visit
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  If you have any questions or need to speak with someone immediately:
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('tel:01684292668', '_self')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  01684 292668
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open('mailto:info@tewkesburydental.co.uk', '_self')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  info@tewkesburydental.co.uk
                </Button>
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
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sunday</span>
                  <span className="text-warning">Emergency Only</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
