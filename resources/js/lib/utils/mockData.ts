import type { User, Course, Criterion, Candidate, CandidateCourse, Score, SelectionPeriod } from '../types';

export const initialUsers: User[] = [
  { id: 'u-sa-1', name: 'Ir. Nofiyati, S.Kom., M.Kom.', email: 'nofiyati@unsoed.ac.id', password: 'password123', role: 'superadmin', isActive: true, lastLoginAt: '2026-06-05T08:00:00Z', createdAt: '2026-01-01T00:00:00Z' },
  { id: 'u-ad-1', name: 'Daiva Paundra Gevano', email: 'daiva@unsoed.ac.id', password: 'password123', role: 'admin', isActive: true, assignedCourseIds: ['course-sd'], lastLoginAt: '2026-06-06T09:00:00Z', createdAt: '2026-05-01T00:00:00Z' },
  { id: 'u-ad-2', name: 'Irfan Widodo', email: 'irfan@unsoed.ac.id', password: 'password123', role: 'admin', isActive: true, assignedCourseIds: ['course-bd'], lastLoginAt: '2026-06-06T10:00:00Z', createdAt: '2026-05-01T00:00:00Z' },
  { id: 'u-ad-3', name: 'Ahmad Fauzi', email: 'ahmad@unsoed.ac.id', password: 'password123', role: 'admin', isActive: true, assignedCourseIds: ['course-so'], lastLoginAt: '2026-06-06T11:00:00Z', createdAt: '2026-05-01T00:00:00Z' },
  { id: 'u-ad-4', name: 'Budi Santoso', email: 'budi@unsoed.ac.id', password: 'password123', role: 'admin', isActive: true, assignedCourseIds: ['course-pw'], lastLoginAt: '2026-06-07T08:30:00Z', createdAt: '2026-05-01T00:00:00Z' },
  { id: 'u-ca-1', name: 'Faqih Ardiansyah', email: 'faqih@mhs.unsoed.ac.id', password: 'password123', role: 'user', nim: '2011010003', isActive: true, createdAt: '2026-05-10T00:00:00Z' },
  { id: 'u-ca-2', name: 'Haniel Wijanarko', email: 'haniel@mhs.unsoed.ac.id', password: 'password123', role: 'user', nim: '2011010001', isActive: true, createdAt: '2026-05-10T00:00:00Z' },
  { id: 'u-ca-3', name: 'Fikry Mumtaz', email: 'fikry@mhs.unsoed.ac.id', password: 'password123', role: 'user', nim: '2011020005', isActive: true, createdAt: '2026-05-11T00:00:00Z' },
];

export const initialCourses: Course[] = [
  { id: 'course-sd', code: 'IF201', name: 'Struktur Data', description: 'Membahas struktur data dasar hingga lanjut seperti linked list, tree, graph.', quota: 3, isActive: true, assignedAdminIds: ['u-ad-1'] },
  { id: 'course-bd', code: 'IF202', name: 'Basis Data', description: 'Perancangan dan implementasi basis data relasional menggunakan SQL.', quota: 3, isActive: true, assignedAdminIds: ['u-ad-2'] },
  { id: 'course-so', code: 'IF203', name: 'Sistem Operasi', description: 'Konsep dan implementasi sistem operasi modern, manajemen proses dan memori.', quota: 3, isActive: true, assignedAdminIds: ['u-ad-3'] },
  { id: 'course-pw', code: 'IF204', name: 'Pemrograman Web I', description: 'Dasar-dasar pemrograman web: HTML, CSS, JavaScript, dan framework dasar.', quota: 3, isActive: true, assignedAdminIds: ['u-ad-4'] },
];

