import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { BossEncounterPokemonService } from '../Services/boss-encounter-pokemon.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-battle-log',
  imports: [NgClass],
  templateUrl: './battle-log.component.html',
  styleUrl: './battle-log.component.css',
})
export class BattleLogComponent {
  constructor(
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}
  ngAfterViewChecked() {
    const container = document.querySelector('.log-wrapper');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  log() {
    return this.bossEncounterPokemonService.battleLog();
  }
}
