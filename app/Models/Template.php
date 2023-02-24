<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;

class Template extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'template',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