export const initialCriteria: Criterion[] = [
  { id: 'C1', code: 'C1', name: 'Public Speaking', weight: 0.30, type: 'benefit', description: 'Kemampuan menyampaikan materi modul secara jelas, persuasif, dan adaptif kepada praktikan.', isActive: true },
  { id: 'C2', code: 'C2', name: 'Penguasaan Materi', weight: 0.30, type: 'benefit', description: 'Pemahaman mendalam atas materi praktikum untuk membimbing dan menjawab pertanyaan teknis.', isActive: true },
  { id: 'C3', code: 'C3', name: 'Nilai Mata Kuliah', weight: 0.10, type: 'benefit', description: 'Rekam jejak akademis objektif; nilai minimal B sebagai ambang batas kelayakan.', isActive: true },
  { id: 'C4', code: 'C4', name: 'Micro Teaching', weight: 0.10, type: 'benefit', description: 'Simulasi mengajar untuk menilai kompetensi pedagogik dan sistematika penyampaian.', isActive: true },
  { id: 'C5', code: 'C5', name: 'Latihan Soal', weight: 0.15, type: 'benefit', description: 'Mengukur kemampuan analytical thinking dan problem-solving secara terstruktur.', isActive: true },
  { id: 'C6', code: 'C6', name: 'Keaktifan Mahasiswa', weight: 0.05, type: 'cost', description: 'Beban kegiatan luar kampus; semakin tinggi, semakin besar potensi kendala manajemen waktu.', isActive: true },
];

export const initialCandidates: Candidate[] = [
  { id: 'A1', code: 'A1', nim: '2011010001', name: 'Haniel Wijanarko', userId: 'u-ca-2' },
  { id: 'A2', code: 'A2', nim: '2011010002', name: 'Farhan' },
  { id: 'A3', code: 'A3', nim: '2011010003', name: 'Faqih Ardiansyah', userId: 'u-ca-1' },
  { id: 'A4', code: 'A4', nim: '2011010004', name: 'Pancar' },
  { id: 'A5', code: 'A5', nim: '2011010005', name: 'Satria' },
  { id: 'A6', code: 'A6', nim: '2011010006', name: 'Aufa Salsabila' },
  { id: 'A7', code: 'A7', nim: '2011010007', name: 'Raihan Dwi Ananda H.' },
  { id: 'B1', code: 'B1', nim: '2011020001', name: 'Ferdi Waskito' },
  { id: 'B2', code: 'B2', nim: '2011010006', name: 'Aufa Salsabila' },
  { id: 'B3', code: 'B3', nim: '2011020002', name: 'Ali Muhammad Firdaus' },
  { id: 'B4', code: 'B4', nim: '2011020003', name: 'Latifa' },
  { id: 'B5', code: 'B5', nim: '2011020005', name: 'Fikry Mumtaz', userId: 'u-ca-3' },
  { id: 'B6', code: 'B6', nim: '2011020006', name: 'Talitha' },
  { id: 'SO-C1', code: 'C1', nim: '2011020001', name: 'Ferdi Waskito' },
  { id: 'SO-C2', code: 'C2', nim: '2011030001', name: 'Fahmi Arif Setiawan' },
  { id: 'SO-C3', code: 'C3', nim: '2011030002', name: 'Izaz Falih' },
  { id: 'SO-C4', code: 'C4', nim: '2011030003', name: 'Salma F' },
  { id: 'SO-C5', code: 'C5', nim: '2011030004', name: 'Biladi' },
  { id: 'SO-C6', code: 'C6', nim: '2011030005', name: 'Nafisah' },
  { id: 'SO-C7', code: 'C7', nim: '2011030006', name: 'Fahri' },
  { id: 'D1', code: 'D1', nim: '2011010001', name: 'Haniel Wijanarko', userId: 'u-ca-2' },
  { id: 'D2', code: 'D2', nim: '2011040001', name: 'Yoga Adi' },
  { id: 'D3', code: 'D3', nim: '2011040002', name: 'Tsaqif Hasbi A.S.' },
  { id: 'D4', code: 'D4', nim: '2011040003', name: 'Gilang Happy D.' },
  { id: 'D5', code: 'D5', nim: '2011040004', name: 'Athaya Raihan' },
  { id: 'D6', code: 'D6', nim: '2011040005', name: 'M. Umar Faiz' },
];

