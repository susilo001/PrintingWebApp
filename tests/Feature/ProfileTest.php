<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function testProfilePageIsDisplayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/profile');

        $response->assertOk();
    }

    public function testProfileInformationCanBeUpdated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function testEmailVerificationStatusIsUnchangedWhenTheEmailAddressIsUnchanged(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User',
                'email' => $user->email,
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function testUserCanDeleteTheirAccount(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function testCorrectPasswordMustBeProvidedToDeleteAccount(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/profile');

        $this->assertNotNull($user->fresh());
    }

    /**
     * Test if user can add address to their profile
     *
     * @return void
     */
    public function testUserCanAddAddress()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/profile/address', [
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ])->assertRedirect('/profile');

        $this->assertDatabaseHas('addresses', [
            'user_id' => $user->id,
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);
    }

    /**
     * Test if user can update address
     *
     * @return void
     */
    public function testUserCanUpdateAddress()
    {
        $user = User::factory()->create();
        $address = $user->addresses()->create([
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);

        $this->actingAs($user)->patch('/profile/address/' . $address->id, [
            'street_name' => 'Jl. Test 2',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ])->assertRedirect('/profile');

        $this->assertDatabaseHas('addresses', [
            'user_id' => $user->id,
            'street_name' => 'Jl. Test 2',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);
    }

    /**
     * Test if user can delete address
     *
     * @return void
     */
    public function testUserCanDeleteAddress()
    {
        $user = User::factory()->create();
        $address = $user->addresses()->create([
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);

        $this->actingAs($user)->delete('/profile/address/' . $address->id)
            ->assertRedirect('/profile');

        $this->assertDatabaseMissing('addresses', [
            'user_id' => $user->id,
            'street_name' => 'Jl. Test',
            'city' => 'Jakarta',
            'province' => 'DKI Jakarta',
            'zip_code' => '12345',
        ]);
    }
}
