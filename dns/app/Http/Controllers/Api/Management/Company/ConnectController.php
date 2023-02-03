<?php

namespace App\Http\Controllers\Api\Management\Company;

use App\Http\Controllers\Controller;
use App\Models\Connect;
use Illuminate\Http\Request;

class ConnectController extends Controller
{
    public function index(Request $request, $user)
    {
        // If no domain set to project
        if (!$request->domain) {
            Connect::where(array('user_id' => $user, 'project_id' => $request->id))->delete();
            return array("state" => "success", "message" => "Domain is removed from project", 'flag'=>2);
        } else {
            // Check the domain if already assigned.
            $existDomain = Connect::where(array('domain_id' => $request->domain))->first();
            if ($existDomain) {
                // Check the domain is assigned to current user.
                $assignedDomain = Connect::where(array('user_id' => $user, 'domain_id' => $request->domain))->first();
                if (!$assignedDomain) {
                    return array("state" => "error", "message" => "Domain is already assigned to another user");
                } else {
                    // Delete connect if there is already assigned the domain name to project.
                    Connect::where(array('user_id' => $user, 'domain_id' => $request->domain))->delete();
                    Connect::where(array('user_id' => $user, 'project_id' => $request->id))->delete();
                    $con = Connect::create(
                        array(
                            'user_id' => $user,
                            'project_id' => $request->id,
                            'domain_id' => $request->domain,
                        )
                    );    
                    return array('state' => 'success', 'message' => 'Domain is connected to new project', 'connect'=>$con, 'flag'=>1);
                }
            } else {
                $con = Connect::create(
                    array(
                        'user_id' => $user,
                        'project_id' => $request->id,
                        'domain_id' => $request->domain,
                    )
                );
                return array('state' => 'success', 'message' => 'Domain is connected to project', 'connect' => $con, 'flag'=>0);
            }
        }
    }

    function list(Request $request, $user) {
        $connects = Connect::where(array('user_id' => $user))->get();
        return $connects;
    }
}
