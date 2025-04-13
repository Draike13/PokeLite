import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../Services/helper.service';
import { BossEncounterPokemonService } from '../Services/boss-encounter-pokemon.service';

@Component({
  selector: 'app-player-card',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css',
})
export class PlayerCardComponent {
  constructor(
    private helperService: HelperService,
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}

  get selectedImage() {
    return this.helperService.playerImage;
  }
  playerLoss() {
    return this.helperService.playerLoss();
  }
  surgeEffect() {
    return this.bossEncounterPokemonService.surgeEffect();
  }
  evolving() {
    return this.helperService.evolveEffect();
  }
}
