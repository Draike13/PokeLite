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

  playerName: WritableSignal<string> = signal('');
  pokemonBaseId: number = 0;
  activeSave: WritableSignal<SaveFile | null> = signal(null);

  bonusHealth: WritableSignal<number> = signal(0);
  damage: WritableSignal<number> = signal(0);
  bonusAtk: WritableSignal<number> = signal(0);
  minusAtk: WritableSignal<number> = signal(0);
  gainedLevels: WritableSignal<number> = signal(0);

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
      if (this.activePokemon() && level === evoLevel) {
        this.gainedLevels.set(0);
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
      if (this.activePokemon() && level === evoLevel) {
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
    const baseAttack = untracked(() => this.activePokemon()!.attack);
    console.log(baseAttack);
    const attackGain = this.bonusAtk();
    console.log(attackGain);
    const attackLoss = this.minusAtk();
    console.log(attackLoss);
    this.playerAttack.set(baseAttack + attackGain - attackLoss);
    this.playerMaxHealth.set(this.activePokemon()!.maxHealth);
    const currentLevel = untracked(() => this.activePokemon()!.level);
    const gainedLevels = this.gainedLevels();
    this.playerLevel.set(currentLevel + gainedLevels);
    this.playerPokemonName.set(this.activePokemon()!.name);
    this.playerImage.set(this.activePokemon()!.image);
    this.PlayerExp.set(this.activePokemon()!.experience);
    this.playerEvolutionLevel.set(this.activePokemon()?.evolutionLevel);
    const CurrentHealth = untracked(() => this.activePokemon()!.currentHealth);
    const damageTaken = this.damage();
    this.playerCurrentHealth.set(CurrentHealth - damageTaken);
  }
}
