import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BossService } from './boss.service';
import { Boss } from '../Models/boss.model';
import { HelperService } from './helper.service';
import { BattleService } from './battle.service';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(
    private bossService: BossService,
    private helperService: HelperService,
    private battleService: BattleService
  ) {}

  playerWin: WritableSignal<boolean> = signal(false);
  victoryCenter: WritableSignal<boolean> = signal(false);
  victoryRight: WritableSignal<boolean> = signal(false);
  victoryLeft: WritableSignal<boolean> = signal(false);

  bossBattleStart: WritableSignal<boolean> = signal(false);

  activeBoss: WritableSignal<Boss | null> = signal(null);

  setBoss(boss: Boss | null) {
    this.activeBoss.set(boss);
  }
  victory = effect(() => {
    if (this.activeBoss()) {
      if (
        this.victoryCenter() === true &&
        this.victoryRight() === true &&
        this.victoryLeft() === true
      ) {
        this.battleService.gainBadge(this.activeBoss()!.heldBadgeIndex);
        this.playerWin.set(true);
        this.victoryCenter.set(false);
        this.victoryRight.set(false);
        this.victoryLeft.set(false);
        this.bossBattleStart.set(false);
      }
    }
  });
}
