<?php

namespace Tests\Feature\Admin;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if the admin dashboard is accessible by an admin user
     * 
     * @return void
     */
    public function testAdminDashboard()
    {
        $admin = User::where('email', 'admin@admin.com')->first();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertStatus(200);
    }

    /**
     * Test if the admin dashboard is not accessible by a non-admin user
     * 
     * @return void
     */
    public function testNonAdminDashboard()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/admin')
            ->assertStatus(403);
    }
}
