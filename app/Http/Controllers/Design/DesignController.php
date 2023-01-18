<?php

namespace App\Http\Controllers\Design;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class DesignController extends Controller
{
    public function index()
    {
        return Inertia::render('Design');
    }

    public function store(Request $request)
    {
        $fileName = 'templates/' . Date::now()->timestamp;

        $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $request->image));

        Storage::disk('public')->put($fileName . '.json', json_encode($request->data));

        Storage::disk('public')->put($fileName . '.png', $image);

        return redirect()->route('design.index')->with('success', 'Design created successfully');
    }
}
