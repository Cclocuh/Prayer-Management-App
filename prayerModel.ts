export interface Prayer {
  id?: number; // Make id optional for insertions
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'answered';
}

  