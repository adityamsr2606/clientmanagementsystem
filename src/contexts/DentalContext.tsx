
import React, { createContext, useContext, useState } from 'react';
import { Service, TeamMember, Appointment, ContactInfo } from '../types/dental';

interface DentalContextType {
  services: Service[];
  team: TeamMember[];
  appointments: Appointment[];
  contactInfo: ContactInfo;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => boolean;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => boolean;
}

const DentalContext = createContext<DentalContextType | undefined>(undefined);

export const useDental = () => {
  const context = useContext(DentalContext);
  if (!context) {
    throw new Error('useDental must be used within a DentalProvider');
  }
  return context;
};

const mockServices: Service[] = [
  {
    id: '1',
    name: 'General Dentistry',
    description: 'Comprehensive dental care including check-ups, cleanings, and preventive treatments',
    icon: 'Stethoscope',
    price: 'From £45',
    duration: '30-60 mins',
    features: ['Dental Examinations', 'Professional Cleaning', 'Fluoride Treatments', 'Oral Health Advice']
  },
  {
    id: '2',
    name: 'Cosmetic Dentistry',
    description: 'Transform your smile with our advanced cosmetic dental procedures',
    icon: 'Sparkles',
    price: 'From £200',
    duration: '60-90 mins',
    features: ['Teeth Whitening', 'Veneers', 'Bonding', 'Smile Makeovers']
  },
  {
    id: '3',
    name: 'Orthodontics',
    description: 'Straighten your teeth with traditional braces or modern clear aligners',
    icon: 'Grid3x3',
    price: 'From £2,500',
    duration: '12-24 months',
    features: ['Traditional Braces', 'Clear Aligners', 'Retainers', 'Progress Monitoring']
  },
  {
    id: '4',
    name: 'Dental Implants',
    description: 'Replace missing teeth with permanent, natural-looking implants',
    icon: 'Anchor',
    price: 'From £1,200',
    duration: '3-6 months',
    features: ['Single Implants', 'Multiple Implants', 'Full Mouth Restoration', 'Implant Maintenance']
  },
  {
    id: '5',
    name: 'Emergency Dental Care',
    description: '24/7 emergency dental services for urgent dental problems',
    icon: 'AlertTriangle',
    price: 'From £80',
    duration: '30-45 mins',
    features: ['Pain Relief', 'Emergency Repairs', 'Trauma Treatment', 'Out-of-Hours Care']
  },
  {
    id: '6',
    name: 'Periodontal Treatment',
    description: 'Specialized care for gum disease and oral health maintenance',
    icon: 'Heart',
    price: 'From £150',
    duration: '45-75 mins',
    features: ['Gum Disease Treatment', 'Deep Cleaning', 'Periodontal Surgery', 'Maintenance Programs']
  }
];

const mockTeam: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    role: 'Principal Dentist & Practice Owner',
    qualifications: ['BDS Bristol University', 'MJDF RCS England', 'PG Cert Restorative Dentistry'],
    bio: 'Dr. Mitchell has over 15 years of experience in general and cosmetic dentistry. She is passionate about providing high-quality, gentle dental care in a comfortable environment.',
    specialties: ['Cosmetic Dentistry', 'Restorative Dentistry', 'Preventive Care']
  },
  {
    id: '2',
    name: 'Dr. James Parker',
    role: 'Associate Dentist',
    qualifications: ['BDS King\'s College London', 'MFDS RCS Edinburgh', 'Cert Orthodontics'],
    bio: 'Dr. Parker specializes in orthodontics and family dentistry. He has a gentle approach and is particularly skilled in treating anxious patients.',
    specialties: ['Orthodontics', 'Family Dentistry', 'Anxiety Management']
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'Dental Hygienist',
    qualifications: ['Dip Dental Hygiene', 'NEBDN Certificate', 'CPD Periodontics'],
    bio: 'Emma is our experienced dental hygienist who focuses on preventive care and patient education. She helps patients maintain optimal oral health between visits.',
    specialties: ['Preventive Care', 'Periodontal Health', 'Patient Education']
  },
  {
    id: '4',
    name: 'Lisa Davies',
    role: 'Practice Manager',
    qualifications: ['NEBDN Diploma Practice Management', 'NVQ Level 4 Management'],
    bio: 'Lisa ensures the smooth operation of our practice and is always available to help with appointments, treatment planning, and any questions you may have.',
    specialties: ['Practice Management', 'Patient Care', 'Treatment Coordination']
  }
];

const mockContactInfo: ContactInfo = {
  address: 'High Street, Tewkesbury, Gloucestershire GL20 5AL',
  phone: '01684 292668',
  email: 'info@tewkesburydental.co.uk',
  emergencyPhone: '01684 292668',
  hours: {
    'Monday': '8:00 AM - 6:00 PM',
    'Tuesday': '8:00 AM - 6:00 PM',
    'Wednesday': '8:00 AM - 6:00 PM',
    'Thursday': '8:00 AM - 6:00 PM',
    'Friday': '8:00 AM - 5:00 PM',
    'Saturday': '9:00 AM - 2:00 PM',
    'Sunday': 'Emergency Only'
  }
};

export const DentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    return true;
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status } : apt)
    );
    return true;
  };

  const value: DentalContextType = {
    services: mockServices,
    team: mockTeam,
    appointments,
    contactInfo: mockContactInfo,
    addAppointment,
    updateAppointmentStatus
  };

  return (
    <DentalContext.Provider value={value}>
      {children}
    </DentalContext.Provider>
  );
};
