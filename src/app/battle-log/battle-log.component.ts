import { Component, ElementRef, ViewChild } from '@angular/core';
import { BossEncounterPokemonService } from '../Services/boss-encounter-pokemon.service';
import { NgClass } from '@angular/common';
import { count } from 'rxjs';

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
  @ViewChild('logContainer') logContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.logContainer) {
      const el = this.logContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  log() {
    return this.bossEncounterPokemonService.battleLog();
  }
}
