<?php

namespace Tests\Feature\Admin;

use App\Filament\Resources\ProductResource;
use App\Filament\Resources\ProductResource\Pages\CreateProduct;
use App\Models\Product;
use App\Models\User;
use function Pest\Livewire\livewire;

beforeEach(fn () => $this->actingAs(User::where('email', 'admin@admin.com')->first()));

/**
 * Test if Admin can view products list
 */
it('Test if admin can view products list', function () {
    $this->get(ProductResource::getUrl('index'))
        ->assertStatus(200);
});

/**
 * Test if Admin can view product create form
 */
it('Test if admin can view product create form', function () {
    $this->get(ProductResource::getUrl('create'))
        ->assertStatus(200);
});

/**
 * Test if admin can view edit product form
 */
it('Test if admin can view edit product form', function () {
    $this->get(ProductResource::getUrl('edit', 1))
        ->assertStatus(200);
});

/**
 * Test if admin can create new product
 */
// it('Test if admin can create new product', function () {
//     $product = Product::factory()->make();

//     livewire(CreateProduct::class)
//         ->fillForm([
//             'name' => $product->name,
//             'slug' => $product->slug,
//             'description' => $product->description,
//             'images' => $product->images,
//             'details' => $product->details,
//             'highlights' => $product->highlights,
//             'weight' => $product->weight,
//             'tax' => $product->tax,
//             'category_id' => $product->category_id,
//             'discount_id' => $product->discount_id,
//             'variants' => $product->variants()->create(),
//             'prices' => $product->prices()->create()
//         ])
//         ->assertFormSet([
//             'name' => $product->name,
//             'slug' => $product->slug,
//             'description' => $product->description,
//             'images' => $product->images,
//             'details' => $product->details,
//             'highlights' => $product->highlights,
//             'weight' => $product->weight,
//             'tax' => $product->tax,
//             'category_id' => $product->category_id,
//             'discount_id' => $product->discount_id,
//         ])
//         ->call('create')
//         ->assertHasNoFormErrors();

//     $this->assertDatabaseHas(Product::class, [
//         'name' => $product->name,
//         'slug' => $product->slug,
//         'description' => $product->description,
//         'details' => $product->details,
//         'weight' => $product->weight,
//         'tax' => $product->tax,
//         'category_id' => $product->category_id,
//         'discount_id' => $product->discount_id,
//     ]);
// });
