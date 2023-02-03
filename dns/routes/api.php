<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api'], function () {
    Route::prefix('v1')->group(function () {
        Route::post('domainpages','DomainController@pagelist');                                 //page list according to domain
        Route::post('projectpages','ProjectController@pagelist');        
        Route::get('user_info/{user_id}', 'AgencyController@getUserInfo');                       //page list according to domain
    });
});

Route::middleware(['cors'])->prefix('v1')->group(
    function () {
        Route::group(['namespace' => 'Api\Management\Admin'], function () {
            Route::prefix('admin')->group(function () {
                Route::post('template/{user}','TemplateController@index');                      //add or edit template
                Route::get('template/del/{id}','TemplateController@delete');                    //add or edit template

                Route::post('page/{user_id}','PageController@index');                           //add or edit template page
                Route::get('page/{page_id}','PageController@delete');                           //delete template page
            });
        });

        Route::group(['namespace' => 'Api\Management\Agency'], function () {
            Route::prefix('agency')->group(function () {
                //edit projectpage
                Route::post('page/{user}','PageController@index');                              //add or edit project page
                Route::get('page/{page_id}','PageController@delete');                           //delete project page
            });
        });

        Route::group(['namespace' => 'Api\Management\Company'], function () {
            Route::prefix('company')->group(function () {
                Route::post('domain/{user}','DomainController@index');
                Route::get('domain','DomainController@get');
                Route::get('domains/{user}','DomainController@list');                           //domain list
                Route::post('domainpages','DomainController@pagelist');                         //domain list
                Route::delete('domain/{user}/{domain}','DomainController@deleteDomain');        //domain list
                //project
                Route::post('project/{user}','ProjectController@index');                        //add or edit project
                Route::get('project/{project_id}','ProjectController@pagelist');                //get page list according to send project id
                Route::get('project/del/{project_id}/{user}','ProjectController@delete');       //get page list according to send project id
                Route::get('projects/{user}','ProjectController@list');                         //get project list
                
                
                //template
                Route::post('template','TemplateController@pagelist');                          //get page list according to send template id
                Route::get('template/{template_id}','TemplateController@pagelist');             //get page list according to send template id
                Route::get('templates','TemplateController@list');                              //get template list

                //edit project page
                Route::post('page','PageController@index');                                     //add or edit project page
                Route::get('page/{page_id}','PageController@delete');                           //delete project page

                //connect project to domain
                Route::post('connect/{user}','ConnectController@index');
                Route::get('connects/{user}','ConnectController@list');
            });
        });
    }
);
