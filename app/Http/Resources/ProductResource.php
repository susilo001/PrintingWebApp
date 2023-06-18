<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'images' => $this->getMedia('products')->map(function ($image) {
                return $image->getSrcset();
            }),
            'weight' => $this->weight,
            'tax' => $this->tax,
            'featured' => $this->featured,
            'prices' => PriceResource::collection($this->whenLoaded('prices')),
            'discount' => new DiscountResource($this->whenLoaded('discount')),
            'variants' => VariantResource::collection($this->whenLoaded('variants')),
            'category' => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}
