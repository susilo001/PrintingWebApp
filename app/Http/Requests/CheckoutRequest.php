<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
            'billing_email' => 'required|email',
            'shipping_first_name' => 'required|string',
            'shipping_last_name' => 'required|string',
            'shipping_email' => 'required|email',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_postal_code' => 'required|string',
            'shipping_phone' => 'required|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'billing_email.required' => 'Email is required!',
            'billing_email.email' => 'Email is invalid!',
            'shipping_first_name.required' => 'First name is required!',
            'shipping_first_name.string' => 'First name is invalid!',
            'shipping_last_name.required' => 'Last name is required!',
            'shipping_last_name.string' => 'Last name is invalid!',
            'shipping_email.required' => 'Email is required!',
            'shipping_email.email' => 'Email is invalid!',
            'shipping_address.required' => 'Address is required!',
            'shipping_address.string' => 'Address is invalid!',
            'shipping_city.required' => 'City is required!',
            'shipping_city.string' => 'City is invalid!',
            'shipping_postal_code.required' => 'Postal code is required!',
            'shipping_postal_code.string' => 'Postal code is invalid!',
            'shipping_phone.required' => 'Phone is required!',
            'shipping_phone.string' => 'Phone is invalid!',
        ];
    }
}
