<?php

namespace App\Http\Controllers\Api;

use App\Models\Domain;
use App\Models\Connect;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DomainController extends Controller
{
    public function index(Request $request)
    {
        if($request->isNew == true){
            $exist = Domain::where(array('name' => $request->changeable))->first();
            if(is_null($exist)){
                $added = Domain::create(
                    array(
                        'user_id'=>$request->user()->id,
                        'name'=>$request->changeable,
                    )
                );
                return array("state"=>"success","domain"=>$added);
            }else{
                return array("state"=>"exist");
            }
        }else{
        }

    }
    public function get(Request $request){
        return Domain::where(array('user_id' => $request->user()->id))->first();
    }
    
    public function list(Request $request){
        $domain =  Domain::where(array('user_id' => $request->user()->id))->get();
        return $domain;
    }
    
    public function pagelist(Request $request){
        $domain =  Domain::with(['connect.project.pages'])->where(array('name'=>$request->domain))->first();
        return $domain;
    }
}