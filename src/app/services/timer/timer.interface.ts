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
}
