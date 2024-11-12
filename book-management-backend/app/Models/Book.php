<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//with factory, added by me
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title' ,
        'description',
        'author',
        'published_year',
        'genre',
        
    ]; 
}
