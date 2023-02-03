<?php

namespace App\Http\Controllers\Api\Management\Admin;

use App\Models\TemplatePage;
use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $existtemplate = Template::where(array('id'=>$request->template_id))->first();
        if(is_null($existtemplate)){
            return array('state'=>'noproject');
        }else{
            $template_id = $request->template_id;
            $page_id = $request->page_id;
            $content = $request->content;
            $type = $request->type;

            if(!is_null($request->name)){//when not exist name-> add 
                if($type == 2){//edit setting(name,title,seo)
                    $existpage = TemplatePage::where(array('template_id'=>$template_id,'name'=>$request->name))->where('id','!=',$request->page_id)->first();
                    if(is_null($existpage)){
                        TemplatePage::where(
                            array(
                                'template_id'=>$template_id,
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
                    $existpage = TemplatePage::where(array('template_id'=>$template_id,'name'=>$request->name))->first();
                    
                    if(is_null($existpage)){//when nothing page
                        $data = array('template_id'=>$template_id,'name'=>$request->name);            
                        if($type == 1){
                            $duplicateddata = array('gjs'=>$request->gjs,'content'=>$content);
                            $data = array_merge($data,$duplicateddata); 
                        }
                        $addedPage = TemplatePage::create($data);

                        $page_id = $addedPage->id;
                        $page = fopen(resource_path().'/views/templates/' . $template_id . '/' .$page_id .'.blade.php', 'w');
                        if($type == 1){
                            fwrite($page, $content);
                        }
                        return array('state'=>'success','page'=>$addedPage);
                    }else{//when exist page
                        return array('state'=>'existpage');
                    }
                }
            }else{//when page edit(save) page
                if(!is_null($request->gjs)){
                    TemplatePage::where(
                        array(
                            'template_id'=>$template_id,
                            'id'=>$page_id))
                    ->update(
                        array(
                            'content'=>$content,
                            'gjs'=>$request->gjs,
                        ));
                    $page = fopen(resource_path().'/views/templates/' . $template_id . '/' .$page_id .'.blade.php', 'w');
                    fwrite($page, $content);
                    return array('state'=>'success');
                }
            }
        }
    }

    public function delete(Request $request,$page_id){
        TemplatePage::where('id',$page_id)->delete();
        return array('state'=>'success');
    }
}