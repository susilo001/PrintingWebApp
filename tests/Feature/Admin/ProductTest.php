<?php

namespace Tests\Feature\Admin;

use App\Filament\Resources\ProductResource;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;


    public function setUp(): void
    {
        parent::setUp();

        $this->admin = User::where('email', 'admin@admin.com')->first();
    }

    /**
     * Test if Admin can view products
     * 
     * @return void
     */
    public function testAdminCanViewProducts()
    {
        $this->actingAs($this->admin)->get(ProductResource::getUrl('index'))
            ->assertStatus(200);
    }

    /**
     * Test if Admin can create a product 
     * 
     * @return void
     */
    public function testAdminCanCreateProduct()
    {
        $this->actingAs($this->admin)->get(ProductResource::getUrl('create'))
            ->assertStatus(200);
    }

    /**
     * Test if Admin can edit a product 
     * 
     * @return void
     */
    public function testAdminCanEditProduct()
    {
        $this->actingAs($this->admin)->get(ProductResource::getUrl('edit', 1))
            ->assertStatus(200);
    }
}
