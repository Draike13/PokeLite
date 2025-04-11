import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EncounterService } from '../../Services/encounter.service';
import { HelperService } from '../../Services/helper.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';
import { BossEncounterPokemonService } from '../../Services/boss-encounter-pokemon.service';
import { Item } from '../../Models/item.model';
import { BattleService } from '../../Services/battle.service';
import { RandomEncounter } from '../../Models/random-encounter.model';
import { RandomEcounterService } from '../../Data/random-ecounter.service';

@Component({
  selector: 'app-choice-box-left',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './choice-box-left.component.html',
  styleUrl: './choice-box-left.component.css',
})
export class ChoiceBoxLeftComponent {
  constructor(
    private randomEncounterService: RandomEcounterService,
    private battleService: BattleService,
    private encounterService: EncounterService,
    private helperService: HelperService,
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}

  pokemonAttacked: WritableSignal<boolean> = signal(false);
  pokemonHit: WritableSignal<boolean> = signal(false);

  currentView() {
    return this.bossEncounterPokemonService.leftView();
  }
  bossPokemonImage() {
    return this.bossEncounterPokemonService.leftContainerPokemonImage();
  }
  bossPokemonName() {
    return this.bossEncounterPokemonService.leftContainerPokemonName();
  }
  bossCurrentHealth() {
    return this.bossEncounterPokemonService.leftContainerCurrentHealth();
  }
  bossLevel() {
    return this.bossEncounterPokemonService.leftContainerLevel();
  }
  bossAttack() {
    return this.bossEncounterPokemonService.leftContainerAttack();
  }
  attack() {
    return this.bossEncounterPokemonService.attackLeft();
  }
  dead() {
    return this.bossEncounterPokemonService.leftDead();
  }

  triggerAttackedEffect() {
    this.pokemonAttacked.set(true);
    setTimeout(() => {
      this.pokemonAttacked.set(false);
    }, 300);
  }

  hitListener = effect(() => {
    if (this.bossEncounterPokemonService.leftAttacking() === true) {
      this.triggerHitEffect();
      this.bossEncounterPokemonService.leftAttacking.set(false);
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
    return this.bossEncounterPokemonService.leftFoundItem();
  }
  useItem(item: Item) {
    return this.battleService.useItem(item);
  }
  clearItem() {
    this.bossEncounterPokemonService.leftFoundItem.set(null);
    this.bossEncounterPokemonService.leftView.set('empty');
  }

  currentRandomEncounter: WritableSignal<RandomEncounter | null> = signal(null);

  loadEncounter = effect(() => {
    if (
      this.bossEncounterPokemonService.encounterToggle() === true &&
      this.currentRandomEncounter() === null
    ) {
      const randomEncounterIndex = Math.floor(
        Math.random() * this.randomEncounterService.knownEncounters().length
      );
      this.currentRandomEncounter.set(
        this.randomEncounterService.knownEncounters()[randomEncounterIndex]
      );
    }
  });

  choose() {
    this.bossEncounterPokemonService.rightDisable.set(true);
    this.bossEncounterPokemonService.centerDisable.set(true);
  }

  choice() {
    return this.bossEncounterPokemonService.leftDisable();
  }
}
