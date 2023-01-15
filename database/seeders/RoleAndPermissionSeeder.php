<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = Role::create(['name' => 'super-admin']);
        $administrator = Role::create(['name' => 'administrator']);

        $owner =  User::factory()->create([
            'name' => 'John Sin',
            'email' => 'owner@owner.com',
            'password' => bcrypt('password'),
            'phone_number' => fake()->phoneNumber(),
        ]);

        $admin =  User::factory()->create([
            'name' => 'John Doe',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'phone_number' => fake()->phoneNumber(),
        ]);

        $test = User::factory()->create([
            'name' => 'John Jhonny',
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
            'phone_number' => fake()->phoneNumber(),
        ]);

        $owner->assignRole($superAdmin);

        $admin->assignRole($administrator);

        $test->assignRole('customer');
    }
}
