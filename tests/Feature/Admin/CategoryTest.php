<?php

namespace Tests\Feature\Admin;

use Tests\TestCase;
use App\Models\User;
use Livewire\Livewire;
use App\Models\Category;
use App\Filament\Resources\CategoryResource;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Filament\Resources\CategoryResource\Pages\CreateCategory;


class CategoryTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;

    public function setUp(): void
    {
        parent::setUp();

        $this->admin = User::where('email', 'admin@admin.com')->first();

        $this->actingAs($this->admin);
    }

    /**
     * Test if Admin can view categories
     *
     * @return void
     */
    public function testAdminCanViewCategories()
    {
        $this->get(CategoryResource::getUrl('index'))
            ->assertStatus(200);
    }

    /**
     * Test if Admin can view category create form
     *
     * @return void
     */
    public function testAdminCanViewCategoryCreateForm()
    {
        $this->get(CategoryResource::getUrl('create'))
            ->assertStatus(200);
    }

    /**
     * Test if Admin can view category edit form
     *
     * @return void
     */
    public function testAdminCanViewCategoryEditForm()
    {
        $category = Category::factory()->create();

        $this->get(CategoryResource::getUrl('edit', $category->id))
            ->assertStatus(200);
    }
}
