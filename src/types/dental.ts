
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
  duration?: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualifications: string[];
  bio: string;
  image?: string;
  specialties: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  emergencyPhone: string;
  hours: {
    [key: string]: string;
  };
}
