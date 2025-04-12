import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { BattleLogService } from '../Services/battle-log.service';

@Component({
  selector: 'app-battle-log',
  imports: [NgClass],
  templateUrl: './battle-log.component.html',
  styleUrl: './battle-log.component.css',
})
export class BattleLogComponent {
  constructor(private battleLogService: BattleLogService) {}
  ngAfterViewChecked() {
    const container = document.querySelector('.log-wrapper');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  log() {
    return this.battleLogService.battleLog();
  }
}
