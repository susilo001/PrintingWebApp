<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::factory()->count(10)->create();

        $customer = Role::create(['name' => 'customer']);

        $user->each(function ($user) use ($customer) {
            $user->assignRole($customer);
        });
    }
}
