<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
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
            'desc' => $this->description,
            'variants' => $this->variants,
            'image' => $this->getFirstMediaUrl('designs'),
            'price' => $this->price,
            'qty' => $this->qty,
            'discount' => $this->discount,
            'tax' => $this->tax,
            'product' => new ProductResource($this->whenLoaded('product')),
        ];
    }
}
