<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
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
            'qty' => $this->qty,
            'name' => $this->name,
            'price' => $this->product->getPriceByOrderQuantity($this->qty),
            'weight' => $this->weight,
            'description' => $this->description,
            'design' => $this->getFirstMediaUrl('cart'),
            'variants' => $this->variants,
            'product' => new ProductResource($this->whenLoaded('product')),
            'cart' => new CartResource($this->whenLoaded('cart')),
        ];
    }
}
