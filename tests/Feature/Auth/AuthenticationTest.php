<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    /**
     * Test if Admin role can login and redirect to admin dashboard
     * @return void
     */
    public function test_admin_can_login_and_redirect_to_admin_dashboard(): void
    {
        $response = $this->post('/login', [
            'email' => 'admin@admin.com',
            'password' => 'password',
        ]);

        $this->assertAuthenticated();

        $response->assertRedirect(RouteServiceProvider::ADMIN);
    }

    /**
     * Test if Super Admin role can login and redirect to admin dashboard
     * @return void
     */
    public function test_super_admin_can_login_and_redirect_to_admin_dashboard(): void
    {
        $response = $this->post('/login', [
            'email' => 'owner@owner.com',
            'password' => 'password',
        ]);

        $this->assertAuthenticated();

        $response->assertRedirect(RouteServiceProvider::ADMIN);
    }

    /**
     * Test if User role is customer can login and do not redirect to admin dashboard
     * @return void
     */
    public function test_user_can_login_and_redirect_to_home(): void
    {
        $response = $this->post('/login', [
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    /**
     * Test if request login with many attempts will be locked
     * 
     * @return void
     */
    public function test_login_request_with_many_attempts_will_be_locked(): void
    {
        $user = User::factory()->create();

        for ($i = 0; $i < 10; $i++) {
            $this->post('/login', [
                'email' => $user->email,
                'password' => 'wrong-password',
            ]);
        }

        $this->assertGuest();
    }

    /**
     * Test if user can logout and redirect to login page
     * 
     * @return void
     */
    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
