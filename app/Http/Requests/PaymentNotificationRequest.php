<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentNotificationRequest extends FormRequest
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
            'transaction_id' => 'required|string',
            'transaction_time' => 'required|string',
            'status_message' => 'required|string',
            'status_code' => 'required|string',
            'payment_type' => 'required|string',
            'order_id' => 'required|string',
            'gross_amount' => 'required|string',
        ];
    }
}
