<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'order_id' => 'required|string',
            'status' => 'required|string',
            'payment_type' => 'required|string',
            'gross_amount' => 'required|string',
            'transaction_id' => 'required|string',
            'transaction_time' => 'required|string',
            'transaction_message' => 'required|string',
        ];
    }
}
