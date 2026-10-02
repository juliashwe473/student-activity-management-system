export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  department?: string;
  phone?: string;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  category: string;
}

export interface Registration {
  _id: string;
  status: 'registered' | 'cancelled';
  registeredAt: string;
  student: User;
  activity: Activity;
}
