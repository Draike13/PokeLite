import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { EncounterService } from '../../Services/encounter.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';
import { BossEncounterPokemonService } from '../../Services/boss-encounter-pokemon.service';

@Component({
  selector: 'app-choice-box-right',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './choice-box-right.component.html',
  styleUrl: './choice-box-right.component.css',
})
export class ChoiceBoxRightComponent {
  constructor(
    private bossEncounterPokemonService: BossEncounterPokemonService,
    private helperService: HelperService,
    private encounterService: EncounterService
  ) {}

  pokemonAttacked: WritableSignal<boolean> = signal(false);

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

  triggerAttackEffect() {
    this.pokemonAttacked.set(true);
    setTimeout(() => {
      this.pokemonAttacked.set(false);
    }, 300);
  }
  brockEvolveEffect: WritableSignal<boolean> = signal(false);
  brockEvolve = effect(() => {
    this.brockEvolveEffect.set(
      this.bossEncounterPokemonService.brockEvolveEffect()
    );
  });
}
