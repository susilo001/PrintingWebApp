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
            'highlights' => $this->highlights,
            'details' => $this->details,
            'images' => $this->getMedia('products')->map(function ($image) {
                return $image->getFullUrl();
            }),
            'weight' => $this->weight,
            'tax' => $this->tax,
            'featured' => $this->featured,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'discount' => $this->discount,
            'variants' => VariantResource::collection($this->whenLoaded('variants')),
            'prices' => $this->prices,
        ];
    }
}
