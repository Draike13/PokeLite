import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { BattleService } from '../../Services/battle.service';
import { PokemonService } from '../../Data/pokemon.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EncounterService } from '../../Services/encounter.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';
import { BossEncounterPokemonService } from '../../Services/boss-encounter-pokemon.service';
import { single } from 'rxjs';
import { Item } from '../../Models/item.model';
import { RandomEcounterService } from '../../Data/random-ecounter.service';
import { RandomEncounter } from '../../Models/random-encounter.model';

@Component({
  selector: 'app-choice-box-center',
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    NgStyle,
  ],
  templateUrl: './choice-box-center.component.html',
  styleUrl: './choice-box-center.component.css',
})
export class ChoiceBoxCenterComponent {
  constructor(
    private randomEncounterService: RandomEcounterService,
    private helperService: HelperService,
    private battleService: BattleService,
    private pokemonService: PokemonService,
    private encounterService: EncounterService,
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}

  pokemonAttacked: WritableSignal<boolean> = signal(false);

  pokemonHit: WritableSignal<boolean> = signal(false);
  currentView() {
    return this.bossEncounterPokemonService.centerView();
  }
  bossPokemonImage() {
    return this.bossEncounterPokemonService.centerContainerPokemonImage();
  }
  bossPokemonName() {
    return this.bossEncounterPokemonService.centerContainerPokemonName();
  }
  bossCurrentHealth() {
    return this.bossEncounterPokemonService.centerContainerCurrentHealth();
  }
  bossLevel() {
    return this.bossEncounterPokemonService.centerContainerLevel();
  }
  bossAttack() {
    return this.bossEncounterPokemonService.centerContainerAttack();
  }
  attack() {
    return this.bossEncounterPokemonService.attackCenter();
  }
  dead() {
    return this.bossEncounterPokemonService.centerDead();
  }

  triggerAttackedEffect() {
    this.pokemonAttacked.set(true);
    setTimeout(() => {
      this.pokemonAttacked.set(false);
    }, 300);
  }

  hitListener = effect(() => {
    if (this.bossEncounterPokemonService.centerAttacking() === true) {
      this.triggerHitEffect();
      this.bossEncounterPokemonService.centerAttacking.set(false);
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
    return this.bossEncounterPokemonService.centerFoundItem();
  }
  useItem(item: Item) {
    return this.battleService.useItem(item);
  }
  clearItem() {
    this.bossEncounterPokemonService.centerFoundItem.set(null);
    this.bossEncounterPokemonService.centerView.set('empty');
  }
  currentRandomEncounter: WritableSignal<RandomEncounter | null> = signal(null);

  loadEncounter = effect(() => {
    if (
      this.bossEncounterPokemonService.encounterToggle() === true &&
      this.currentRandomEncounter() === null
    ) {
      const randomEncounterIndex = Math.floor(
        Math.random() * this.randomEncounterService.expEncounters().length
      );
      this.currentRandomEncounter.set(
        this.randomEncounterService.expEncounters()[randomEncounterIndex]
      );
    }
  });

  choose() {
    this.bossEncounterPokemonService.leftDisable.set(true);
    this.bossEncounterPokemonService.rightDisable.set(true);
  }

  choice() {
    return this.bossEncounterPokemonService.centerDisable();
  }
}
