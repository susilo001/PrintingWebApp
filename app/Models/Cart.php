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
            $itemTotal = $item->qty * $item->product->getPriceByOrderQuantity($item->qty);

            return $itemTotal;
        });
    }

    public function getDiscount()
    {
        return $this->cartItems->sum(function ($item) {
            if ($item->product->discount->active === true) {
                return $item->qty * $item->product->getPriceByOrderQuantity($item->qty) * $item->product->discount->discount_percentage / 100;
            }

            return 0;
        });
    }

    public function getTax()
    {
        return $this->cartItems->sum(function ($item) {
            return $item->qty * $item->product->getPriceByOrderQuantity($item->qty) * $item->product->tax / 100;
        });
    }

    public function getTotal()
    {
        return $this->getSubtotal() - $this->getDiscount() + $this->getTax();
    }
}
