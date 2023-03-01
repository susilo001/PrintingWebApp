<?php

namespace App\Models;

use App\Filters\Filterable;
use Gloudemans\Shoppingcart\CanBeBought;
use Gloudemans\Shoppingcart\Contracts\Buyable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements Buyable, HasMedia
{
    use HasFactory, CanBeBought, Filterable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'tax',
        'featured',
        'weight',
        'discount_id',
        'category_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'featured' => 'boolean',
        'images' => 'array',
    ];

    /**
     * Belongs to category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Belongs to discount
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function discount()
    {
        return $this->belongsTo(Discount::class);
    }

    /**
     * Has many prices
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function prices()
    {
        return $this->hasMany(Price::class);
    }

    /**
     * Has one order item
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function orderItem()
    {
        return $this->hasOne(OrderItem::class);
    }

    /**
     * Has many variants
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function variants()
    {
        return $this->hasMany(Variant::class);
    }

    /**
     * get product price by order quantity
     */
    public function getPriceByOrderQuantity($quantity)
    {
        $prices = $this->prices;

        try {
            $quantity > $prices->max('max_order') ? $price = $prices->last() : $price = $prices->where('min_order', '<=', $quantity)->where('max_order', '>=', $quantity)->first();

            return $price->price;
        } catch (\Exception $e) {
            return throw new \Exception('The minimum order is '.$prices->min('min_order').' pcs');
        }
    }
}
