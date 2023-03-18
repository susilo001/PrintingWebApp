<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function testLoginScreenCanBeRendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function testUsersCanAuthenticateWithLoginScreen(): void
    {
        $response = $this->post('/login', [
            'email' => $this->user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    /**
     * Test if User role is customer can login and do not redirect to admin dashboard
     */
    public function testUserCanLoginAndRedirectToHome(): void
    {
        $response = $this->post('/login', [
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        $this->assertAuthenticated();

        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    public function testUsersCanNotAuthenticateWithInvalidPassword(): void
    {
        $this->post('/login', [
            'email' => $this->user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    /**
     * Test if request login with many attempts will be locked
     */
    public function testLoginRequestWithManyAttemptsWillBeLocked(): void
    {
        for ($i = 0; $i < 10; $i++) {
            $this->post('/login', [
                'email' => $this->user->email,
                'password' => 'wrong-password',
            ]);
        }

        $this->assertGuest();
    }

    /**
     * Test if user can logout and redirect to login page
     */
    public function testUserCanLogout(): void
    {
        $response = $this->actingAs($this->user)
            ->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }
}
