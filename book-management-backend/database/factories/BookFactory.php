<?php

namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AppModelsProduct>
 */



const randomGenre = ['Horror','Thrill', 'Entertainement', 'Romance', 'Comedy', 'Drama', 'Family', 'Kids', 'Scifi'];

class BookFactory extends Factory

{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),                   
            'author' => $this->faker->name(),                    
            'published_year' => $this->faker->year(),                                          
            'genre' => $this->faker->randomElement(randomGenre),                    
            'description' => $this->faker->paragraph(),
        ];
    }
}
