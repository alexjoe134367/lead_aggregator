<?php

namespace App\Http\Controllers\Api\Management;

use App\Models\User;
use App\Models\Cocode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $fields = [
            'id',
            'name',
            'avatar_path',
            'role',
            'permissions',
            'agencies',
            'email',
            'phone',
            'twilio_sid',
            'twilio_token',
            'twilio_mobile_number',
            'subscription_type',
            'mail_host',
            'mail_port',
            'mail_username',
            'mail_password',
	    'mail_from_address',
            'max_agency_companies',
        ];

        $cocodes = Cocode::where('agency_id', $request->user()->id)->get();
        
        if ($request->user()->isAgency() || $request->user()->isAgent()) {
            $result =['profile'=>$request->user()->load(['permissions'])->only($fields),'cocodes'=>$cocodes] ;
            return $result;
        }
        

        return $request->user()->load(['permissions', 'agencies'])->only($fields);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->user()->handleAvatar($request);
        $data = $request->only([
            'twilio_sid',
            'twilio_token',
            'twilio_mobile_number',
            'name',
            'email',
            'avatar_id',
            'phone',
            'password',
            'password_confirmation',
            'mail_host',
            'mail_port',
            'mail_username',
            'mail_password',
            'mail_from_address',
        ]);

        $user = $request->user()->updateUser($data);

        $request->user()->setupTwilioSmsWebHook(
            $request->get('twilio_sid'),
            $request->get('twilio_token'),
            $request->get('twilio_mobile_number')
        );

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        return $request->user()->delete();
    }

    public function useCocode(Request $request)
    {
        // $profile = $request->profile;
        // return $request->get('profile')['id'];
        // $user_id = $request->get('profile')['id'];
        $user = User::where('id', $request->get('profile')['id'])->first();
        // return ["result"=>$user1, "message"=>"Your coupon code is registered successfully."];

        if(!is_object($user) && $user->role != "AGENCY" ){
            return ["result"=>false, "message"=>"Please log in as a Agency."];
        }
         
        $cocode = Cocode::where(['code'=> $request->cocode, 'agency_id'=> null])->first();
        // return ["result"=>$cocode, "message"=>"Please log in as a Agency."];
        if(!is_object($cocode) || $cocode->agency_id != null ){
            return ["result"=>false, "message"=>"Your coupon code is not available."];
        }
        
        switch($user->max_agency_companies){
            case $user->max_agency_companies < 5:
                $user->max_agency_companies = 5;
                break;
            case $user->max_agency_companies < 10:
                $user->max_agency_companies = 10;
                break;
            default:
                $user->max_agency_companies = $user->max_agency_companies + 10;
                break;

        }
        $user->update();
        // return ["result"=>$user->id, "message"=>Carbon::now()->toDateTimeString()];
        Cocode::where('id', $cocode->id)->update(['agency_id'=>$user->id, 'used_at'=>Carbon::now()->toDateTimeString()]);

        return ["result"=>true, "message"=>"Your coupon code is registered successfully."];
    }
}
