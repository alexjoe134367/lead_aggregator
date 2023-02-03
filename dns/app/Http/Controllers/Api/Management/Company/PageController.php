<?php

namespace App\Http\Controllers\Api\Management\Company;

use App\Models\ProjectPage;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $existproject = Project::where(array('id'=>$request->project_id,'user_id'=>$request->user()->id))->first();
        if(is_null($existproject)){
            return array('state'=>'noproject');
        }else{
            $project_id = $request->project_id;
            $page_id = $request->page_id;
            $content = $request->content;
            $type = $request->type;

            if(!is_null($request->name)){//when not exist name
                if($type == 2){//edit setting(name,title,seo)
                    $existpage = ProjectPage::where(array('project_id'=>$project_id,'name'=>$request->name))->where('id','!=',$page_id)->first();
                    if(is_null($existpage)){
                        ProjectPage::where(
                            array(
                                'project_id'=>$project_id,
                                'id'=>$page_id))
                        ->update(
                            array(
                                'name'=>$request->name,
                                'title'=>$request->title,
                                'description'=>$request->description,
                            ));
                            return array('state'=>'success');
                    }else{
                        return array('state'=>'existpage');
                    }
                }else{
                    $existpage = ProjectPage::where(array('project_id'=>$project_id,'name'=>$request->name))->first();
                    if(is_null($existpage)){//when nothing page
                        $data = array('project_id'=>$project_id,'name'=>$request->name);                    
                        if($type == 1){
                            $duplicateddata = array('gjs'=>$request->gjs,'content'=>$content);
                            $data = array_merge($data,$duplicateddata); 
                        }
                        $addedPage = ProjectPage::create($data);
                        $page_id = $addedPage->id;
                        $page = fopen(resource_path().'/views/projects/' . $project_id . '/' .$page_id .'.blade.php', 'w');
                        if($type == 1){
                            fwrite($page,$content);
                        }
                        return array('state'=>'success','page'=>$addedPage);
                    }else{//when exist page
                        return array('state'=>'existpage');
                    }
                }
            }else{//when edit(save) page
                if(!is_null($request->gjs)){
                    if($request->preview_image){
                        Project::where(array('id'=>$project_id))->update(array('preview_image'=>$request->preview_image));
                    }
                    ProjectPage::where(
                        array(
                            'project_id'=>$project_id,
                            'id'=>$page_id))
                    ->update(
                        array(
                            'content'=>$content,
                            'gjs'=>$request->gjs,
                        ));
                    $page = fopen(resource_path().'/views/projects/' . $project_id . '/' .$page_id .'.blade.php', 'w');
                    fwrite($page, $content);
                    return array('state'=>'success');
                }
            }
        }
    }

    public function delete(Request $request,$page_id){
        $deleted = ProjectPage::where('id',$page_id)->delete();
        return array('state'=>'success');
    }
}