<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCocodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cocodes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code', 36);
            $table->integer('agency_id')->nullable();
            $table->timestamp('added_at')->nullable();
            $table->timestamp('used_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cocodes');
    }
}
