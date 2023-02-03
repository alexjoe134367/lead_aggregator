<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Connect;

class Domain extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'record',
    ];
    protected $table = 'domains';

    public function connect(){
        return $this->hasOne(Connect::class, 'domain_id');
    }
}
