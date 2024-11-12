<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//added by me
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // display all books (GET)
        $book = Book::get();
        return response()->json($book);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // add book (POST)
       $request->validate([
           'title' => 'required|string|max:20',
           'author' => 'required|string',
           'published_year' => 'required|integer',
           'genre' => 'required|string',
           'description' => 'required|string|max:255',
       ], [
           'title.required' => 'Title is required',
           'title.min' => 'Title must be at least 20 characters long',
           'description.required' => 'Description is required',
           'author.required' => 'Author is required',
           'published_year.required' => 'Publication year is required',
           'published_year.integer' => 'Publication year must be an integer',
           'genre.required' => 'Genre is required',
          
       ]);

        $book = Book::create($request->all());
        return response()->json($book, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // show a specific book (GET)
        $book = Book::findOrFail($id);
        return response()->json($book);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        // \Log::info('Update request received:', $request->all());
        // // update an existing book (PUT)
        // $book = Book::findOrFail($id);

        // $request -> validate([
        //     'title' => 'required',
        //     'description' => 'required',
        //     'author' => 'required',    
        //     'published_year' => 'required',
        //     'genre' => 'required',
        // ]);

        // return response()->json($book);

        $book = Book::findOrFail($id);
        $book->title = $request->title;
        $book->description = $request->description;
        $book->author = $request->author;
        $book->published_year = $request->published_year;
        $book->genre = $request->genre;
        $book->save();

        return response()->json($book);
    

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // delete a book (DELETE)
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(null, 204);
    }
}
