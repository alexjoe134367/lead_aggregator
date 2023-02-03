<?php

use App\Models\Domain;
use Illuminate\Http\Request;

Route::group(['domain' => '{domainName}.{ext}'], function()
{
    Route::get('/', function($domainName, $ext)
    {
        $customDomain = $domainName . "." . $ext;
        $domain = Domain::with(['connect.project.pages'])->where('name', 'like', '%' . $customDomain . '%')->first();
        if (!$domain) {
            return "<h1 style='text-align:center'>A record not found</h1>";
        }
        echo($domain);
        if (!isset($domain->connect) || !isset($domain->connect->project) || !is_object($domain->connect)) {
            Route::redirect('/', 'https://responsivewebpages.com/');
        }
        $project_id = $domain->connect->project->id;
        $page_id = $domain->connect->project->pages[0]->id;
        $title = $domain->connect->project->pages[0]->title;
        $description = $domain->connect->project->pages[0]->description;
        return view('projects.' . $project_id . '.' . $page_id, array("title" => $title, "description" => $description));
    });

    Route::get('/{page}', function ($domainName, $ext, $page) {
        $customDomain = $domainName . "." . $ext;
        $domain = Domain::with(['connect.project.pages'])->where('name', 'like', '%' . $customDomain . '%')->first();
        // $domain = Domain::with(['connect.project.pages'])->where(array('name' => $customDomain))->first();
        if ($domain == null) {
            return "<h1 style='text-align:center'>A record not found</h1>";
        }
        $page_id;
        $project_id = $domain->connect->project->id;
        $title = "Convert lead for " . $customDomain;
        $description = "";
        foreach ($domain->connect->project->pages as $i => $xpage) {
            if ($page == $xpage->name) {
                $page_id = $xpage->id;

                if ($xpage->title) {
                    $title = $xpage->title;
                }
                if ($xpage->description) {
                    $description = $xpage->description;
                }
            }
        }
        return view('projects.' . $project_id . '.' . $page_id, array("title" => $title, "description" => $description));
    });
});

Route::group(['domain' => '{customDomain}'], function () {
    Route::get('/', function ($customDomain) {
        $domain = Domain::with(['connect.project.pages'])->where(array('name' => $customDomain))->first();
        if (!$domain) {
            return "<h1 style='text-align:center'>A record not found</h1>";
        }
        $project_id = $domain->connect->project->id;
        $page_id = $domain->connect->project->pages[0]->id;
        $title = $domain->connect->project->pages[0]->title;
        $description = $domain->connect->project->pages[0]->description;
        return view('projects.' . $project_id . '.' . $page_id, array("title" => $title, "description" => $description));
    });
    Route::get('/{page}', function ($customDomain, $page) {
        $domain = Domain::with(['connect.project.pages'])->where(array('name' => $customDomain))->first();
        if ($domain == null) {
            return "<h1 style='text-align:center'>A record not found</h1>";
        }
        $page_id;
        $project_id = $domain->connect->project->id;
        $title = "Convert lead for " . $customDomain;
        $description = "";
        foreach ($domain->connect->project->pages as $i => $xpage) {
            if ($page == $xpage->name) {
                $page_id = $xpage->id;

                if ($xpage->title) {
                    $title = $xpage->title;
                }
                if ($xpage->description) {
                    $description = $xpage->description;
                }
            }
        }
        return view('projects.' . $project_id . '.' . $page_id);
    });
});

Route::get('/', function() {
    return "Here is index.";
});