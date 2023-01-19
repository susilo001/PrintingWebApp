<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_verification_screen_can_be_rendered(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $response = $this->actingAs($user)->get('/verify-email');

        $response->assertStatus(200);
    }

    public function test_email_can_be_verified(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->actingAs($user)->get($verificationUrl);

        Event::assertDispatched(Verified::class);
        $this->assertTrue($user->fresh()->hasVerifiedEmail());
        $response->assertRedirect(RouteServiceProvider::HOME . '?verified=1');
    }

    public function test_email_is_not_verified_with_invalid_hash(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1('wrong-email')]
        );

        $this->actingAs($user)->get($verificationUrl);

        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    /**
     * Test if user already verified email, then redirect to home page.
     * 
     * @return void
     */
    public function test_user_already_verified_email_then_redirect_to_home_page(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        Event::dispatch(new Verified($user));

        $response = $this->actingAs($user)->get($verificationUrl);

        $response->assertRedirect('/' . '?verified=1');
    }

    /**
     * Test if user already verified redirect to home page
     * 
     * @return void
     */
    public function testIfUserAlreadyVerifiedRedirectToHomePage()
    {
        $user = User::factory()->create([
            'email_verified_at' => now()
        ]);

        $response = $this->actingAs($user)->get('/verify-email');

        $response->assertRedirect('/');
    }

    /**
     * Test if user need to resend email verification.
     * 
     * @return void
     */
    public function test_user_need_to_resend_email_verification(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $response = $this->actingAs($user)->post('/email/verification-notification');

        $response->assertSessionHas([
            'status' => 'verification-link-sent'
        ]);
    }

    /**
     * Test if user request resend email verification but the user already verified redirect to home page
     * 
     * @return void
     */
    public function testIfUserAskEmailVerificationButUserAlreadyVerifiedRedirectToHome()
    {
        $user = User::factory()->create([
            'email_verified_at' => now()
        ]);

        $response = $this->actingAs($user)->post('/email/verification-notification');

        $response->assertRedirect(RouteServiceProvider::HOME);
    }
}
