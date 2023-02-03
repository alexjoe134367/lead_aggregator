<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Eloquent\SoftDeletes;

class CreateTemplatepagesTable extends Migration
{
    use SoftDeletes;
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templatepages', function (Blueprint $table) {
            $table->increments('id')->start_from(1);
            $table->integer('template_id')->unsigned();
            $table->string('name');
            $table->longtext('content');
            $table->longtext('gjs');
            $table->string('title');
            $table->string('description');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('template_id')->references('id')->on('templates'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templatepages');
    }
}
