export type EventCategory = 'Academic' | 'Community' | 'Sports';

export type CampusEvent = {
  id: string;
  title: string;
  category: EventCategory;
  dateTime: string;
  venue: string;
  joined?: boolean;
};

export const events: CampusEvent[] = [
  { id: 'tech-career-fair', title: 'Technology Career Fair', category: 'Academic', dateTime: 'October 18, 10:00 AM', venue: 'University Gymnasium' },
  { id: 'leadership-workshop', title: 'Student Leadership Workshop', category: 'Academic', dateTime: 'October 20, 1:00 PM', venue: 'Room 204, Student Center', joined: true },
  { id: 'campus-cleanup', title: 'Campus Cleanup Drive', category: 'Community', dateTime: 'October 22, 8:00 AM', venue: 'Main Quadrangle' },
  { id: 'open-mic-night', title: 'Open Mic Night', category: 'Community', dateTime: 'October 24, 6:30 PM', venue: 'Campus Auditorium' },
  { id: 'intramural-basketball', title: 'Intramural Basketball Tryouts', category: 'Sports', dateTime: 'October 26, 3:00 PM', venue: 'Sports Complex' },
];
