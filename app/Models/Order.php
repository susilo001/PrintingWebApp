<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'subtotal',
        'discount',
        'tax',
        'total_amount',
        'status',
    ];

    /**
     * Belongs to user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Has many order items
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Has one payment detail
     */
    public function paymentDetail(): HasOne
    {
        return $this->hasOne(PaymentDetail::class);
    }

    /**
     * Has one testimonial
     */
    public function testimonial(): HasOne
    {
        return $this->hasOne(Testimonial::class);
    }

    /**
     * Has one shipping
     */
    public function shipping(): HasOne
    {
        return $this->hasOne(Shipping::class);
    }
}
