import { Project } from '../redmine/redmine.interface';

export interface TimeTrackerObject {
  time_tracker: Partial<TimeTracker>;
}

export interface TimeTracker {
  id: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  start: string;
  stop: string;
  project_id: number;
  activity_id: number;
  issue_id: number;
  comments: string;
  hours: number;
  diff_time: number;

  project: Project;
}

export interface TimeTrackers {
  count: number;
  offset: number;
  limit: number;
  records: TimeTracker[];
}

export interface TimeBookings {
  count: number;
  offset: number;
  limit: number;
  records: TimeBooking[];
}

export interface TimeBooking {
  id: number;
  start: string;
  stop: string;
  time_log_id: number;
  time_entry_id: number;
  created_at: string;
  updated_at: string;
  time_entry: TimeEntry;
}

export interface TimeEntry {
  id: number;
  project_id: number;
  user_id: number;
  issue_id: number;
  hours: number;
  comments: string;
  activity_id: number;
  spent_on: string;
  tyear: number;
  tmonth: number;
  tweek: number;
  created_on: string;
  updated_on: string;
}

export interface GroupedTimeLogs {
  time_sum: number;
  int_date: number;
  time_logs: TimeTracker[];
}
