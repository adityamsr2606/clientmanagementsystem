
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../contexts/CustomerContext';
import { CustomerFormData } from '../../types/customer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  UserCheck, 
  Camera,
  Save,
  AlertCircle
} from 'lucide-react';
import { validateEmail, validatePhone, validateCustomerName } from '../../utils/validation';
import { toast } from '@/hooks/use-toast';

const EditCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const { getCustomerById, updateCustomer } = useCustomers();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    address: '',
    email: '',
    phone: '',
    contactPerson: '',
    profilePhoto: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [customerNotFound, setCustomerNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const customer = getCustomerById(id);
      if (customer) {
        setFormData({
          name: customer.name,
          address: customer.address,
          email: customer.email,
          phone: customer.phone,
          contactPerson: customer.contactPerson,
          profilePhoto: customer.profilePhoto || '',
        });
      } else {
        setCustomerNotFound(true);
      }
    }
  }, [id, getCustomerById]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateCustomerName(formData.name)) {
      newErrors.name = 'Name must contain only letters and spaces, cannot start with space or contain special characters';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits starting with 6-9';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!validateCustomerName(formData.contactPerson)) {
      newErrors.contactPerson = 'Contact person name must contain only letters and spaces';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    if (!id) return;

    setIsLoading(true);
    
    try {
      const success = await updateCustomer(id, formData);
      
      if (success) {
        toast({
          title: "Success",
          description: `${formData.name} has been updated successfully!`,
        });
        navigate('/customers');
      } else {
        toast({
          title: "Error",
          description: "Failed to update customer. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (customerNotFound) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h2 className="text-xl font-semibold mb-2">Customer Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The customer you're trying to edit could not be found.
            </p>
            <Button onClick={() => navigate('/customers')}>
              Back to Customer List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-professional">
      <Card className="shadow-professional">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit Customer
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="form-group">
              <Label className="form-label flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Profile Photo
              </Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 border-2 border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden">
                  {formData.profilePhoto ? (
                    <img 
                      src={formData.profilePhoto} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="form-input"
                />
              </div>
            </div>

            {/* Customer Name */}
            <div className="form-group">
              <Label htmlFor="name" className="form-label flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Name *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter customer full name"
                required
              />
              {errors.name && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <Label htmlFor="email" className="form-label flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="customer@example.com"
                required
              />
              {errors.email && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <Label htmlFor="phone" className="form-label flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                required
              />
              {errors.phone && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Address */}
            <div className="form-group">
              <Label htmlFor="address" className="form-label flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address *
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input min-h-[80px] resize-none"
                placeholder="Enter complete address"
                required
              />
              {errors.address && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {errors.address}
                </div>
              )}
            </div>

            {/* Contact Person */}
            <div className="form-group">
              <Label htmlFor="contactPerson" className="form-label flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Contact Person Name *
              </Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                type="text"
                value={formData.contactPerson}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter contact person name"
                required
              />
              {errors.contactPerson && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-3 w-3" />
                  {errors.contactPerson}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/customers')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Updating Customer...'
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Customer
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCustomer;
