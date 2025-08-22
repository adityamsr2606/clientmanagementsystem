
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../contexts/CustomerContext';
import { Customer } from '../../types/customer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Edit, 
  Trash2, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CustomerList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, deleteCustomer, searchCustomers } = useCustomers();
  const navigate = useNavigate();

  const filteredCustomers = searchCustomers(searchQuery);

  const handleDeleteCustomer = async (customer: Customer) => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      const success = await deleteCustomer(customer.id);
      if (success) {
        toast({
          title: "Success",
          description: `${customer.name} has been deleted successfully.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete customer. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditCustomer = (customerId: string) => {
    navigate(`/customers/edit/${customerId}`);
  };

  return (
    <div className="space-professional">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Customer List</h2>
          <p className="text-muted-foreground">
            Manage and view all your customers ({customers.length} total)
          </p>
        </div>
        <Button 
          className="btn-primary"
          onClick={() => navigate('/customers/add')}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Search Section */}
      <div className="card-professional">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search customers by name, email, phone, or contact person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 form-input"
            />
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>

      {/* Customer Grid */}
      {filteredCustomers.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {customers.length === 0 ? 'No customers yet' : 'No customers found'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {customers.length === 0 
                ? 'Add your first customer to get started'
                : 'Try adjusting your search terms'
              }
            </p>
            {customers.length === 0 && (
              <Button 
                className="btn-primary"
                onClick={() => navigate('/customers/add')}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Your First Customer
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {customer.profilePhoto ? (
                      <img 
                        src={customer.profilePhoto} 
                        alt={customer.name}
                        className="h-12 w-12 rounded-full object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{customer.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {customer.id}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="truncate">Contact: {customer.contactPerson}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCustomer(customer.id)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCustomer(customer)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
