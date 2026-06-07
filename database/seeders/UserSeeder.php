<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default superadmin account
        User::create([
            'name' => 'Superadmin eSPeKa',
            'email' => 'superadmin@espeka.unsoed.ac.id',
            'password' => Hash::make('password'),
            'role' => 'superadmin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create sample admin (KoorAsPrak)
        User::create([
            'name' => 'Admin Struktur Data',
            'email' => 'admin.sd@espeka.unsoed.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create sample candidate user
        User::create([
            'name' => 'Faqih Ardiansyah',
            'email' => 'faqih@student.unsoed.ac.id',
            'nim' => 'H1D022001',
            'password' => Hash::make('password'),
            'role' => 'user',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
    }
}
