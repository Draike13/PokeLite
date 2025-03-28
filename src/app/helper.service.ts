import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.model';

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
  playerLevel: WritableSignal<number | null> = signal(null);
  playerName: WritableSignal<string> = signal('');
  playerImage: WritableSignal<string> = signal('assets/Default.jpg');

  activePokemon: WritableSignal<Pokemon | null> = signal(null);

  updateStats = effect(() => {
    if (this.activePokemon()) {
      this.buildStats();
    }
  });
  buildStats() {
    this.playerAttack.set(this.activePokemon()!.attack);
    this.playerHealth.set(this.activePokemon()!.health);
    this.playerLevel.set(this.activePokemon()!.level);
    this.playerName.set(this.activePokemon()!.name);
    this.playerImage.set(this.activePokemon()!.image);
  }
}
