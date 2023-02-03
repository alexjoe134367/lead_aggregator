<?php

namespace App\Http\Controllers\Api\Management\Admin;

use App\Models\Template;
use App\Models\TemplatePage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use File;

class TemplateController extends Controller
{
    public function index(Request $request, $user)
    {
        //here changable is template
        if($request->isNew == true){//when create template
            if($request->id == 0){//If blank template
                $exist = Template::where(array('name'=>$request->changeable))->first();
                // return array('name'=>$exist);
                if(is_null($exist)){//add template if not exist template that have same name.
                    $added = Template::create(
                        array(
                            'user_id'=>$user,
                            'category_id'=>$request->category_id,
                            'name'=>$request->changeable,
                        )
                    );
                    $template_id = $added->id;
                    $path = resource_path().'/views/templates/' . $template_id;
                    File::makeDirectory($path, $mode = 0777, true, true);
                    $indexpageadded = TemplatePage::create(
                        array(
                            'template_id'=>$template_id,
                            'name'=>'index',
                        )
                    );
                    $page_id = $indexpageadded->id;
                    fopen(resource_path().'/views/templates/' . $template_id . '/' .$page_id .'.blade.php', 'w');
                    
                    return array('state'=>'success','template_id'=>$template_id,'page_id'=>$page_id);
                }else{
                    return array('state'=>'exist');
                }
            }else{//if template use template

            }
        }else{//when modify template
            $editedTemplate = Template::where(array('id'=>$request->selCard))->update(array('preview_image'=>$request->src));
            return array('state'=>'success');
        }
    }
    
    public function pagelist(Request $request,$template_id){
        $pages =  Template::with(['pages'])->where(array('id' => $template_id))->first();
        return $pages;
    }

    public function delete(Request $request, $template_id){
        $pages =  Template::with(['pages'])->where(array('id' => $template_id))->delete();
        $path = resource_path().'/views/templates/' . $template_id;
        File::deleteDirectory($path);
        return array("state" => "success");
    }
}
