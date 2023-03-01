<?php

namespace App\Http\Controllers\Design;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DesignController extends Controller
{
    public function index()
    {
        return Inertia::render('Design');
    }

    public function store(Request $request)
    {
        $json = json_decode($request->data);

        $name = $json->pages[0]->custom->name;

        $template = Template::create([
            'name' => $name,
            'template' => $request->data,
            'category_id' => 1,
        ]);

        $template->addMediaFromRequest('image')->toMediaCollection('templates');

        return redirect()->route('design.index')->with('message', 'Template created successfully!');
    }
}
