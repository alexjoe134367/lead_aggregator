<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectPage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'project_id',
        'name',
        'content',
        'gjs',
    ];
    protected $table = 'projectpages';
}
