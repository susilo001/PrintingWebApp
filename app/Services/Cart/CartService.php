<?php

namespace App\Services\Cart;

use App\Models\Product;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Storage;

class CartService
{
    protected Product $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Store the file in the storage and return the path
     */
    public function storeFile($file): string
    {
        return Storage::disk('public')->put('designs', $file, 'public');
    }

    /**
     * Add item to cart
     */
    public function add($data): void
    {
        $filePath = $this->storeFile($data['design']);

        $product = $this->product->find($data['product_id']);

        $price = $product->getPriceByOrderQuantity($data['quantity']);

        $cartItems = Cart::add([
            'id' => now()->timestamp,
            'qty' => $data['quantity'],
            'name' => $product->name,
            'price' => $price,
            'weight' => 0,
            'options' => [
                'product_id' => $data['product_id'],
                'description' => $data['description'],
                'design' => $filePath,
                'variants' => json_decode($data['variants']),
            ],
        ])->associate(Product::class);

        Cart::setTax($cartItems->rowId, $product->tax);

        $product->discount->active ? Cart::setDiscount($cartItems->rowId, $product->discount->discount_percentage) : null;
    }
}
