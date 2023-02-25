<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            RoleAndPermissionSeeder::class,
            AddressSeeder::class,
            CategorySeeder::class,
            DiscountSeeder::class,
            ProductSeeder::class,
            PriceSeeder::class,
            VariantSeeder::class,
            // OrderSeeder::class,
            // OrderItemSeeder::class,
            // PaymentDetailSeeder::class,
            // TestimonialSeeder::class,
        ]);
    }
}
