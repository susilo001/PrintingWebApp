<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city_id',
        'city_name',
        'province_id',
        'province',
        'courier',
        'postal_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'courier' => 'array',
    ];

    /**
     * Belongs to order
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
