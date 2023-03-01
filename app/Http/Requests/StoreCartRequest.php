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
            'project_name' => 'required|string|max:50',
            'description' => 'required|string',
            'quantity' => 'required|integer',
            'design' => 'required|file|max:2048',
            'variants' => 'required|json',
        ];
    }
}
