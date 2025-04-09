import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { EncounterService } from '../../Services/encounter.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';
import { BossEncounterPokemonService } from '../../Services/boss-encounter-pokemon.service';
import { Item } from '../../Models/item.model';
import { BattleService } from '../../Services/battle.service';

@Component({
  selector: 'app-choice-box-right',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './choice-box-right.component.html',
  styleUrl: './choice-box-right.component.css',
})
export class ChoiceBoxRightComponent {
  constructor(
    private battleService: BattleService,
    private bossEncounterPokemonService: BossEncounterPokemonService,
    private helperService: HelperService,
    private encounterService: EncounterService
  ) {}

  pokemonAttacked: WritableSignal<boolean> = signal(false);
  pokemonHit: WritableSignal<boolean> = signal(false);

  currentView() {
    return this.bossEncounterPokemonService.rightView();
  }
  bossPokemonImage() {
    return this.bossEncounterPokemonService.rightContainerPokemonImage();
  }
  bossPokemonName() {
    return this.bossEncounterPokemonService.rightContainerPokemonName();
  }
  bossCurrentHealth() {
    return this.bossEncounterPokemonService.rightContainerCurrentHealth();
  }
  bossLevel() {
    return this.bossEncounterPokemonService.rightContainerLevel();
  }
  bossAttack() {
    return this.bossEncounterPokemonService.rightContainerAttack();
  }
  attack() {
    return this.bossEncounterPokemonService.attackRight();
  }
  dead() {
    return this.bossEncounterPokemonService.rightDead();
  }

  triggerAttackedEffect() {
    this.pokemonAttacked.set(true);
    setTimeout(() => {
      this.pokemonAttacked.set(false);
    }, 300);
  }
  hitListener = effect(() => {
    if (this.bossEncounterPokemonService.rightAttacking() === true) {
      this.triggerHitEffect();
      this.bossEncounterPokemonService.rightAttacking.set(false);
    }
  });
  triggerHitEffect() {
    this.pokemonHit.set(true);
    setTimeout(() => {
      this.pokemonHit.set(false);
    }, 1000);
  }

  declareAttack() {
    this.bossEncounterPokemonService.playerDeclareAttack.set(true);
  }

  playerLoss() {
    return this.helperService.playerLoss();
  }

  currentlyAttacking() {
    return this.bossEncounterPokemonService.playerDeclareAttack();
  }

  availableItems() {
    return this.encounterService.availableBossItems();
  }
  itemFind() {
    return this.encounterService.getRandomItem();
  }
  discoveredItem() {
    return this.bossEncounterPokemonService.rightFoundItem();
  }
  useItem(item: Item) {
    return this.battleService.useItem(item);
  }
  clearItem() {
    this.bossEncounterPokemonService.rightFoundItem.set(null);
    this.bossEncounterPokemonService.rightView.set('empty');
  }

  brockEvolveEffect: WritableSignal<boolean> = signal(false);
  brockEvolve = effect(() => {
    this.brockEvolveEffect.set(
      this.bossEncounterPokemonService.brockEvolveEffect()
    );
  });
}
