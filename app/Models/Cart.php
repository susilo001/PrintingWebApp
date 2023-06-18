<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getSubtotal()
    {
        return $this->cartItems->sum(function ($item) {
            $price = $item->product->getPriceByOrderQuantity($item->qty);

            return $item->qty * $price;
        });
    }

    public function getDiscount()
    {
        $subtotal = $this->getSubtotal();

        return $this->cartItems->sum(function ($item) use ($subtotal) {
            $discountPercentage = $item->product->discount->active ? $item->product->discount->discount_percentage : 0;

            return round($subtotal * $discountPercentage / 100);
        });
    }

    public function getTax()
    {
        $subtotal = $this->getSubtotal();

        return $this->cartItems->sum(function ($item) use ($subtotal) {
            $taxPercentage = $item->product->tax ?? 0;

            return round($subtotal * $taxPercentage / 100);
        });
    }

    public function getTotal()
    {
        return round($this->getSubtotal() - $this->getDiscount() + $this->getTax());
    }

    public function getUserCart()
    {
        return $this->with('cartItems')->where('user_id', auth()->id())->firstOrFail();
    }

    public function getWeight()
    {
        return $this->cartItems->sum(function ($item) {
            return $item->qty * $item->product->weight;
        });
    }
}
