<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\CandidateScore;
use App\Models\Criteria;
use App\Models\Course;
use App\Models\SelectionPeriod;
use App\Models\User;
use App\Models\UserCourseAssignment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class MockDataSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Users (without specifying IDs to avoid conflicts)
        $users = [
            [
                'name' => 'Ir. Nofiyati, S.Kom., M.Kom.',
                'email' => 'nofiyati@unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
                'is_active' => true,
                'last_login_at' => Carbon::parse('2026-06-05T08:00:00Z'),
            ],
            [
                'name' => 'Daiva Paundra Gevano',
                'email' => 'daiva@unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
                'last_login_at' => Carbon::parse('2026-06-06T09:00:00Z'),
            ],
            [
                'name' => 'Irfan Widodo',
                'email' => 'irfan@unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
                'last_login_at' => Carbon::parse('2026-06-06T10:00:00Z'),
            ],
            [
                'name' => 'Ahmad Fauzi',
                'email' => 'ahmad@unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
                'last_login_at' => Carbon::parse('2026-06-06T11:00:00Z'),
            ],
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'is_active' => true,
                'last_login_at' => Carbon::parse('2026-06-07T08:30:00Z'),
            ],
            [
                'name' => 'Faqih Ardiansyah',
                'email' => 'faqih@mhs.unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'user',
                'nim' => '2011010003',
                'is_active' => true,
            ],
            [
                'name' => 'Haniel Wijanarko',
                'email' => 'haniel@mhs.unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'user',
                'nim' => '2011010001',
                'is_active' => true,
            ],
            [
                'name' => 'Fikry Mumtaz',
                'email' => 'fikry@mhs.unsoed.ac.id',
                'password' => Hash::make('password'),
                'role' => 'user',
                'nim' => '2011020005',
                'is_active' => true,
            ],
        ];

        $createdUsers = [];
        foreach ($users as $user) {
            $createdUsers[] = User::firstOrCreate(
                ['email' => $user['email']],
                $user
            );
        }

        // 2. Seed Courses
        $courses = [
            [
                'code' => 'IF201',
                'name' => 'Struktur Data',
                'description' => 'Membahas struktur data dasar hingga lanjut seperti linked list, tree, graph.',
                'quota' => 3,
                'is_active' => true,
            ],
            [
                'code' => 'IF202',
                'name' => 'Basis Data',
                'description' => 'Perancangan dan implementasi basis data relasional menggunakan SQL.',
                'quota' => 3,
                'is_active' => true,
            ],
            [
                'code' => 'IF203',
                'name' => 'Sistem Operasi',
                'description' => 'Konsep dan implementasi sistem operasi modern, manajemen proses dan memori.',
                'quota' => 3,
                'is_active' => true,
            ],
            [
                'code' => 'IF204',
                'name' => 'Pemrograman Web I',
                'description' => 'Dasar-dasar pemrograman web: HTML, CSS, JavaScript, dan framework dasar.',
                'quota' => 3,
                'is_active' => true,
            ],
        ];

        $createdCourses = [];
        foreach ($courses as $course) {
            $createdCourses[] = Course::firstOrCreate(
                ['code' => $course['code']],
                $course
            );
        }

        // 3. Seed Criteria
        $criteria = [
            [
                'code' => 'C1',
                'name' => 'Public Speaking',
                'weight' => 0.30,
                'type' => 'benefit',
                'description' => 'Kemampuan menyampaikan materi modul secara jelas, persuasif, dan adaptif kepada praktikan.',
                'is_active' => true,
            ],
            [
                'code' => 'C2',
                'name' => 'Penguasaan Materi',
                'weight' => 0.30,
                'type' => 'benefit',
                'description' => 'Pemahaman mendalam atas materi praktikum untuk membimbing dan menjawab pertanyaan teknis.',
                'is_active' => true,
            ],
            [
                'code' => 'C3',
                'name' => 'Nilai Mata Kuliah',
                'weight' => 0.10,
                'type' => 'benefit',
                'description' => 'Rekam jejak akademis objektif; nilai minimal B sebagai ambang batas kelayakan.',
                'is_active' => true,
            ],
            [
                'code' => 'C4',
                'name' => 'Micro Teaching',
                'weight' => 0.10,
                'type' => 'benefit',
                'description' => 'Simulasi mengajar untuk menilai kompetensi pedagogik dan sistematika penyampaian.',
                'is_active' => true,
            ],
            [
                'code' => 'C5',
                'name' => 'Latihan Soal',
                'weight' => 0.15,
                'type' => 'benefit',
                'description' => 'Mengukur kemampuan analytical thinking dan problem-solving secara terstruktur.',
                'is_active' => true,
            ],
            [
                'code' => 'C6',
                'name' => 'Keaktifan Mahasiswa',
                'weight' => 0.05,
                'type' => 'cost',
                'description' => 'Beban kegiatan luar kampus; semakin tinggi, semakin besar potensi kendala manajemen waktu.',
                'is_active' => true,
            ],
        ];

        $createdCriteria = [];
        foreach ($criteria as $criterion) {
            $createdCriteria[] = Criteria::firstOrCreate(
                ['code' => $criterion['code']],
                $criterion
            );
        }

        // 4. Seed Selection Period
        $superadminUser = $createdUsers[0]; // First user is superadmin
        SelectionPeriod::firstOrCreate(
            ['name' => 'Seleksi Asprak Genap 2025/2026'],
            [
                'description' => 'Periode seleksi asisten praktikum semester genap tahun akademik 2025/2026.',
                'start_date' => Carbon::parse('2026-05-10'),
                'end_date' => Carbon::parse('2026-06-15'),
                'is_active' => true,
                'is_locked' => false,
                'is_published' => true,
                'show_scores' => true,
                'created_by' => $superadminUser->id,
            ]
        );

        // 5. Seed User Course Assignments
        for ($i = 1; $i < count($createdUsers); $i++) {
            if ($i <= count($createdCourses)) {
                UserCourseAssignment::firstOrCreate(
                    [
                        'user_id' => $createdUsers[$i]->id,
                        'course_id' => $createdCourses[$i - 1]->id,
                    ],
                    [
                        'assigned_by' => $superadminUser->id,
                    ]
                );
            }
        }

        // 6. Seed Candidates (get user IDs dynamically)
        $userHaniel = User::where('nim', '2011010001')->first();
        $userFaqih = User::where('nim', '2011010003')->first();
        $userFikry = User::where('nim', '2011020005')->first();

        $candidates = [
            // IF201 (Struktur Data) - A1 to A7
            ['nim' => '2011010001', 'name' => 'Haniel Wijanarko', 'user_id' => $userHaniel?->id],
            ['nim' => '2011010002', 'name' => 'Farhan', 'user_id' => null],
            ['nim' => '2011010003', 'name' => 'Faqih Ardiansyah', 'user_id' => $userFaqih?->id],
            ['nim' => '2011010004', 'name' => 'Pancar', 'user_id' => null],
            ['nim' => '2011010005', 'name' => 'Satria', 'user_id' => null],
            ['nim' => '2011010006', 'name' => 'Aufa Salsabila', 'user_id' => null],
            ['nim' => '2011010007', 'name' => 'Raihan Dwi Ananda H.', 'user_id' => null],
            // IF202 (Basis Data) - B1 to B6
            ['nim' => '2011020001', 'name' => 'Ferdi Waskito', 'user_id' => null],
            ['nim' => '2011020002', 'name' => 'Ali Muhammad Firdaus', 'user_id' => null],
            ['nim' => '2011020003', 'name' => 'Latifa', 'user_id' => null],
            ['nim' => '2011020005', 'name' => 'Fikry Mumtaz', 'user_id' => $userFikry?->id],
            ['nim' => '2011020006', 'name' => 'Talitha', 'user_id' => null],
            // IF203 (Sistem Operasi) - SO-C1 to SO-C7
            ['nim' => '2011030001', 'name' => 'Fahmi Arif Setiawan', 'user_id' => null],
            ['nim' => '2011030002', 'name' => 'Izaz Falih', 'user_id' => null],
            ['nim' => '2011030003', 'name' => 'Salma F', 'user_id' => null],
            ['nim' => '2011030004', 'name' => 'Biladi', 'user_id' => null],
            ['nim' => '2011030005', 'name' => 'Nafisah', 'user_id' => null],
            ['nim' => '2011030006', 'name' => 'Fahri', 'user_id' => null],
            // IF204 (Pemrograman Web I) - D1 to D6
            ['nim' => '2011040001', 'name' => 'Yoga Adi', 'user_id' => null],
            ['nim' => '2011040002', 'name' => 'Tsaqif Hasbi A.S.', 'user_id' => null],
            ['nim' => '2011040003', 'name' => 'Gilang Happy D.', 'user_id' => null],
            ['nim' => '2011040004', 'name' => 'Athaya Raihan', 'user_id' => null],
            ['nim' => '2011040005', 'name' => 'M. Umar Faiz', 'user_id' => null],
        ];

        $createdCandidates = [];
        foreach ($candidates as $candidate) {
            $createdCandidates[] = Candidate::firstOrCreate(
                ['nim' => $candidate['nim'], 'name' => $candidate['name']],
                $candidate
            );
        }

        // 7. Seed Candidate Courses (map candidates to courses) using attach
        // IF201: first 7 candidates
        for ($i = 0; $i < 7 && $i < count($createdCandidates); $i++) {
            $createdCandidates[$i]->courses()->syncWithoutDetaching([
                $createdCourses[0]->id => ['status' => 'active']
            ]);
        }

        // IF202: next 5 candidates (index 7-11)
        for ($i = 7; $i < 12 && $i < count($createdCandidates); $i++) {
            $createdCandidates[$i]->courses()->syncWithoutDetaching([
                $createdCourses[1]->id => ['status' => 'active']
            ]);
        }

        // IF203: next 6 candidates (index 12-17)
        for ($i = 12; $i < 18 && $i < count($createdCandidates); $i++) {
            $createdCandidates[$i]->courses()->syncWithoutDetaching([
                $createdCourses[2]->id => ['status' => 'active']
            ]);
        }

        // IF204: remaining candidates (index 18-22)
        for ($i = 18; $i < 23 && $i < count($createdCandidates); $i++) {
            $createdCandidates[$i]->courses()->syncWithoutDetaching([
                $createdCourses[3]->id => ['status' => 'active']
            ]);
        }

        // 8. Seed Candidate Scores
        // Get all criteria IDs
        $criteriaIds = Criteria::orderBy('id')->pluck('id')->toArray();
        // Map: course index => [candidate index, scores for C1..C6]
        $rawScores = [
            0 => [ // IF201
                0 => [82, 85, 80, 78, 83, 60], // Haniel
                1 => [75, 80, 85, 72, 77, 45], // Farhan
                2 => [88, 90, 90, 85, 88, 70], // Faqih
                3 => [70, 72, 75, 68, 71, 35], // Pancar
                4 => [78, 82, 80, 76, 79, 55], // Satria
                5 => [83, 79, 85, 80, 81, 50], // Aufa
                6 => [80, 85, 88, 82, 84, 65], // Raihan
            ],
            1 => [ // IF202
                7 => [77, 80, 78, 74, 76, 40], // Ferdi
                8 => [83, 81, 85, 80, 80, 50], // Ali (Aufa excluded from IF202 candidates)
                9 => [72, 75, 70, 70, 73, 55], // Latifa
                10 => [79, 83, 82, 77, 80, 45], // Fikry
                11 => [85, 87, 88, 83, 86, 60], // Talitha
            ],
            2 => [ // IF203
                12 => [77, 80, 78, 74, 76, 40], // Fahmi
                13 => [80, 83, 82, 79, 81, 58], // Izaz
                14 => [76, 78, 80, 73, 77, 42], // Salma
                15 => [84, 86, 85, 82, 83, 55], // Biladi
                16 => [79, 82, 80, 77, 80, 48], // Nafisah
                17 => [73, 75, 72, 71, 74, 36], // Fahri
            ],
            3 => [ // IF204
                18 => [78, 80, 82, 76, 79, 44], // Yoga
                19 => [85, 88, 86, 83, 86, 62], // Tsaqif
                20 => [80, 82, 84, 78, 81, 50], // Gilang
                21 => [77, 79, 78, 75, 78, 42], // Athaya
                22 => [76, 78, 80, 74, 77, 40], // Umar
            ],
        ];

        foreach ($rawScores as $courseIdx => $candidatesInCourse) {
            $courseId = $createdCourses[$courseIdx]->id;
            foreach ($candidatesInCourse as $candidateIdx => $scoreValues) {
                $candidateId = $createdCandidates[$candidateIdx]->id;

                for ($i = 0; $i < count($scoreValues); $i++) {
                    CandidateScore::firstOrCreate(
                        [
                            'candidate_id' => $candidateId,
                            'course_id' => $courseId,
                            'criteria_id' => $criteriaIds[$i],
                        ],
                        [
                            'score' => $scoreValues[$i],
                        ]
                    );
                }
            }
        }
    }
}
