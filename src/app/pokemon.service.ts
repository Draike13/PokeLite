import { Injectable, signal, WritableSignal } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemon: WritableSignal<Pokemon[]> = signal([
    {
      name: 'Bulbasaur',
      health: 25,
      attack: 3,
      level: 1,
      experience: 0,
      evolutionLevel: 9,
      secondEvoultionLevel: 20,
      image: 'assets/Bulbasaur.png',
    },
    {
      name: 'Charmander',
      health: 20,
      attack: 5,
      level: 1,
      experience: 0,
      evolutionLevel: 9,
      secondEvoultionLevel: 20,
      image: 'assets/Charmander.jpg',
    },
    {
      name: 'Squirtle',
      health: 15,
      attack: 7,
      level: 1,
      experience: 0,
      evolutionLevel: 9,
      secondEvoultionLevel: 20,
      image: 'assets/Squirtle.jpg',
    },
  ]);
}
