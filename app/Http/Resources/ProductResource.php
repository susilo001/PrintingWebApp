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
            'prices' => PriceResource::collection($this->whenLoaded('prices')),
            'price' => $this->prices[0]['price'],
            'description' => $this->description,
            'images' => $this->getMedia('products')->map(function ($image) {
                return $image->getSrcset();
            }),
            'weight' => $this->weight,
            'discount' => new DiscountResource($this->whenLoaded('discount')),
            'tax' => $this->tax,
            'featured' => $this->featured,
            'variants' => VariantResource::collection($this->whenLoaded('variants')),
            'category' => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}
