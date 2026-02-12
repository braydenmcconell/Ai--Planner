
import React from 'react';
import { ScheduleItem, Task } from './types';

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: '1',
    title: 'Morning Standup',
    startTime: '09:00',
    duration: 30,
    priority: 'medium',
    category: 'team',
    date: '2026-02-13'
  },
  {
    id: '2',
    title: 'Product Review',
    startTime: '10:30',
    duration: 60,
    priority: 'high',
    category: 'work',
    date: '2026-02-13'
  },
  {
    id: '3',
    title: 'Lunch Break',
    startTime: '12:30',
    duration: 60,
    priority: 'low',
    category: 'personal',
    date: '2026-02-13'
  }
];

export const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Finalize Slides for Presentation', completed: false, priority: 'high', category: 'work' },
  { id: 't2', title: 'Respond to Design Team feedback', completed: false, priority: 'medium', category: 'work' },
  { id: 't3', title: 'Pick up dry cleaning', completed: true, priority: 'low', category: 'personal' }
];
