<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Date;

class OrderResource extends JsonResource
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
            'status' => $this->status,
            'customer' => $this->user_id,
            'items' => OrderItemResource::collection($this->whenLoaded('orderItems')),
            'paymentDetail' => new PaymentDetailResource($this->whenLoaded('paymentDetail')),
            'subtotal' => $this->subtotal,
            'discount' => $this->discount,
            'tax' => $this->tax,
            'total' => $this->total_amount,
            'createdAt' => Date::parse($this->created_at)->format('d M Y'),
        ];
    }
}
