
export type Priority = 'low' | 'medium' | 'high';

export interface ScheduleItem {
  id: string;
  title: string;
  startTime: string; // ISO or "HH:mm"
  duration: number; // in minutes
  priority: Priority;
  category: string;
  date: string; // "YYYY-MM-DD"
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: string;
}

export interface AIActionPlan {
  primary_action: string;
  parameters: {
    title: string;
    time: string;
    priority: Priority;
    duration: number;
    category: string;
    dueDate: string;
  };
  reasoning: string;
  user_response: string;
  additional_suggestions: string[];
}

export interface AIReasoning {
  extracted_information: {
    activity: string;
    target_date: string;
    target_time_window: string;
    duration_implied: string;
    priority: string;
  };
  intent_analysis: string;
  scheduling_considerations: string;
  urgency_and_feasibility: string;
}
