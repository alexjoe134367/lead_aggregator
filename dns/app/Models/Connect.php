<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Project;

class Connect extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'user_id',
        'project_id',
        'domain_id',
    ];
    protected $table = 'connects';
    
    public function project(){
        return $this->belongsTo(Project::class, 'project_id');
    }
}
