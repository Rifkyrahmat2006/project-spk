export type Role = 'superadmin' | 'admin' | 'user';
export type CriterionType = 'benefit' | 'cost';
export type CandidateCourseStatus = 'pending' | 'active' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  nim?: string;
  isActive: boolean;
  assignedCourseIds?: string[];
  lastLoginAt?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  quota: number;
  isActive: boolean;
  assignedAdminIds: string[];
}

export interface Criterion {
  id: string;
  code: string;
  name: string;
  weight: number;
  type: CriterionType;
  description: string;
  isActive: boolean;
}

export interface Candidate {
  id: string;
  code: string;
  nim: string;
  name: string;
  userId?: string;
}

export interface CandidateCourse {
  id: string;
  candidateId: string;
  courseId: string;
  status: CandidateCourseStatus;
  createdAt: string;
}

export interface Score {
  id: string;
  candidateId: string;
  courseId: string;
  criteriaId: string;
  score: number;
}

export interface SelectionPeriod {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isLocked: boolean;
  isPublished: boolean;
  showScores: boolean;
  createdAt: string;
  createdBy: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  readAt?: string;
  createdAt: string;
}
