
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../contexts/CustomerContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  const { customers } = useCustomers();
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Customers',
      value: customers.length.toString(),
      icon: Users,
      description: 'Active customers in system',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Recent Additions',
      value: customers.filter(c => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(c.createdAt) > weekAgo;
      }).length.toString(),
      icon: TrendingUp,
      description: 'Added this week',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Active Today',
      value: customers.length.toString(),
      icon: Activity,
      description: 'Customer records available',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="space-professional">
      {/* Welcome Section */}
      <div className="card-professional">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Welcome back, {user?.name || 'User'}!
            </h2>
            <p className="text-muted-foreground mt-1">
              Here's your customer management overview
            </p>
          </div>
          <Button 
            className="btn-primary"
            onClick={() => navigate('/customers/add')}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Customer
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card-professional">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-muted/50"
              onClick={() => navigate('/customers/add')}
            >
              <UserPlus className="h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Add Customer</p>
                <p className="text-xs text-muted-foreground">Create new customer record</p>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-muted/50"
              onClick={() => navigate('/customers')}
            >
              <Users className="h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">View All Customers</p>
                <p className="text-xs text-muted-foreground">Browse customer list</p>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-muted/50"
              onClick={() => navigate('/account')}
            >
              <Activity className="h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Account Settings</p>
                <p className="text-xs text-muted-foreground">Manage your account</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Dashboard;
