import {
  computed,
  effect,
  Injectable,
  signal,
  untracked,
  WritableSignal,
} from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private pokemonService: PokemonService) {}

  get fullPokeList() {
    return this.pokemonService.pokemon;
  }

  get pokemonList() {
    return this.pokemonService
      .pokemon()
      .filter((eachPokemon) => !eachPokemon.locked);
  }
  playerName: WritableSignal<string> = signal('');
  pokemonBaseId: number = 0;

  playerId: WritableSignal<number> = signal(0);
  playerPokemonName: WritableSignal<string> = signal('');
  playerCurrentHealth: WritableSignal<number> = signal(0);
  playerAttack: WritableSignal<number | null> = signal(null);
  playerLevel: WritableSignal<number | null> = signal(null);
  playerImage: WritableSignal<string> = signal('assets/Default.jpg');
  PlayerExp: WritableSignal<number> = signal(0);
  playerMaxHealth: WritableSignal<number> = signal(0);
  playerEvolutionLevel: WritableSignal<number | undefined> = signal(undefined);

  activePokemon: WritableSignal<Pokemon | null> = signal(null);

  updateStats = effect(() => {
    if (this.activePokemon()) {
      this.buildStats();
    }
  });

  evolveStarter = effect(() => {
    const level = this.playerLevel();
    const evoLevel = this.playerEvolutionLevel();
    if (
      this.pokemonBaseId === 1 ||
      this.pokemonBaseId === 2 ||
      this.pokemonBaseId === 3 ||
      this.pokemonBaseId === 4
    ) {
      if (level !== null && evoLevel !== undefined && level === evoLevel) {
        if (
          this.playerId() !==
          Number(`${this.pokemonBaseId} + ${this.pokemonBaseId}`)
        ) {
          this.fullPokeList().forEach((eachPokemon) => {
            if (
              eachPokemon.id ===
              Number(`${this.pokemonBaseId}${this.pokemonBaseId}`)
            ) {
              this.activePokemon.set(eachPokemon);
            }
          });
        }
      }
    }
    if (
      this.playerId() === Number(`${this.pokemonBaseId}${this.pokemonBaseId}`)
    ) {
      if (level !== null && evoLevel !== null && level === evoLevel) {
        if (
          this.playerId() !==
          Number(
            `${this.pokemonBaseId}${this.pokemonBaseId}${this.pokemonBaseId}`
          )
        ) {
          this.fullPokeList().forEach((eachPokemon) => {
            if (
              eachPokemon.id ===
              Number(
                `${this.pokemonBaseId}${this.pokemonBaseId}${this.pokemonBaseId}`
              )
            ) {
              this.activePokemon.set(eachPokemon);
            }
          });
        }
      }
    }
  });

  buildStats() {
    this.playerId.set(this.activePokemon()!.id);
    this.playerAttack.set(this.activePokemon()!.attack);
    this.playerMaxHealth.set(this.activePokemon()!.maxHealth);
    this.playerLevel.set(this.activePokemon()!.level);
    this.playerPokemonName.set(this.activePokemon()!.name);
    this.playerImage.set(this.activePokemon()!.image);
    this.PlayerExp.set(this.activePokemon()!.experience);
    this.playerEvolutionLevel.set(this.activePokemon()?.evolutionLevel);
    const currentHealth = untracked(() => this.playerCurrentHealth());
    const additionalHealth = this.activePokemon()?.currentHealth ?? 0;
    this.playerCurrentHealth.set(currentHealth + additionalHealth);
  }
}
