<?php

namespace App\Http\Controllers\Api\Management\Company;

use App\Models\Project;
use App\Models\ProjectPage;
use App\Models\Connect;
use App\Models\User;
use App\Models\AgencyCompany;
use App\Models\Template;
use App\Models\TemplatePage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use File;

class ProjectController extends Controller
{
    public function index(Request $request, $user)
    {
        $loggedUser = User::where('id', $user)->first();
        $max_projects = $loggedUser->max_projects;
        $cur_projects = Project::where("user_id" , $user)->count();

        //here changable is project
        if($request->isNew == true){//when create project
            if($request->id == 0 && $max_projects > $cur_projects){//If blank project
                $exist = Project::where(array('name'=>$request->changeable))->first();
                
                if(is_null($exist)){//add project if not exist project that have same name.
                    
                    if ($loggedUser->role == 'COMPANY'){
                        $agency_id = AgencyCompany::where('company_id', $user)->first()->agency_id;
                        $added = Project::create(
                            array(
                                'user_id'=>$agency_id,
                                'name'=>$request->changeable,
                                'company_id'=>$user,
                            )
                        );
                    }else{
                        $added = Project::create(
                            array(
                                'user_id'=>$user,
                                'name'=>$request->changeable,
                                'company_id'=>$request->company,
                            )
                        );
                    }
                    
                    
                    $project_id = $added->id;
                    
                    $path = resource_path().'/views/projects/' . $project_id;
                    File::makeDirectory($path, 0777, true, true);

                    $page_id = 0;

                    if($request->template_id == 0){
                        $indexpageadded = ProjectPage::create(
                            array(
                                'project_id'=>$project_id,
                                'name'=>'index',
                            )
                        );
                        
                        $page_id = $indexpageadded->id;
                        fopen(resource_path().'/views/projects/' . $project_id . '/' .$page_id .'.blade.php', 'w');
                    }else{//if project use template
                        $template = Template::with(['pages'])->where(array('id'=>$request->template_id))->first();
                        $pages = $template->pages;
                        $newpages = array();
                        $ids = array();
                        foreach($pages as $i => $page){
                            $ids[$i] = $page->id;
                            $page  = array_except($page,['id','template_id','created_at','updated_at','deleted_at']);
                            $page  = array_add($page,'project_id',$project_id);
                            $newpages[$i] = ['project_id'=>$project_id,'name'=>$page->name,'gjs'=>$page->gjs,'content'=>$page->content];
                        }
                        ProjectPage::insert($newpages);
                        $addedproject = Project::with(['pages'])->where(array('id'=>$project_id))->first();
                        foreach($addedproject->pages as $i => $page){
                            if($i == 0){
                                $page_id = $page->id;
                            }
                            $from_path = resource_path().'/views/templates/'.$request->template_id.'/'.$ids[$i].'.blade.php';
                            $to_path = resource_path().'/views/projects/'.$addedproject->id.'/'.$page->id.'.blade.php';
                            fopen($to_path, 'w');
                            File::copy($from_path, $to_path);
                        }
                    }
                    return array('state'=>'success','project_id'=>$project_id,'page_id'=>$page_id);
                }else{
                    return array('state'=>'exist');
                }
            }else{
                return array('state'=>'exceed');
            }   
        }else{//when modify project
            $exist = Project::where(array('name'=>$request->changeable,'company_id'=>$request->company))->first();
            if(is_null($exist)){
                $editedPage = Project::where(
                    array(
                        'id'=>$request->id,
                        'user_id'=>$user,
                    ))->update(
                    array(
                        'name'=>$request->changeable,
                        'company_id'=>$request->company,
                    ));
                return array('state'=>'updated');
            }else{
                return array('state'=>'exist');
            }
        }
    }

    public function pagelist(Request $request,$project_id) {
        $pages =  Project::with(['pages'])->where(array('id' => $project_id))->first();
        return $pages;
    }
    
    public function list(Request $request, $user) {
        
        $loggedUser = User::where('id', $user)->first();
        if($loggedUser->role == 'COMPANY'){
            $projects = Project::with(['pages'])->where(array('company_id' => $user))->get();
        }else{
            $projects = Project::with(['pages'])->where(array('user_id' => $user))->get();
        }

        return $projects;
    }
    
    public function delete(Request $request, $id, $user){
        $loggedUser = User::where('id', $user)->first();
        
        if ($loggedUser->role == 'COMPANY'){
            $agency_id = AgencyCompany::where('company_id', $user)->first()->agency_id;
            $project = Project::where(array("id" => $id, "user_id" => $agency_id))->first();
        } else {
            $project = Project::where(array("id" => $id, "user_id" => $user))->first();
        }
        if ($project) {
            Project::where(array("id" => $id))->delete();
            $path = resource_path().'/views/projects/' . $id;
            File::deleteDirectory($path);
            return array("state" => "success", "message" => "Project is deleted.");
        } else {
            return array("state" => "error", "message" => "Project is not exits");
        }
        
        
    }
}
