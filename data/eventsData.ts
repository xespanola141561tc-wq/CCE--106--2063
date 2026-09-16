export type EventItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

export const initialEvents: EventItem[] = [
  {
    id: 'tech-fair-2026',
    title: 'Campus Tech Fair 2026',
    category: 'Technology',
    date: 'September 24, 2026',
    description: 'Explore student projects, new technologies, and hands-on demonstrations from the campus community.',
  },
  {
    id: 'career-workshop',
    title: 'Career Preparation Workshop',
    category: 'Career',
    date: 'September 28, 2026',
    description: 'Build a stronger resume, practice interviews, and prepare for your next career opportunity.',
  },
  {
    id: 'student-leadership-forum',
    title: 'Student Leadership Forum',
    category: 'Community',
    date: 'October 3, 2026',
    description: 'Meet fellow student leaders and discuss practical ways to make a positive impact on campus.',
  },
];
