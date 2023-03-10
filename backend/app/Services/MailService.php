<?php

namespace App\Services;
use Swift_SmtpTransport;
use Swift_Mailer;
use Swift_Message;
use Illuminate\Mail\Mailer;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

Class MailService {
    /**
     * Send a email
     * @param string $template
     * @param array $params
     * @param string $email
     * @param string $subject
     * @param array $attachment
     * @return boolean
     */
    public static function sendMail($template, $params, $email, $subject, $cc = null, $attachment = null) {
        try {
            $mail = Mail::send($template, $params, function (Message $m) use ($email, $subject, $cc, $attachment, $params) {
                if (isset($params['from_address'])) {
                    $m->from(env('MAIL_FROM_ADDRESS'), $params['from_address_name'] ?? '');
                    $m->replyTo($params['from_address'], $params['from_address_name'] ?? '');
                }

                if ($cc) {
                    $m->cc($cc);
                }
                $m->to($email)
                    ->subject($subject)
                    ->priority(1);
                if($attachment) {
                    $m->attach($attachment);
                }
            });

            if ($mail) {
                return true;
            }
            
        } catch (\Exception $exception) {
            \Log::critical($exception->getMessage());
        }
        return false;
    }
    public static function sendUserMail($lead, $user, $agent, $subject, $content, $own_stmp){
        
        // Create the Transport
        if($own_stmp){
            $transport = (new Swift_SmtpTransport($user->mail_host, $user->mail_port))
            ->setUsername($user->mail_username)
            ->setPassword($user->mail_password);
        }else{
            $transport = (new Swift_SmtpTransport(\Config::get('mail.host'), \Config::get('mail.port')))
            ->setUsername(\Config::get('mail.username'))
            ->setPassword(\Config::get('mail.password'));
        }
        
        // Create the Mailer using your created Transport
        $mailer = new Swift_Mailer($transport);
        
        // Create a message
        if($own_stmp){
            $message = (new Swift_Message($subject))
            ->setFrom([$user->mail_from_address => $agent->name])
            // ->setTo([$lead->email => $lead->name])
            ->setTo(['alexjoe134367@gmail.com' => $lead->name])
            ->setReplyTo($agent->email)
            ->addPart($content, 'text/html');
        }else{
            $message = (new Swift_Message($subject))
            ->setFrom([\Config::get('mail.from.address') => $agent->name])
            // ->setTo([$lead->email => $lead->name])
            ->setTo(['alexjoe134367@gmail.com' => $lead->name])
            ->setReplyTo($agent->email)
            ->addPart($content, 'text/html');
        }

        // Send the message
        $result = $mailer->send($message);
        return $result;
    }
    /**
     * Send an error notification
     * 
     * @param type $exception
     * @param type $subject
     */
    public static function sendErrorNotification($exception, $subject = null) {
        try {
            $to = env('MAIL_ERROR_NOTIFY', 'dmitri.russu@gmail.com');

            if($subject === null) {
                $subject = 'IMPORTANT - Site Down: Lead aggregator - Error Code 500';
            }

            $mail = Mail::send('emails.error-notification', ['exception' => $exception], function ($m) use ($to, $subject) {
                $m->to($to)
                    ->subject($subject)
                    ->priority(1)
                    ->subject($subject);
            });

            if ($mail) {
                return true;
            }
        } catch (\Exception $exception) {
            \Log::critical($exception->getMessage());
        }
        return false;
    }
}
