<?php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Models\ProjectPage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    public function pagelist(Request $request){
        $pages =  Project::with(['pages'])->where(array('name' => $request->project))->first();
        // return view('projects.' . $pages->id . '.' . $pages->pages[0]->id);
        return $pages;
    }
}