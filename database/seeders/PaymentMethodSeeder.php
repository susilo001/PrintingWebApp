<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::all();

        foreach ($user as $user) {
            PaymentMethod::factory()->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
