
export interface Period {
  id: number;
  time: string; // e.g., "7:25 - 8:05"
}

export interface ClassDetail {
  className: string; // e.g., "الرابع 1", "الأول ٥"
  subject: string;   // e.g., "التربية الاسلامية", "اللغة العربية"
  teacherName: string; // The teacher for this specific class in this timetable cell
}

// A timetable cell can contain a single class or be empty
export type TimetableCell = ClassDetail | null;

// Represents the timetable for a single day (Period ID -> ClassDetail or null)
export type DailyTimetable = Map<number, TimetableCell>;

// Represents the full timetable for a teacher (Day Name -> DailyTimetable)
export type TeacherTimetable = Map<string, DailyTimetable>;

export interface TeacherData {
  name: string;
  timetable: TeacherTimetable;
}
