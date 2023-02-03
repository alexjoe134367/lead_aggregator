<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\TemplatePage;

class Template extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'category_id',
        'name',
    ];
    protected $table = 'templates';

    public function pages(){
        return $this->hasMany(TemplatePage::class, 'template_id');
    }
}
