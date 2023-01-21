<?php

namespace App\Http\Controllers\Api\Design;

use App\Http\Controllers\Controller;
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
        $files = Storage::disk('public')->files('templates');

        $images = array_filter($files, function ($file) {
            return preg_match('/\.(jpg|jpeg|png|gif)$/', $file);
        });

        $json = array_filter($files, function ($file) {
            return preg_match('/\.(json)$/', $file);
        });

        $templates = [];

        foreach ($images as $image) {
            $name = str_replace('templates/', '', $image);
            $name = str_replace('.jpg', '', $name);
            $name = str_replace('.jpeg', '', $name);
            $name = str_replace('.png', '', $name);
            $name = str_replace('.gif', '', $name);

            $jsonFile = 'templates/'.$name.'.json';

            if (in_array($jsonFile, $json)) {
                $content = (array) json_decode(Storage::disk('public')->get($jsonFile));

                $templates[] = [
                    'id' => $name,
                    'image' => asset('storage/'.$image),
                    'json' => asset('storage/'.$jsonFile),
                ];
            }
        }

        return response()->json([
            'templates' => $templates,
        ], 200);
    }
}
