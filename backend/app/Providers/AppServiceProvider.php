<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Support\ServiceProvider;
// custom smtp test
use Illuminate\Mail\Mailer;
use Swift_Mailer;
use Swift_Message;
// custom smtp test

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        app('url')->forceRootUrl(env('APP_URL'));
        \Validator::extend('userEmail', function ($attribute, $value, $parameters, $validator) {
            if (isset($parameters[0])) {
                return !User::where('email', $value)->withTrashed()->whereNotIn('id', [$parameters[0]])->count();
            }
            return !User::where('email', $value)->withTrashed()->count();
        });
        \Validator::replacer('user_email', function ($message, $attribute, $rule, $parameters) {
            return 'Email already in use!';
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // custom smtp test
        $this->app->bind('user.mailer', function ($app, $parameters) {
            $smtp_host = array_get($parameters, 'smtp_host');
            $smtp_port = array_get($parameters, 'smtp_port');
            $smtp_username = array_get($parameters, 'smtp_username');
            $smtp_password = array_get($parameters, 'smtp_password');
            $smtp_encryption = array_get($parameters, 'smtp_encryption');
           
            $from_email = array_get($parameters, 'from_email');
            $from_name = array_get($parameters, 'from_name');
           
            // $from_email = $parameters['from_email'];
            // $from_name = $parameters['from_name'];
           
            $transport = new Swift_SmtpTransport($smtp_host, $smtp_port);
            $transport->setUsername($smtp_username);
            $transport->setPassword($smtp_password);
            $transport->setEncryption($smtp_encryption);
           
            $swift_mailer = new Swift_Mailer($transport);
           
            $mailer = new Mailer($app->get('view'), $swift_mailer, $app->get('events'));
            // $mailer->alwaysFrom($from_email, $from_name);
            // $mailer->alwaysReplyTo($from_email, $from_name);
           
            return $mailer;
           });
        // custom smtp test

    }
}
