<?php

namespace Tests\Feature\Admin;

use App\Filament\Resources\OrderResource;
use App\Models\User;

beforeEach(fn () => $this->actingAs(User::where('email', 'admin@admin.com')->first()));

/**
 * Test if admin can view orders list
 */
it('Test if admin can view orders list', function () {
    $this->get(OrderResource::getUrl('index'))
        ->assertStatus(200);
});

/**
 * Test if admin can view order create form
 */
it('Test if admin can view order create form', function () {
    $this->get(OrderResource::getUrl('create'))
        ->assertStatus(200);
});

/**
 * Test if admin can view edit order form
 */
it('Test if admin can view edit order form', function () {
    $this->get(OrderResource::getUrl('edit', 1))
        ->assertStatus(200);
});
