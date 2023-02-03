<?php

namespace App\Http\Controllers\Api\Management\Company;

use App\Models\Template;
use App\Models\TemplatePage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TemplateController extends Controller
{
    public function pagelist(Request $request,$template_id){
        $pages =  Template::with(['pages'])->where(array('id' => $template_id))->first();
        return $pages;
    }
    
    public function list(Request $request){
        $templates = Template::get()->all();
        // /$templates = ["aaa" => "123"];
        return $templates;
    }
}
