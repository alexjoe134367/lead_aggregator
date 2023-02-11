<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Carbon\Carbon;

class CouponFake extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          // Insert some stuff
        for($i = 0; $i < 100; $i++){
            DB::table('cocodes')->insert(
                array(
                    'code' => str_random(10),
                    'agency_id' => null,
                    'added_at' => Carbon::now()->toDateTimeString(),
                    'used_at'=> null,
                )
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
