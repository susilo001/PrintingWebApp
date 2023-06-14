<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city_name' => 'required|string|max:255',
            'city_id' => 'required|string|max:255',
            'province_id' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',

        ];
    }

    /**
     * Get the validation messages that apply to the request.
     * 
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'first_name.required' => 'First name is required',
            'last_name.required' => 'Last name is required',
            'email.required' => 'Email is required',
            'phone.required' => 'Phone is required',
            'address.required' => 'Address is required',
            'city_name.required' => 'City name is required',
            'city_id.required' => 'City id is required',
            'province_id.required' => 'Province id is required',
            'province.required' => 'Province is required',
            'postal_code.required' => 'Postal code is required',
        ];
    }
}
