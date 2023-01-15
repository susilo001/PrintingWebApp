<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    /**
     * Test if new user got assign role 'customer' by default
     */
    public function test_new_user_got_assign_role_customer_by_default(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'coba@coba.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $user = User::where('email', 'coba@coba.com')->first();

        $this->assertAuthenticated();

        $this->assertDatabaseHas('model_has_roles', [
            'role_id' => 1,
            'model_type' => 'App\Models\User',
            'model_id' => $user->id,
        ]);

        $response->assertRedirect(RouteServiceProvider::HOME);
    }
}
