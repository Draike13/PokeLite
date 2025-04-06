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

  activePokemon: WritableSignal<Pokemon[]> = signal([]);

  startBattle = effect(() => {
    if (this.encounterService.bossBattleStart() === true) {
      this.setActive();
    }
  });

  setActive() {
    this.activePokemon.set(this.encounterService.activeBoss()!.pokemon);
  }
  resetActive = effect(() => {
    if (this.encounterService.playerWin() === true) {
      this.activePokemon.set([]);
    }
  });

  leftView: WritableSignal<'empty' | 'active'> = signal('empty');
  leftContainerAttack: WritableSignal<number> = signal(0);
  leftContainerMaxHealth: WritableSignal<number> = signal(0);
  leftContainerCurrentHealth: WritableSignal<number> = signal(0);
  leftContainerExp: WritableSignal<number> = signal(0);
  leftContainerPokemonName: WritableSignal<string> = signal('');
  leftContainerPokemonImage: WritableSignal<string> = signal('');
  leftContainerLevel: WritableSignal<number> = signal(0);

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

  buildLeftBattleCard() {
    this.leftContainerAttack.set(this.activePokemon()![0].attack);
    this.leftContainerMaxHealth.set(this.activePokemon()![0].maxHealth);
    this.leftContainerCurrentHealth.set(this.activePokemon()![0].currentHealth);
    this.leftContainerExp.set(this.activePokemon()![0].experience);
    this.leftContainerPokemonName.set(this.activePokemon()![0].name);
    this.leftContainerPokemonImage.set(this.activePokemon()![0].image);
    this.leftContainerLevel.set(this.activePokemon()![0].level);
  }

  attackLeft() {
    if (this.leftContainerCurrentHealth() > 0) {
      this.leftContainerCurrentHealth.set(
        this.leftContainerCurrentHealth() - this.helperService.playerAttack()
      );
    }
    if (this.leftContainerCurrentHealth() <= 0) {
      this.leftContainerCurrentHealth.set(0);
    }
  }
  centerView: WritableSignal<'empty' | 'active'> = signal('empty');
  centerContainerAttack: WritableSignal<number> = signal(0);
  centerContainerMaxHealth: WritableSignal<number> = signal(0);
  centerContainerCurrentHealth: WritableSignal<number> = signal(0);
  centerContainerExp: WritableSignal<number> = signal(0);
  centerContainerPokemonName: WritableSignal<string> = signal('');
  centerContainerPokemonImage: WritableSignal<string> = signal('');
  centerContainerLevel: WritableSignal<number> = signal(0);

  buildCenterCard = effect(() => {
    if (this.activePokemon().length > 0) {
      if (this.activePokemon()) {
        this.centerView.set('active');
        this.buildCenterBattleCard();
      }
    }
  });

  killCenter = effect(() => {
    if (this.centerView() === 'active') {
      if (this.centerContainerCurrentHealth() === 0) {
        this.centerView.set('empty');
        this.encounterService.victoryCenter.set(true);
      }
    }
  });

  buildCenterBattleCard() {
    this.centerContainerAttack.set(this.activePokemon()![1].attack);
    this.centerContainerMaxHealth.set(this.activePokemon()![1].maxHealth);
    this.centerContainerCurrentHealth.set(
      this.activePokemon()![1].currentHealth
    );
    this.centerContainerExp.set(this.activePokemon()![1].experience);
    this.centerContainerPokemonName.set(this.activePokemon()![1].name);
    this.centerContainerPokemonImage.set(this.activePokemon()![1].image);
    this.centerContainerLevel.set(this.activePokemon()![1].level);
  }

  attackCenter() {
    if (this.centerContainerCurrentHealth() > 0) {
      this.centerContainerCurrentHealth.set(
        this.centerContainerCurrentHealth() - this.helperService.playerAttack()
      );
    }
    if (this.centerContainerCurrentHealth() <= 0) {
      this.centerContainerCurrentHealth.set(0);
    }
  }
  rightView: WritableSignal<'empty' | 'active'> = signal('empty');
  rightContainerAttack: WritableSignal<number> = signal(0);
  rightContainerMaxHealth: WritableSignal<number> = signal(0);
  rightContainerCurrentHealth: WritableSignal<number> = signal(0);
  rightContainerExp: WritableSignal<number> = signal(0);
  rightContainerPokemonName: WritableSignal<string> = signal('');
  rightContainerPokemonImage: WritableSignal<string> = signal('');
  rightContainerLevel: WritableSignal<number> = signal(0);

  buildRightCard = effect(() => {
    if (this.activePokemon().length > 0) {
      if (this.activePokemon()) {
        this.rightView.set('active');
        this.buildRightBattleCard();
      }
    }
  });

  killRight = effect(() => {
    if (this.rightView() === 'active') {
      if (this.rightContainerCurrentHealth() === 0) {
        this.rightView.set('empty');
        this.encounterService.victoryRight.set(true);
      }
    }
  });

  buildRightBattleCard() {
    this.rightContainerAttack.set(this.activePokemon()![2].attack);
    this.rightContainerMaxHealth.set(this.activePokemon()![2].maxHealth);
    this.rightContainerCurrentHealth.set(
      this.activePokemon()![2].currentHealth
    );
    this.rightContainerExp.set(this.activePokemon()![2].experience);
    this.rightContainerPokemonName.set(this.activePokemon()![2].name);
    this.rightContainerPokemonImage.set(this.activePokemon()![2].image);
    this.rightContainerLevel.set(this.activePokemon()![2].level);
  }

  attackRight() {
    if (this.rightContainerCurrentHealth() > 0) {
      this.rightContainerCurrentHealth.set(
        this.rightContainerCurrentHealth() - this.helperService.playerAttack()
      );
    }
    if (this.rightContainerCurrentHealth() <= 0) {
      this.rightContainerCurrentHealth.set(0);
    }
  }
}
