<?php

namespace App\Http\Controllers\Api\Design;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Support\Facades\Storage;

class DesignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $templates = Template::all();

        $templates->each(function ($template) {
            $template->image = $template->getFirstMediaUrl('templates');
        });

        return response()->json([
            'templates' => $templates,
        ], 200);
    }
}
