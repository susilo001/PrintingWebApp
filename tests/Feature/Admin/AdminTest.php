<?php

namespace Tests\Feature\Admin;

use App\Models\User;

beforeEach(fn () => $this->actingAs(User::where('email', 'admin@admin.com')->first()));

it('Test if can render admin dashboard', function () {
    $this->get('/admin')
        ->assertStatus(200);
});

it('Test if user non admin can access admin dashoard expect forbidden', function () {
    $this->actingAs(User::where('email', 'test@test.com')->first());

    $this->get('/admin')
        ->assertStatus(403);
});
