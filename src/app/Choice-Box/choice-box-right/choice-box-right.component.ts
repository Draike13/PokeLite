import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { EncounterService } from '../../Services/encounter.service';
import { NgStyle } from '@angular/common';
import { BossEncounterPokemonService } from '../../Services/boss-encounter-pokemon.service';
import { Item } from '../../Models/item.model';
import { BattleService } from '../../Services/battle.service';
import { RandomEncounter } from '../../Models/random-encounter.model';
import { RandomEcounterService } from '../../Data/random-ecounter.service';

@Component({
  selector: 'app-choice-box-right',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './choice-box-right.component.html',
  styleUrl: './choice-box-right.component.css',
})
export class ChoiceBoxRightComponent {
  constructor(
    private randomEncounterService: RandomEcounterService,
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
      setTimeout(() => {
        this.triggerHitEffect();

        this.bossEncounterPokemonService.rightAttacking.set(false);
      }, 50);
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
    return this.bossEncounterPokemonService.attackLocked();
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

  currentRandomEncounter: WritableSignal<RandomEncounter | null> = signal(null);

  loadEncounter = effect(() => {
    if (
      this.bossEncounterPokemonService.encounterToggle() === true &&
      this.currentRandomEncounter() === null
    ) {
      const randomEncounterIndex = Math.floor(
        Math.random() * this.randomEncounterService.hiddenEncounters().length
      );
      this.currentRandomEncounter.set(
        this.randomEncounterService.hiddenEncounters()[randomEncounterIndex]
      );
    }
  });
  resetEncounter = effect(() => {
    if (this.bossEncounterPokemonService.resetEncounters() === true) {
      this.currentRandomEncounter.set(null);
      this.bossEncounterPokemonService.rightDisable.set(false);
      this.hidden.set(true);
      setTimeout(() => {
        this.bossEncounterPokemonService.resetEncounters.set(false);
      }, 300);
    }
  });

  hidden: WritableSignal<boolean> = signal(true);

  uncover() {
    this.hidden.set(false);
    this.backgroundImage = this.currentRandomEncounter()!.image;
  }
  backgroundImage = 'assets/effects/QuestionEvent.jpg';

  choose() {
    this.bossEncounterPokemonService.leftDisable.set(true);
    this.bossEncounterPokemonService.centerDisable.set(true);
    this.encounterService.choosingEvent.set(true);
    setTimeout(() => {
      this.bossEncounterPokemonService.resetEncounters.set(true);
      this.bossEncounterPokemonService.encounterToggle.set(true);
      this.hidden.set(false);
      this.backgroundImage = 'assets/effects/QuestionEvent.jpg';
      this.encounterService.choosingEvent.set(false);
    }, 2400);
  }
  choice() {
    return this.bossEncounterPokemonService.rightDisable();
  }
  choosingDisable() {
    return this.encounterService.choosingEvent();
  }

  selectedEvent() {
    const encounter = this.currentRandomEncounter();
    this.encounterService.selectedEvent.set(encounter);
  }
}
