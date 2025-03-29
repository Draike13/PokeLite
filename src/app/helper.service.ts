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
  playerName: WritableSignal<string> = signal('');
  playerCurrentHealth: WritableSignal<number | null> = signal(null);
  playerAttack: WritableSignal<number | null> = signal(null);
  playerLevel: WritableSignal<number | null> = signal(null);
  playerPokemonName: WritableSignal<string> = signal('');
  playerImage: WritableSignal<string> = signal('assets/Default.jpg');
  PlayerExp: WritableSignal<number> = signal(0);
  playerMaxHealth: WritableSignal<number> = signal(0);

  activePokemon: WritableSignal<Pokemon | null> = signal(null);

  updateStats = effect(() => {
    if (this.activePokemon()) {
      this.buildStats();
    }
  });
  buildStats() {
    this.playerAttack.set(this.activePokemon()!.attack);
    this.playerCurrentHealth.set(this.activePokemon()!.currentHealth);
    this.playerMaxHealth.set(this.activePokemon()!.maxHealth);
    this.playerLevel.set(this.activePokemon()!.level);
    this.playerPokemonName.set(this.activePokemon()!.name);
    this.playerImage.set(this.activePokemon()!.image);
    this.PlayerExp.set(this.activePokemon()!.experience);
  }
}
