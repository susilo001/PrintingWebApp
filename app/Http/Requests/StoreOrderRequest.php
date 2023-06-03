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

    /**
     * Get the validation error messages.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'order_id.required' => 'Order ID is required',
            'order_id.string' => 'Order ID must be a string',
            'status.required' => 'Status is required',
            'status.string' => 'Status must be a string',
            'payment_type.required' => 'Payment type is required',
            'payment_type.string' => 'Payment type must be a string',
            'gross_amount.required' => 'Gross amount is required',
            'gross_amount.string' => 'Gross amount must be a string',
            'transaction_id.required' => 'Transaction ID is required',
            'transaction_id.string' => 'Transaction ID must be a string',
            'transaction_time.required' => 'Transaction time is required',
            'transaction_time.string' => 'Transaction time must be a string',
            'transaction_message.required' => 'Transaction message is required',
            'transaction_message.string' => 'Transaction message must be a string',
        ];
    }
}
