<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAddressRequest;

class AddressController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAddressRequest $request)
    {
        $request->user()->addresses()->create($request->validated());

        return redirect('/profile')->with([
            'title' => 'Success',
            'message' => 'Address added successfully',
            'status' => 'success',
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        if ($request->is_active === true) {
            $request->user()->addresses()->where('is_active', true)->update(['is_active' => false]);

            $address->update(['is_active' => true]);

            return redirect('/profile')->with([
                'title' => 'Success',
                'message' => 'Your default address has been updated',
                'status' => 'success',
            ]);
        }

        $address->update($request->all());

        return redirect('/profile')->with([
            'title' => 'Success',
            'message' => 'Address updated successfully',
            'status' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        $address->delete();

        return redirect('/profile')->with([
            'title' => 'Success',
            'message' => 'Address deleted successfully',
            'status' => 'success',
        ]);
    }
}
