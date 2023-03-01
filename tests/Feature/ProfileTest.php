<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    /**
     * Configure the test environment.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->actingAs($this->user);
    }

    /**
     * Test that the profile page is displayed.
     */
    public function testProfilePageIsDisplayed(): void
    {
        $this->get('/profile')->assertOk();
    }

    /**
     * Test that the user's profile information can be updated.
     */
    public function testProfileInformationCanBeUpdated(): void
    {
        $this->patch('/profile', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ])->assertSessionHasNoErrors()->assertRedirect('/profile');

        $this->user->refresh();

        $this->assertSame('Test User', $this->user->name);
        $this->assertSame('test@example.com', $this->user->email);
        $this->assertNull($this->user->email_verified_at);
    }

    /**
     * Test email verification status unchange when the email address is uncanged.
     */
    public function testEmailVerificationStatusIsUnchangedWhenTheEmailAddressIsUnchanged(): void
    {
        $this->patch('/profile', [
            'name' => 'Test User',
            'email' => $this->user->email,
        ])->assertSessionHasNoErrors()->assertRedirect('/profile');

        $this->assertNotNull($this->user->refresh()->email_verified_at);
    }

    /**
     * Test if user can delete their account
     */
    public function testUserCanDeleteTheirAccount(): void
    {
        $this->delete('/profile', [
            'password' => 'password',
        ])->assertSessionHasNoErrors()->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($this->user->fresh());
    }

    /**
     * Test if correct password must be provided to delete account
     */
    public function testCorrectPasswordMustBeProvidedToDeleteAccount(): void
    {
        $this->from('/profile')->delete('/profile', [
            'password' => 'wrong-password',
        ])->assertSessionHasErrors('password')->assertRedirect('/profile');

        $this->assertNotNull($this->user->fresh());
    }

    /**
     * Test if user can add address to their profile
     */
    public function testUserCanAddAddress(): void
    {
        $this->post('/user/'.$this->user->id.'/address', [
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ])->assertRedirect('/profile');

        $this->assertDatabaseHas('addresses', [
            'user_id' => $this->user->id,
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);
    }

    /**
     * Test if user can update address
     */
    public function testUserCanUpdateAddress(): void
    {
        $address = $this->user->addresses()->create([
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);

        $this->patch('/address/'.$address->id, [
            'street_name' => 'Jl. Test 2',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ])->assertRedirect('/profile');

        $this->assertDatabaseHas('addresses', [
            'user_id' => $this->user->id,
            'street_name' => 'Jl. Test 2',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);
    }

    /**
     * Test if user can delete address
     */
    public function testUserCanDeleteAddress(): void
    {
        $address = $this->user->addresses()->create([
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);

        $this->delete('/address/'.$address->id)->assertRedirect('/profile');

        $this->assertDatabaseMissing('addresses', [
            'user_id' => $this->user->id,
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);
    }
}
