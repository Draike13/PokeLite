import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private pokemonService: PokemonService) {}

  get pokemonList() {
    return this.pokemonService
      .pokemon()
      .filter((eachPokemon) => !eachPokemon.locked);
  }

  playerName: WritableSignal<string> = signal('');
  playerCurrentHealth: WritableSignal<number | null> = signal(null);
  playerAttack: WritableSignal<number | null> = signal(null);
  playerLevel: WritableSignal<number | null> = signal(null);
  playerPokemonName: WritableSignal<string> = signal('');
  playerImage: WritableSignal<string> = signal('assets/Default.jpg');
  PlayerExp: WritableSignal<number> = signal(0);
  playerMaxHealth: WritableSignal<number> = signal(0);
  playerEvolutionLevel: WritableSignal<number | undefined> = signal(undefined);
  playerSecondEvolutionLevel: WritableSignal<number | undefined> =
    signal(undefined);

  activePokemon: WritableSignal<Pokemon | null> = signal(null);

  updateStats = effect(() => {
    if (this.activePokemon()) {
      this.buildStats();
    }
  });

  evolveCharmander = effect(() => {
    const level = this.playerLevel();
    const evoLevel = this.playerEvolutionLevel();
    const secondEvoLevel = this.playerSecondEvolutionLevel();
    if (this.playerPokemonName() === 'Charmander') {
      if (level !== null && evoLevel !== undefined && level === evoLevel) {
        console.log('Evolution Time!');
        if (this.playerPokemonName() !== 'Charmeleon') {
          this.playerMaxHealth.set(this.playerMaxHealth() + 30);
          this.playerCurrentHealth.set(this.playerCurrentHealth()! + 30);
          this.playerAttack.set(this.playerAttack()! + 7);
          this.playerPokemonName.set('Charmeleon');
          this.playerImage.set('assets/Charmeleon.jpg');
        }
      }
    }
    if (this.playerPokemonName() === 'Charmeleon') {
      if (
        level !== null &&
        secondEvoLevel !== undefined &&
        level === secondEvoLevel
      ) {
        console.log('Evolution Time!');
        if (this.playerPokemonName() !== 'Charizard') {
          this.playerMaxHealth.set(this.playerMaxHealth() + 50);
          this.playerCurrentHealth.set(this.playerCurrentHealth()! + 50);
          this.playerAttack.set(this.playerAttack()! + 10);
          this.playerPokemonName.set('Charizard');
          this.playerImage.set('assets/Charizard.jpg');
        }
      }
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
    this.playerEvolutionLevel.set(this.activePokemon()?.evolutionLevel);
    this.playerSecondEvolutionLevel.set(
      this.activePokemon()?.secondEvoultionLevel
    );
  }
}
