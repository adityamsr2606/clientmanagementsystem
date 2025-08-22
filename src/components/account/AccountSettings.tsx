
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Lock, 
  Save,
  AlertCircle,
  CheckCircle,
  LogOut
} from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/validation';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AccountSettings = () => {
  const { user, updateProfile, resetPassword, logout } = useAuth();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!validateEmail(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsUpdatingProfile(true);
    try {
      const success = await updateProfile({
        name: profileData.name,
        email: profileData.email,
      });

      if (success) {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
        setErrors({});
      } else {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!validatePassword(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Verify current password
    if (user && user.password !== passwordData.currentPassword) {
      setErrors({ currentPassword: 'Current password is incorrect' });
      return;
    }

    setIsChangingPassword(true);
    try {
      if (user) {
        const success = await resetPassword(user.email, passwordData.newPassword);

        if (success) {
          toast({
            title: "Success",
            description: "Password changed successfully!",
          });
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          setErrors({});
        } else {
          toast({
            title: "Error",
            description: "Failed to change password. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: 'profile' | 'password'
  ) => {
    const { name, value } = e.target;
    
    if (section === 'profile') {
      setProfileData(prev => ({ ...prev, [name]: value }));
    } else {
      setPasswordData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-professional">
      <Card className="shadow-professional">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="form-group">
                  <Label htmlFor="profile-name" className="form-label flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="profile-name"
                    name="name"
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange(e, 'profile')}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <Label htmlFor="profile-email" className="form-label flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="profile-email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange(e, 'profile')}
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={isUpdatingProfile}
                >
                  {isUpdatingProfile ? (
                    'Updating...'
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Profile
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            {/* Password Tab */}
            <TabsContent value="password" className="space-y-4">
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="form-group">
                  <Label htmlFor="current-password" className="form-label flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handleInputChange(e, 'password')}
                    className="form-input"
                    placeholder="Enter current password"
                    required
                  />
                  {errors.currentPassword && (
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {errors.currentPassword}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <Label htmlFor="new-password" className="form-label flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handleInputChange(e, 'password')}
                    className="form-input"
                    placeholder="Enter new password"
                    required
                  />
                  {errors.newPassword && (
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {errors.newPassword}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <Label htmlFor="confirm-password" className="form-label flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handleInputChange(e, 'password')}
                    className="form-input"
                    placeholder="Confirm new password"
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-1 text-destructive text-sm">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    'Changing Password...'
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Logout Section */}
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Sign Out</h3>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
