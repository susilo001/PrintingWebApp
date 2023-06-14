<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory()
            ->has(Cart::factory()->count(1))
            ->count(10)
            ->create();

        $owner = User::factory()
            ->has(Cart::factory()->count(1))
            ->create([
                'name' => 'John Sin',
                'email' => 'owner@owner.com',
                'password' => bcrypt('password'),
                'phone_number' => fake()->phoneNumber(),
            ]);

        $admin = User::factory()
            ->has(Cart::factory()->count(1))
            ->create([
                'name' => 'John Doe',
                'email' => 'admin@admin.com',
                'password' => bcrypt('password'),
                'phone_number' => fake()->phoneNumber(),
            ]);

        $test = User::factory()
            ->has(Cart::factory()->count(1))
            ->create([
                'name' => 'John Jhonny',
                'email' => 'test@test.com',
                'password' => bcrypt('password'),
                'phone_number' => fake()->phoneNumber(),
            ]);

        $owner->assignRole('super-admin');

        $admin->assignRole('administrator');

        $test->assignRole('customer');

        $users->each(function ($user) {
            $user->assignRole('customer');
        });
    }
}
