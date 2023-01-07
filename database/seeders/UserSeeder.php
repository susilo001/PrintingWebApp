<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'John Sin',
            'email' => 'owner@owner.com',
            'password' => bcrypt('password'),
        ]);
        User::factory()->create([
            'name' => 'John Jhonny',
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->count(10)->create();
    }
}
