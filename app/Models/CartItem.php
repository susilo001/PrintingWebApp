<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CartItem extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'qty',
        'name',
        'weight',
        'description',
        'variants',
        'discount',
        'tax',
        'product_id',
        'cart_id',
    ];

    protected $casts = [
        'variants' => 'array',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cart');
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
