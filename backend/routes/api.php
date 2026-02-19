<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TowingRequestController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/reverse-geocode', [TowingRequestController::class, 'getGeoCode']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/requests', [TowingRequestController::class, 'index']);
    Route::post('/requests', [TowingRequestController::class, 'store']);
    Route::post('/requests/{id}/accept', [TowingRequestController::class, 'accept']);
    Route::post('/logout', [AuthController::class, 'logout']);

});
