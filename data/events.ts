export type EventCategory = "Academic" | "Community" | "Sports";

export type CampusEvent = {
  id: string;
  title: string;
  category: EventCategory;
  dateTime: string;
  venue: string;
  joined?: boolean;
};

export const events: CampusEvent[] = [
  { id: "design-jam", title: "Design Jam: Better Campus", category: "Academic", dateTime: "Oct 14 · 4:00 PM", venue: "Innovation Hub", joined: true },
  { id: "sunrise-social-run", title: "Sunrise Social Run", category: "Sports", dateTime: "Oct 16 · 6:30 AM", venue: "East Field Gate" },
  { id: "student-makers-market", title: "Student Makers Market", category: "Community", dateTime: "Oct 17 · 11:00 AM", venue: "Campus Green" },
  { id: "code-coffee", title: "Code & Coffee", category: "Academic", dateTime: "Oct 19 · 2:00 PM", venue: "Learning Commons" },
  { id: "campus-cleanup", title: "Campus Cleanup Drive", category: "Community", dateTime: "Oct 22 · 8:00 AM", venue: "Main Quadrangle" },
  { id: "intramural-basketball", title: "Intramural Basketball Tryouts", category: "Sports", dateTime: "Oct 26 · 3:00 PM", venue: "Sports Complex" },
];
