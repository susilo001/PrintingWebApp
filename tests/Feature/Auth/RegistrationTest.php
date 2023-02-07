<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function testRegistrationScreenCanBeRendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function testNewUsersCanRegister(): void
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
    public function testNewUserGotAssignRoleCustomerByDefault(): void
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
