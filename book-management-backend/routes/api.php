<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//added by me
use App\Http\Controllers\BookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Routes for books
Route::get('/books', [BookController::class, 'index']); // all list
Route::get('/books/{id}', [BookController::class, 'show']); // specific
Route::post('/books', [BookController::class, 'store']); // add
Route::put('/books/{id}', [BookController::class, 'update']); // edit
Route::delete('/books/{id}', [BookController::class, 'destroy']); //delete





