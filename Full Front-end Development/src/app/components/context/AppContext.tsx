import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { User, Course, Criterion, Candidate, CandidateCourse, Score, SelectionPeriod, Notification } from '../types';
import {
  initialUsers, initialCourses, initialCriteria, initialCandidates,
  initialCandidateCourses, initialScores, initialPeriods,
} from '../utils/mockData';
import { runTopsis, type TopsisSnapshot } from '../utils/topsisEngine';

interface AppState {
  currentUser: User | null;
  users: User[];
  courses: Course[];
  criteria: Criterion[];
  candidates: Candidate[];
  candidateCourses: CandidateCourse[];
  scores: Score[];
  periods: SelectionPeriod[];
  notifications: Notification[];
}

interface AppContextType extends AppState {
  // Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: { name: string; email: string; nim: string; password: string }) => boolean;
  // Users
  createUser: (u: Omit<User, 'id' | 'createdAt' | 'lastLoginAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  // Courses
  createCourse: (c: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  // Criteria
  createCriterion: (c: Omit<Criterion, 'id'>) => void;
  updateCriterion: (id: string, updates: Partial<Criterion>) => void;
  deleteCriterion: (id: string) => void;
  // Candidates
  createCandidate: (c: Omit<Candidate, 'id'>, courseId: string) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string, courseId: string) => void;
  updateCandidateCourseStatus: (candidateId: string, courseId: string, status: CandidateCourse['status']) => void;
  // Scores
  upsertScore: (candidateId: string, courseId: string, criteriaId: string, score: number) => void;
  // Periods
  createPeriod: (p: Omit<SelectionPeriod, 'id' | 'createdAt'>) => void;
  updatePeriod: (id: string, updates: Partial<SelectionPeriod>) => void;
  deletePeriod: (id: string) => void;
  // Computed
  getTopsisForCourse: (courseId: string) => TopsisSnapshot;
  getCourseCandidates: (courseId: string) => Candidate[];
  getCandidateScores: (candidateId: string, courseId: string) => Record<string, number>;
  getAdminCourses: (userId: string) => Course[];
  getCandidateEnrollments: (userId: string) => { course: Course; candidateCourse: CandidateCourse; topsisResult: TopsisSnapshot['results'][0] | null; period: SelectionPeriod | null }[];
  markNotificationRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    users: initialUsers,
    courses: initialCourses,
    criteria: initialCriteria,
    candidates: initialCandidates,
    candidateCourses: initialCandidateCourses,
    scores: initialScores,
    periods: initialPeriods,
    notifications: [],
  });

  const login = useCallback((email: string, password: string): boolean => {
    const user = state.users.find(u => u.email === email && u.password === password && u.isActive);
    if (user) {
      setState(s => ({
        ...s,
        currentUser: user,
        users: s.users.map(u => u.id === user.id ? { ...u, lastLoginAt: new Date().toISOString() } : u),
      }));
      return true;
    }
    return false;
  }, [state.users]);

  const logout = useCallback(() => setState(s => ({ ...s, currentUser: null })), []);

  const register = useCallback((data: { name: string; email: string; nim: string; password: string }): boolean => {
    const exists = state.users.some(u => u.email === data.email || u.nim === data.nim);
    if (exists) return false;
    const newUser: User = {
      id: `u-ca-${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
      nim: data.nim,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setState(s => ({ ...s, users: [...s.users, newUser] }));
    return true;
  }, [state.users]);

  const createUser = useCallback((u: Omit<User, 'id' | 'createdAt' | 'lastLoginAt'>) => {
    const newUser: User = { ...u, id: `u-${Date.now()}`, createdAt: new Date().toISOString() };
    setState(s => ({ ...s, users: [...s.users, newUser] }));
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setState(s => ({ ...s, users: s.users.map(u => u.id === id ? { ...u, ...updates } : u) }));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setState(s => ({ ...s, users: s.users.filter(u => u.id !== id) }));
  }, []);

  const createCourse = useCallback((c: Omit<Course, 'id'>) => {
    setState(s => ({ ...s, courses: [...s.courses, { ...c, id: `course-${Date.now()}` }] }));
  }, []);

  const updateCourse = useCallback((id: string, updates: Partial<Course>) => {
    setState(s => ({ ...s, courses: s.courses.map(c => c.id === id ? { ...c, ...updates } : c) }));
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setState(s => ({ ...s, courses: s.courses.filter(c => c.id !== id) }));
  }, []);

  const createCriterion = useCallback((c: Omit<Criterion, 'id'>) => {
    setState(s => ({ ...s, criteria: [...s.criteria, { ...c, id: `cr-${Date.now()}` }] }));
  }, []);

  const updateCriterion = useCallback((id: string, updates: Partial<Criterion>) => {
    setState(s => ({ ...s, criteria: s.criteria.map(c => c.id === id ? { ...c, ...updates } : c) }));
  }, []);

  const deleteCriterion = useCallback((id: string) => {
    setState(s => ({ ...s, criteria: s.criteria.filter(c => c.id !== id) }));
  }, []);

  const createCandidate = useCallback((c: Omit<Candidate, 'id'>, courseId: string) => {
    const newId = `cand-${Date.now()}`;
    const newCC: CandidateCourse = { id: `cc-${Date.now()}`, candidateId: newId, courseId, status: 'active', createdAt: new Date().toISOString() };
    setState(s => ({
      ...s,
      candidates: [...s.candidates, { ...c, id: newId }],
      candidateCourses: [...s.candidateCourses, newCC],
    }));
  }, []);

  const updateCandidate = useCallback((id: string, updates: Partial<Candidate>) => {
    setState(s => ({ ...s, candidates: s.candidates.map(c => c.id === id ? { ...c, ...updates } : c) }));
  }, []);

  const deleteCandidate = useCallback((id: string, courseId: string) => {
    setState(s => ({
      ...s,
      candidateCourses: s.candidateCourses.filter(cc => !(cc.candidateId === id && cc.courseId === courseId)),
      scores: s.scores.filter(sc => !(sc.candidateId === id && sc.courseId === courseId)),
    }));
  }, []);

  const updateCandidateCourseStatus = useCallback((candidateId: string, courseId: string, status: CandidateCourse['status']) => {
    setState(s => ({
      ...s,
      candidateCourses: s.candidateCourses.map(cc =>
        cc.candidateId === candidateId && cc.courseId === courseId ? { ...cc, status } : cc
      ),
    }));
  }, []);

  const upsertScore = useCallback((candidateId: string, courseId: string, criteriaId: string, score: number) => {
    setState(s => {
      const existing = s.scores.find(sc => sc.candidateId === candidateId && sc.courseId === courseId && sc.criteriaId === criteriaId);
      if (existing) {
        return { ...s, scores: s.scores.map(sc => sc.id === existing.id ? { ...sc, score } : sc) };
      }
      return { ...s, scores: [...s.scores, { id: `score-${Date.now()}`, candidateId, courseId, criteriaId, score }] };
    });
  }, []);

  const createPeriod = useCallback((p: Omit<SelectionPeriod, 'id' | 'createdAt'>) => {
    setState(s => ({ ...s, periods: [...s.periods, { ...p, id: `period-${Date.now()}`, createdAt: new Date().toISOString() }] }));
  }, []);

  const updatePeriod = useCallback((id: string, updates: Partial<SelectionPeriod>) => {
    setState(s => ({ ...s, periods: s.periods.map(p => p.id === id ? { ...p, ...updates } : p) }));
  }, []);

  const deletePeriod = useCallback((id: string) => {
    setState(s => ({ ...s, periods: s.periods.filter(p => p.id !== id) }));
  }, []);

  const getTopsisForCourse = useCallback((courseId: string): TopsisSnapshot => {
    const ccs = state.candidateCourses.filter(cc => cc.courseId === courseId && cc.status === 'active');
    const course = state.courses.find(c => c.id === courseId);
    const quota = course?.quota ?? 3;
    const activeCriteria = state.criteria.filter(c => c.isActive);
    const inputs = ccs.map(cc => ({
      candidateId: cc.candidateId,
      scores: Object.fromEntries(
        state.scores
          .filter(sc => sc.candidateId === cc.candidateId && sc.courseId === courseId)
          .map(sc => [sc.criteriaId, sc.score])
      ),
    }));
    return runTopsis(inputs, activeCriteria.map(c => ({ id: c.id, weight: c.weight, type: c.type })), quota);
  }, [state.candidateCourses, state.courses, state.criteria, state.scores]);

  const getCourseCandidates = useCallback((courseId: string): Candidate[] => {
    const ccs = state.candidateCourses.filter(cc => cc.courseId === courseId);
    return ccs.map(cc => state.candidates.find(c => c.id === cc.candidateId)!).filter(Boolean);
  }, [state.candidateCourses, state.candidates]);

  const getCandidateScores = useCallback((candidateId: string, courseId: string): Record<string, number> => {
    return Object.fromEntries(
      state.scores
        .filter(sc => sc.candidateId === candidateId && sc.courseId === courseId)
        .map(sc => [sc.criteriaId, sc.score])
    );
  }, [state.scores]);

  const getAdminCourses = useCallback((userId: string): Course[] => {
    const user = state.users.find(u => u.id === userId);
    if (!user || !user.assignedCourseIds) return [];
    return state.courses.filter(c => user.assignedCourseIds!.includes(c.id));
  }, [state.users, state.courses]);

  const getCandidateEnrollments = useCallback((userId: string) => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return [];
    const candidateRecords = state.candidates.filter(c => c.userId === userId);
    const activePeriod = state.periods.find(p => p.isActive);
    return candidateRecords.flatMap(candidate => {
      const ccs = state.candidateCourses.filter(cc => cc.candidateId === candidate.id);
      return ccs.map(cc => {
        const course = state.courses.find(c => c.id === cc.courseId)!;
        const topsisSnap = activePeriod?.isPublished ? getTopsisForCourse(cc.courseId) : null;
        const topsisResult = topsisSnap?.results.find(r => r.candidateId === candidate.id) ?? null;
        return { course, candidateCourse: cc, topsisResult, period: activePeriod ?? null };
      });
    });
  }, [state.users, state.candidates, state.candidateCourses, state.courses, state.periods, getTopsisForCourse]);

  const markNotificationRead = useCallback((id: string) => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === id ? { ...n, readAt: new Date().toISOString() } : n),
    }));
  }, []);

  return (
    <AppContext.Provider value={{
      ...state,
      login, logout, register,
      createUser, updateUser, deleteUser,
      createCourse, updateCourse, deleteCourse,
      createCriterion, updateCriterion, deleteCriterion,
      createCandidate, updateCandidate, deleteCandidate, updateCandidateCourseStatus,
      upsertScore,
      createPeriod, updatePeriod, deletePeriod,
      getTopsisForCourse, getCourseCandidates, getCandidateScores, getAdminCourses,
      getCandidateEnrollments, markNotificationRead,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
