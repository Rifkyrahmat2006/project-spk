<?php

namespace Database\Seeders;

use App\Models\Criteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $criteria = [
            [
                'code' => 'C1',
                'name' => 'Public Speaking',
                'weight' => 0.3000,
                'type' => 'benefit',
                'description' => 'Asisten harus mampu menyampaikan materi modul secara jelas, persuasif, dan adaptif kepada praktikan.',
                'is_active' => true,
            ],
            [
                'code' => 'C2',
                'name' => 'Penguasaan & Pemahaman Materi',
                'weight' => 0.3000,
                'type' => 'benefit',
                'description' => 'Prasyarat mutlak untuk membimbing dan menjawab pertanyaan teknis praktikan secara tepat dan mendalam.',
                'is_active' => true,
            ],
            [
                'code' => 'C3',
                'name' => 'Nilai Mata Kuliah Terkait',
                'weight' => 0.1000,
                'type' => 'benefit',
                'description' => 'Indikator rekam jejak akademis objektif; nilai minimal B sebagai ambang batas kelayakan.',
                'is_active' => true,
            ],
            [
                'code' => 'C4',
                'name' => 'Micro Teaching',
                'weight' => 0.1000,
                'type' => 'benefit',
                'description' => 'Simulasi mengajar untuk menilai kompetensi pedagogik, sistematika penyampaan, dan manajemen kelas.',
                'is_active' => true,
            ],
            [
                'code' => 'C5',
                'name' => 'Latihan Soal',
                'weight' => 0.1500,
                'type' => 'benefit',
                'description' => 'Mengukur kemampuan analytical thinking dan problem-solving kandidat secara terstruktur.',
                'is_active' => true,
            ],
            [
                'code' => 'C6',
                'name' => 'Keaktifan Mahasiswa',
                'weight' => 0.0500,
                'type' => 'cost',
                'description' => 'Beban kegiatan luar kampus; semakin tinggi, semakin besar potensi kendala manajemen waktu asisten.',
                'is_active' => true,
            ],
        ];

        foreach ($criteria as $criterion) {
            Criteria::create($criterion);
        }
    }
}
