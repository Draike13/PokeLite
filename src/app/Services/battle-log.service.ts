import { Injectable, signal, WritableSignal } from '@angular/core';
import { BattleLog } from '../Models/battle-log.model';

@Injectable({
  providedIn: 'root',
})
export class BattleLogService {
  battleLog: WritableSignal<BattleLog[]> = signal([]);
  constructor() {}

  addToBattleLog(newLog: BattleLog) {
    const logs = this.battleLog();
    const updated = [...logs, newLog];
    this.battleLog.set(updated);
  }
}
