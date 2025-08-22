
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu } from 'lucide-react';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/customers': 'Customer List',
  '/customers/add': 'Add Customer',
  '/account': 'Account Settings',
};

export const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isEditPage = location.pathname.includes('/customers/edit/');
  const currentTitle = isEditPage ? 'Edit Customer' : routeTitles[location.pathname] || 'Customer Management';
  
  const showBackButton = location.pathname !== '/dashboard' && 
                         location.pathname !== '/signin' && 
                         location.pathname !== '/signup';

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          
          {showBackButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{currentTitle}</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
