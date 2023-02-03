<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\MailService;
use Illuminate\Http\Request;
use App\Notifications\PasswordResetSuccess;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
     /**
     * Reset password
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string|email',
        ]);
        $user = User::where('email', $request->get('email'))->first();
        if (!$user)
            return response()->json([
                'message' => 'We can\'t find a user with that e-mail address.'
            ], 404);
        $password = Str::random(10);
        $user->password = bcrypt($password);
        $user->save();

        MailService::sendMail('emails.password-changed', [
            'user' => $user,
            'password' => $password,
        ],
            $user->email,
            "Your Convertlead password"
        );
        // $user->notify(new PasswordResetSuccess($password));
        return response()->json($user);
    }
}