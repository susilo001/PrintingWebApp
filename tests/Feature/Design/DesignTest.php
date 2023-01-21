<?php

namespace Tests\Feature\Design;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class DesignTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if the design screen can be rendered.
     *
     * @return void
     */
    public function test_design_screen_can_be_rendered()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/design');

        $response->assertStatus(200);
    }

    /**
     * Test if user can upload design.
     *
     * @return void
     */
    public function test_user_can_upload_design()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/design', [
            'image' => UploadedFile::fake()->image('design.png'),
            'data' => json_encode([
                'width' => 100,
                'height' => 100,
                'objects' => [
                    [
                        'type' => 'rect',
                        'width' => 100,
                        'height' => 100,
                        'fill' => 'red',
                        'left' => 100,
                        'top' => 100,
                    ],
                ],
            ]),
        ]);

        $response->assertStatus(302);
    }

    /**
     * Test if design api can be accessed.
     *
     * @return void
     */
    public function test_design_api_can_be_accessed()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson('/api/design');

        $response->assertStatus(200);
    }
}
