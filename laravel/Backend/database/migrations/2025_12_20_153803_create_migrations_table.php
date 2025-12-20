<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // TANÁR
        Schema::create('tanar', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->timestamps();
        });

        // DIÁK
        Schema::create('diak', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->timestamps();
        });

        // CSOPORT
        Schema::create('csoport', function (Blueprint $table) {
            $table->id();
            $table->string('nev');
            $table->timestamps();
        });

        // KÉRDÉSEK
        Schema::create('kerdesek', function (Blueprint $table) {
            $table->id();
            $table->text('leiras');
            $table->timestamps();
        });

        // KÉRDÉS TÍPUSOK
        Schema::create('kerdes_tipusok', function (Blueprint $table) {
            $table->id();
            $table->string('megnevezes');
            $table->unsignedBigInteger('kerdes_id');
            $table->timestamps();

            $table->foreign('kerdes_id')
                ->references('id')
                ->on('kerdesek')
                ->onDelete('cascade');
        });

        // VÁLASZOK
        Schema::create('valaszok', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kerdes_id');
            $table->unsignedBigInteger('tanar_id');
            $table->text('ertek');
            $table->timestamps();

            $table->foreign('kerdes_id')
                ->references('id')
                ->on('kerdesek')
                ->onDelete('cascade');

            $table->foreign('tanar_id')
                ->references('id')
                ->on('tanar')
                ->onDelete('cascade');
        });

        // ÉRTÉKELÉS
        Schema::create('ertekeles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tanar_id');
            $table->unsignedBigInteger('diak_id');
            $table->timestamps();

            $table->foreign('tanar_id')
                ->references('id')
                ->on('tanar')
                ->onDelete('cascade');

            $table->foreign('diak_id')
                ->references('id')
                ->on('diak')
                ->onDelete('cascade');
        });

        // DIÁK–CSOPORT
        Schema::create('diak_csoport', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('diak_id');
            $table->unsignedBigInteger('csoport_id');
            $table->timestamps();

            $table->foreign('diak_id')
                ->references('id')
                ->on('diak')
                ->onDelete('cascade');

            $table->foreign('csoport_id')
                ->references('id')
                ->on('csoport')
                ->onDelete('cascade');
        });

        // TANÁR–CSOPORT
        Schema::create('tanar_csoport', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tanar_id');
            $table->unsignedBigInteger('csoport_id');
            $table->timestamps();

            $table->foreign('tanar_id')
                ->references('id')
                ->on('tanar')
                ->onDelete('cascade');

            $table->foreign('csoport_id')
                ->references('id')
                ->on('csoport')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tanar_csoport');
        Schema::dropIfExists('diak_csoport');
        Schema::dropIfExists('ertekeles');
        Schema::dropIfExists('valaszok');
        Schema::dropIfExists('kerdes_tipusok');
        Schema::dropIfExists('kerdesek');
        Schema::dropIfExists('csoport');
        Schema::dropIfExists('diak');
        Schema::dropIfExists('tanar');
    }
};
