<?php

namespace App\Http\Controllers\Api\Management\Company;

use App\Http\Controllers\Controller;
use App\Models\Domain;
use App\Models\User;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    public function index(Request $request, $user)
    {
        $max_domains = User::where('id', $user)->first()->max_domains;
        $cur_domains = Domain::where(array('user_id' => $user))->count();
        
        if (!$request->id) {
            $exist = Domain::where(array('name' => $request->changeable))->first();
            if (is_null($exist)) {
                if($cur_domains < $max_domains){
                    $added = Domain::create(
                        array(
                            'user_id' => $user,
                            'name' => $request->changeable,
                        )
                    );
                    return array("state" => "success", "domain" => $added, "message" => "Domain name is created.");
                }else{
                    return array("state" => "error", "message" => 'Exceeded number of domains');    
                }
                

            } else {
                return array("state" => "error", "message" => "Domain name is already exist");
            }
        } else {
            $domain = Domain::where(array("id" => $request->id, "user_id" => $user))->first();
            if ($domain) {
                Domain::where(array("id" => $request->id))->update(array("name" => $request->changeable));
                return array("state" => "success", "domain" => $domain, "message" => "Domain name is updated.");
            } else {
                return array("state" => "error", "message" => "Domain is not exits");
            }
        }

    }
    public function get(Request $request)
    {
        return Domain::where(array('user_id' => $request->user()->id))->first();
    }

    function list(Request $request, $user) {
        $domain = Domain::where(array('user_id' => $user))->get();
        return $domain;
    }

    public function pagelist(Request $request)
    {
        $domain = Domain::with(['connect.project.pages'])->where(array('user_id' => $request->user()->id, 'name' => $request->domain))->first();
        return $domain;
    }

    public function deleteDomain(Request $request, $user, $domainId) {
        $domain = Domain::where(array("id" => $domainId, "user_id" => $user))->first();
        if ($domain) {
            Domain::where(array("id" => $domainId))->delete();
            return array("state" => "success", "message" => "Domain name is deleted.");
        } else {
            return array("state" => "error", "message" => "Domain is not exits");
        }
    }
}
