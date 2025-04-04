import { Injectable, signal, WritableSignal } from '@angular/core';
import { BossService } from './boss.service';
import { Boss } from '../Models/boss.model';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(private bossService: BossService) {}

  bossBattleStart: WritableSignal<boolean> = signal(false);

  activeBoss: WritableSignal<Boss | null> = signal(null);

  setBoss(boss: Boss) {
    this.activeBoss.set(boss);
    console.log(boss.bossName);
  }
}
