<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCartRequest extends FormRequest
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
            'product_id' => 'required|integer',
            'description' => 'required|string',
            'quantity' => 'required|integer',
            'design' => 'required|file|max:2048',
            'variants' => 'required|json',
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
            'product_id.required' => 'Product ID is required',
            'product_id.integer' => 'Product ID must be an integer',
            'description.required' => 'Description is required',
            'description.string' => 'Description must be a string',
            'quantity.required' => 'Quantity is required',
            'quantity.integer' => 'Quantity must be an integer',
            'design.required' => 'Design is required',
            'design.file' => 'Design must be a file',
            'design.max' => 'Design must not be greater than 2048 kilobytes',
            'variants.required' => 'Variants is required',
            'variants.json' => 'Variants must be a valid JSON',
        ];
    }
}
