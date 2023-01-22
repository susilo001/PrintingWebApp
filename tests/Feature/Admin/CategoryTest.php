<?php

namespace Tests\Feature\Admin;

use App\Filament\Resources\CategoryResource;
use App\Filament\Resources\CategoryResource\Pages\CreateCategory;
use App\Models\Category;
use App\Models\User;
use function Pest\Livewire\livewire;

beforeEach(
    fn () => $this->actingAs(User::where('email', 'admin@admin.com')->first())
);

it('can view categories', function () {
    $this->get(CategoryResource::getUrl('index'))
        ->assertStatus(200);
});

it('can view category create form', function () {
    $this->get(CategoryResource::getUrl('create'))
        ->assertStatus(200);
});

it('can view category edit form', function () {
    $category = Category::factory()->create();

    $this->get(CategoryResource::getUrl('edit', $category->id))
        ->assertStatus(200);
});

/**
 * Test if admin can create new category
 */
it('can create new category', function () {
    $category = Category::factory()->make();

    livewire(CreateCategory::class)
        ->fillForm([
            'name' => $category->name,
            'slug' => $category->slug,
        ])
        ->assertFormSet([
            'name' => $category->name,
            'slug' => $category->slug,
        ])
        ->call('create')
        ->assertHasNoFormErrors();

    $this->assertDatabaseHas(Category::class, [
        'name' => $category->name,
        'slug' => $category->slug,
    ]);
});
