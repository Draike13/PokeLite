import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ContentBoxComponent } from '../content-box/content-box.component';
import { ChoiceBoxLeftComponent } from '../Choice-Box/choice-box-left/choice-box-left.component';
import { ChoiceBoxCenterComponent } from '../Choice-Box/choice-box-center/choice-box-center.component';
import { ChoiceBoxRightComponent } from '../Choice-Box/choice-box-right/choice-box-right.component';
import { StatBoxRightComponent } from '../Stat-Boxes/stat-box-right/stat-box-right.component';
import { StatBoxCenterComponent } from '../Stat-Boxes/stat-box-center/stat-box-center.component';
import { StatBoxLeftComponent } from '../Stat-Boxes/stat-box-left/stat-box-left.component';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { ExpBarComponent } from '../exp-bar/exp-bar.component';
import { BossEncounterPokemonService } from '../Services/boss-encounter-pokemon.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    ContentBoxComponent,
    ChoiceBoxLeftComponent,
    ChoiceBoxCenterComponent,
    ChoiceBoxRightComponent,
    StatBoxRightComponent,
    StatBoxCenterComponent,
    StatBoxLeftComponent,
    PlayerCardComponent,
    ExpBarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  pulseEffect() {
    return this.bossEncounterPokemonService.pulseEffect();
  }
  constructor(
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}

  triggerPulseEffect() {
    this.bossEncounterPokemonService.pulseEffect.set(true);
    setTimeout(() => {
      this.bossEncounterPokemonService.pulseEffect.set(false);
    }, 800);
  }
}
