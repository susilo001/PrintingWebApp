<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Address::create([
            'user_id' => $request->user()->id,
            'street_name' => $request->street_name,
            'city' => $request->city,
            'province' => $request->province,
            'zip_code' => $request->zip_code,
        ]);

        return redirect('/profile')
            ->with('message', 'Address added successfully');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        $address->update([
            'user_id' => $request->user()->id,
            'street_name' => $request->street_name,
            'city' => $request->city,
            'province' => $request->province,
            'zip_code' => $request->zip_code,
        ]);

        return redirect('/profile')
            ->with('message', 'Address updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        $address->delete();

        return redirect('/profile')->with('message', 'Address deleted successfully');
    }
}
