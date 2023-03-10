<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
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
            'subtotal' => $this->getSubtotal(),
            'discount' => $this->getDiscount(),
            'tax' => $this->getTax(),
            'total' => $this->getTotal(),
            'user' => new UserResource($this->whenLoaded('user')),
            'cartItems' => CartItemResource::collection($this->whenLoaded('cartItems')),
        ];
    }
}
