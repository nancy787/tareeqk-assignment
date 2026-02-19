<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name'  => 'Tareeq Customer',
                'email' => 'customer@example.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('password123'),
                'type' => 'customer',
                'remember_token' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Test Driver',
                'email' => 'driver@example.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('password123'),
                'type' => 'driver',
                'remember_token' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
