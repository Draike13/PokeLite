import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { EncounterService } from './encounter.service';
import { HelperService } from './helper.service';
import { Pokemon } from '../Models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class BossEncounterPokemonService {
  constructor(
    private encounterService: EncounterService,
    private helperService: HelperService
  ) {}

  leftView: WritableSignal<'empty' | 'active'> = signal('empty');

  activePokemon: WritableSignal<Pokemon[]> = signal([]);

  leftContainerAttack: WritableSignal<number> = signal(0);
  leftContainerMaxHealth: WritableSignal<number> = signal(0);
  leftContainerCurrentHealth: WritableSignal<number> = signal(0);
  leftContainerExp: WritableSignal<number> = signal(0);
  leftContainerPokemonName: WritableSignal<string> = signal('');
  leftContainerPokemonImage: WritableSignal<string> = signal('');
  leftContainerLevel: WritableSignal<number> = signal(0);

  startBattle = effect(() => {
    if (this.encounterService.bossBattleStart() === true) {
      console.log('test');
      this.setActive();
    }
  });
  buildLeftCard = effect(() => {
    if (this.activePokemon().length > 0) {
      if (this.activePokemon()) {
        this.leftView.set('active');
        this.buildLeftBattleCard();
      }
    }
  });

  killLeft = effect(() => {
    if (this.leftView() === 'active') {
      if (this.leftContainerCurrentHealth() === 0) {
        this.leftView.set('empty');
        this.encounterService.victoryLeft.set(true);
      }
    }
  });

  setActive() {
    this.activePokemon.set(this.encounterService.activeBoss()!.pokemon);
    console.log(this.activePokemon());
  }

  buildLeftBattleCard() {
    this.leftContainerAttack.set(this.activePokemon()![0].attack);
    this.leftContainerMaxHealth.set(this.activePokemon()![0].maxHealth);
    this.leftContainerCurrentHealth.set(this.activePokemon()![0].currentHealth);
    this.leftContainerExp.set(this.activePokemon()![0].experience);
    this.leftContainerPokemonName.set(this.activePokemon()![0].name);
    this.leftContainerPokemonImage.set(this.activePokemon()![0].image);
    this.leftContainerLevel.set(this.activePokemon()![0].level);
  }

  attack() {
    if (this.leftContainerCurrentHealth() > 0) {
      this.leftContainerCurrentHealth.set(
        this.leftContainerCurrentHealth() - this.helperService.playerAttack()
      );
    }
    if (this.leftContainerCurrentHealth() <= 0) {
      this.leftContainerCurrentHealth.set(0);
    }
  }
}
