import { Injectable, signal, WritableSignal } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemon: WritableSignal<Pokemon[]> = signal([
    {
      name: 'Bulbasaur',
      currentHealth: 25,
      maxHealth: 25,
      attack: 3,
      level: 1,
      experience: 0,
      evolutionLevel: 9,
      secondEvoultionLevel: 20,
      image: 'assets/Bulbasaur.png',
      locked: false,
    },
    {
      name: 'Charmander',
      currentHealth: 20,
      maxHealth: 20,
      attack: 5,
      level: 1,
      experience: 0,
      evolutionLevel: 9,
      secondEvoultionLevel: 20,
      image: 'assets/Charmander.jpg',
      locked: false,
    },
    {
      name: 'Squirtle',
      currentHealth: 15,
      maxHealth: 15,
      attack: 7,
      level: 1,
      experience: 0,
      evolutionLevel: 9,
      secondEvoultionLevel: 20,
      image: 'assets/Squirtle.jpg',
      locked: false,
    },
    {
      name: 'Pikachu',
      currentHealth: 30,
      maxHealth: 30,
      attack: 10,
      level: 1,
      experience: 0,
      evolutionLevel: 15,
      image: 'assets/Pikachu.png',
      locked: true,
    },
  ]);
}
