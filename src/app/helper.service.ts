import { Injectable, signal, WritableSignal } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private pokemonService: PokemonService) {}

  get pokemonList() {
    return this.pokemonService.pokemon;
  }

  playerHealth: WritableSignal<number | null> = signal(null);
  playerAttack: WritableSignal<number | null> = signal(null);
  playerName: WritableSignal<string> = signal('');
}
