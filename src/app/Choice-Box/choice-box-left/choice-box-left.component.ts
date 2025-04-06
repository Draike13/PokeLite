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
  bossExp() {
    return this.bossEncounterPokemonService.leftContainerExp();
  }

  attack() {
    return this.bossEncounterPokemonService.attackLeft();
  }
}
