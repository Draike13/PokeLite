import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EncounterService } from '../../Services/encounter.service';
import { HelperService } from '../../Services/helper.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';
import { BossEncounterPokemonService } from '../../Services/boss-encounter-pokemon.service';

@Component({
  selector: 'app-choice-box-left',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './choice-box-left.component.html',
  styleUrl: './choice-box-left.component.css',
})
export class ChoiceBoxLeftComponent {
  constructor(
    private encounterService: EncounterService,
    private helperService: HelperService,
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}

  pokemonAttacked: WritableSignal<boolean> = signal(false);

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

  triggerAttackEffect() {
    this.pokemonAttacked.set(true);
    setTimeout(() => {
      this.pokemonAttacked.set(false);
    }, 300);
  }
  declareAttack() {
    this.bossEncounterPokemonService.playerDeclareAttack.set(true);
  }
}