export const initialCandidateCourses: CandidateCourse[] = [
  ...['A1','A2','A3','A4','A5','A6','A7'].map((id, i) => ({ id: `cc-${id}`, candidateId: id, courseId: 'course-sd', status: 'active' as const, createdAt: `2026-05-15T0${i}:00:00Z` })),
  ...['B1','B2','B3','B4','B5','B6'].map((id, i) => ({ id: `cc-${id}`, candidateId: id, courseId: 'course-bd', status: 'active' as const, createdAt: `2026-05-16T0${i}:00:00Z` })),
  ...['SO-C1','SO-C2','SO-C3','SO-C4','SO-C5','SO-C6','SO-C7'].map((id, i) => ({ id: `cc-${id}`, candidateId: id, courseId: 'course-so', status: 'active' as const, createdAt: `2026-05-17T0${i}:00:00Z` })),
  ...['D1','D2','D3','D4','D5','D6'].map((id, i) => ({ id: `cc-${id}`, candidateId: id, courseId: 'course-pw', status: 'active' as const, createdAt: `2026-05-18T0${i}:00:00Z` })),
];

const rawScoreMap: Record<string, [number, number, number, number, number, number, string]> = {
  A1:    [82, 85, 80, 78, 83, 60, 'course-sd'],
  A2:    [75, 80, 85, 72, 77, 45, 'course-sd'],
  A3:    [88, 90, 90, 85, 88, 70, 'course-sd'],
  A4:    [70, 72, 75, 68, 71, 35, 'course-sd'],
  A5:    [78, 82, 80, 76, 79, 55, 'course-sd'],
  A6:    [83, 79, 85, 80, 81, 50, 'course-sd'],
  A7:    [80, 85, 88, 82, 84, 65, 'course-sd'],
  B1:    [77, 80, 78, 74, 76, 40, 'course-bd'],
  B2:    [83, 81, 85, 80, 80, 50, 'course-bd'],
  B3:    [72, 75, 70, 70, 73, 55, 'course-bd'],
  B4:    [79, 83, 82, 77, 80, 45, 'course-bd'],
  B5:    [85, 87, 88, 83, 86, 60, 'course-bd'],
  B6:    [74, 76, 77, 72, 75, 38, 'course-bd'],
  'SO-C1': [77, 80, 78, 74, 76, 40, 'course-so'],
  'SO-C2': [80, 83, 82, 79, 81, 58, 'course-so'],
  'SO-C3': [76, 78, 80, 73, 77, 42, 'course-so'],
  'SO-C4': [84, 86, 85, 82, 83, 55, 'course-so'],
  'SO-C5': [79, 82, 80, 77, 80, 48, 'course-so'],
  'SO-C6': [73, 75, 72, 71, 74, 36, 'course-so'],
  'SO-C7': [81, 84, 83, 79, 82, 52, 'course-so'],
  D1: [82, 85, 80, 78, 83, 60, 'course-pw'],
  D2: [78, 80, 82, 76, 79, 44, 'course-pw'],
  D3: [85, 88, 86, 83, 86, 62, 'course-pw'],
  D4: [80, 82, 84, 78, 81, 50, 'course-pw'],
  D5: [77, 79, 78, 75, 78, 42, 'course-pw'],
  D6: [76, 78, 80, 74, 77, 40, 'course-pw'],
};

export const initialScores: Score[] = Object.entries(rawScoreMap).flatMap(([candidateId, data]) =>
  ['C1','C2','C3','C4','C5','C6'].map((cId, idx) => ({
    id: `score-${candidateId}-${cId}`,
    candidateId,
    courseId: data[6] as string,
    criteriaId: cId,
    score: data[idx] as number,
  }))
);

export const initialPeriods: SelectionPeriod[] = [
  {
    id: 'period-2026-genap',
    name: 'Seleksi Asprak Genap 2025/2026',
    description: 'Periode seleksi asisten praktikum semester genap tahun akademik 2025/2026.',
    startDate: '2026-05-10',
    endDate: '2026-06-15',
    isActive: true,
    isLocked: false,
    isPublished: true,
    showScores: true,
    createdAt: '2026-05-01T00:00:00Z',
    createdBy: 'u-sa-1',
  },
];
