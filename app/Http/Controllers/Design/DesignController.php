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
        $user = auth()->user();
        $role = $user->roles->first()->name;

        return Inertia::render('Design', [
            'role' => $role,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $json = json_decode($request->data);

            $name = $json->pages[0]->custom->name;
            $category = $json->pages[0]->custom->category->id;

            Template::create([
                'name' => $name,
                'template' => $request->data,
                'category_id' => $category,
            ])->addMediaFromRequest('image')->toMediaCollection('templates');
        } catch (\Exception $e) {
            return redirect()->route('design.index')->with('error', $e->getMessage());
        }

        return redirect()->route('design.index')->with('message', 'Template created successfully!');
    }

    public function show(Template $template)
    {
        return Inertia::render('Design', [
            'template' => $template,
        ]);
    }

    public function update(Request $request, Template $template)
    {
        $json = json_decode($request->data);

        $name = $json->pages[0]->custom->name;

        $template->update([
            'name' => $name,
            'template' => $request->data,
        ]);

        if ($request->hasFile('image')) {
            $template->clearMediaCollection('templates');
            $template->addMediaFromRequest('image')->toMediaCollection('templates');
        }

        return redirect()->route('design.index')->with('message', 'Template updated successfully!');
    }

    public function destroy(Template $template)
    {
        $template->delete();

        return redirect()->route('design.index')->with('message', 'Template deleted successfully!');
    }
}
