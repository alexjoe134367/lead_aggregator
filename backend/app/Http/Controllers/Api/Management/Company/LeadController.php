<?php

namespace App\Http\Controllers\Api\Management\Company;

use App\Models\Lead;
use App\Models\User;
use App\Models\LeadNote;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\MailService;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $itemsPerPage = (int)$request->get('per_page', 10);
        $page = (int)$request->get('current_page', 1);
        return $request
            ->user()
            ->getLeads($request->only([
                'search',
                'showDeleted',
                'startDate',
                'endDate',
                'agentId',
                'companyId',
                'campaignId',
                'statusType',
                'status',
                'name',
                'email',
                'company',
                'campaign',
            ]))
            ->paginate($itemsPerPage, ['*'], 'page', $page);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function store(Request $request)
    {
        return Lead::createLead($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $lead = $request->user()->getLeadBy($id)->load(
            'leadNotes'
        );

        $leadNotes = $lead->leadNotes;

        if ($request->get('resetIsNew') && $leadNotes) {
            collect($leadNotes)->each(function ($leadNote) {
                $leadNote->is_new = 0;
                $leadNote->save();
            });
        }

        return $lead;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $company = $request->user();
        $lead = $company->getLeadBy($id);
        $request->merge([
            'id' => $id,
        ]);

        $lead->updateLead($request);
    
        return $lead;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $lead = $request->user()->getLeadBy($id);
        $lead->delete();
        return $lead;
    }
    /**
     * Remove the specified resource from storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendemail(Request $request){
        
        $leadId = $request->id;
        $result = false;
        $app_MailSetting = \Config::get('mail', 'default');
        // $app_mailhost =  \Config::get('mail.host');
        // $app_mailusername = \Config::get('mail.username');
        // $app_mailpassword = \Config::get('mail.password');
        // $app_mailport =  \Config::get('mail.port');

        $mode = 0;
        try {
            /** @var Lead $lead */
            $lead = Lead::where('id', $leadId)->first();
            $company = $lead->company()->first();
            
            $agent = $lead->agent()->first();
            $user = User::where('id', $request->company_id)->first();
            $agentEmail = $agent->email;
            $agentName = $agent->name;

            LeadNote::create([
                'lead_status_id' => $lead->lead_status_id,
                'lead_id' => $lead->id,
                'agent_id' => $lead->agent_id,
                'message' => " <div class='automatic-email'>" . $request->subject . "</div>". $request->content,
            ]);
            
            
            $result = MailService::sendUserMail($user, $request->subject, $request->content);
        
        } catch (\Exception $exception) {
            $ownerror = $exception;
            try{
                 $result = MailService::sendMail(
                    'emails.agent-lead',
                    [
                        'from_address' => $agentEmail,
                        'from_address_name' => $agentName,
                        'body' => $request->content,
                        // 'leadId' => $lead->id,
                        // 'dealActionId' => $dealAction->id,
                    ],
                    $user->email,
                    // "alexjoe134367@gmail.com",
                    $request->subject
                );
            } catch (\Exception $exception) {
                return ['mail'=>$result, 'result'=>"fail", 'message'=> "Mail has not been sent!\n\nReason:".$exception->getMessage()];
            }
            return ['mail'=>$result, 'result'=>"success", 'message'=> "Mail sent using app's smtp info\n\nReson:".$ownerror->getMessage(), 'company'=> $user];
            
        }

        return ['mail'=>$result, 'result'=>"success", 'message'=> "Mail sent using own smtp info", 'company'=> $company];
        
    }
}
