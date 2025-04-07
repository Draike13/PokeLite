import { Component } from '@angular/core';
import { BossEncounterPokemonService } from '../Services/boss-encounter-pokemon.service';

@Component({
  selector: 'app-battle-log',
  imports: [],
  templateUrl: './battle-log.component.html',
  styleUrl: './battle-log.component.css',
})
export class BattleLogComponent {
  constructor(
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}
  log() {
    return this.bossEncounterPokemonService.battleLog();
  }
}
