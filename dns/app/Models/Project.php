<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ProjectPage;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'company_id',
    ];
    protected $table = 'projects';
    
    public function pages(){
        return $this->hasMany(ProjectPage::class, 'project_id');
    }
}
