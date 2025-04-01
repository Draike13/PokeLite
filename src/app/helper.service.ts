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
import { SaveService } from './save.service';
import { SaveFile } from './save.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(
    private pokemonService: PokemonService,
    private saveService: SaveService
  ) {}

  get fullPokeList() {
    return this.pokemonService.pokemon;
  }

  pokemonList() {
    return this.activeSave()!.pokemonData.filter(
      (eachPokemon) => !eachPokemon.locked
    );
  }
  // currentSaveSlot: WritableSignal<number> = signal(0);
  playerName: WritableSignal<string> = signal('');
  pokemonBaseId: number = 0;
  activeSave: WritableSignal<SaveFile | null> = signal(null);

  playerId: WritableSignal<number> = signal(0);
  playerPokemonName: WritableSignal<string> = signal('');
  playerCurrentHealth: WritableSignal<number> = signal(0);
  playerAttack: WritableSignal<number> = signal(0);
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
          this.activeSave()!.pokemonData.forEach((eachPokemon) => {
            if (
              eachPokemon.id ===
              Number(`${this.pokemonBaseId}${this.pokemonBaseId}`)
            ) {
              eachPokemon.locked = false;
              this.activePokemon.set(eachPokemon);
              this.saveService.saveGame(this.activeSave()!);
            }
            if (eachPokemon.id === Number(`${this.pokemonBaseId}`)) {
              eachPokemon.locked = true;
              this.saveService.saveGame(this.activeSave()!);
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
          this.activeSave()!.pokemonData.forEach((eachPokemon) => {
            if (
              eachPokemon.id ===
              Number(
                `${this.pokemonBaseId}${this.pokemonBaseId}${this.pokemonBaseId}`
              )
            ) {
              eachPokemon.locked = false;
              this.activePokemon.set(eachPokemon);
              this.saveService.saveGame(this.activeSave()!);
            }
            if (
              eachPokemon.id ===
              Number(`${this.pokemonBaseId}${this.pokemonBaseId}`)
            ) {
              eachPokemon.locked = true;
              this.saveService.saveGame(this.activeSave()!);
            }
          });
        }
      }
    }
  });

  buildStats() {
    this.playerId.set(this.activePokemon()!.id);
    const currentAttack = untracked(() => this.playerAttack());
    const attackGain = this.activePokemon()?.attack ?? 0;
    this.playerAttack.set(currentAttack + attackGain);
    this.playerMaxHealth.set(this.activePokemon()!.maxHealth);
    this.playerLevel.set(this.activePokemon()!.level);
    this.playerPokemonName.set(this.activePokemon()!.name);
    this.playerImage.set(this.activePokemon()!.image);
    this.PlayerExp.set(this.activePokemon()!.experience);
    this.playerEvolutionLevel.set(this.activePokemon()?.evolutionLevel);
    const currentHealth = untracked(() => this.playerCurrentHealth());
    const healthGain = this.activePokemon()?.currentHealth ?? 0;
    this.playerCurrentHealth.set(currentHealth + healthGain);
  }
}
