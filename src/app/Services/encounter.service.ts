import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BossService } from '../Data/boss.service';
import { Boss } from '../Models/boss.model';
import { HelperService } from './helper.service';
import { BattleService } from './battle.service';
import { BossEncounterPokemonService } from './boss-encounter-pokemon.service';
import { ItemsService } from '../Data/items.service';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(
    private itemService: ItemsService,
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

  currentItems: WritableSignal<{ name: string; id: number; image: string }[]> =
    signal([]);
  sortBossItems = effect(() => {
    this.itemService.items().forEach((eachItem) => {
      if (this.activeBoss()?.difficulty === 1) {
        if (eachItem.id === 1 || eachItem.id === 2) {
          this.currentItems().push(eachItem);
        }
      }
    });
  });

  availableBossItems() {
    return this.itemService
      .items()
      .filter(
        (item) =>
          item.minDifficulty <= this.activeBoss()!.difficulty &&
          this.activeBoss()!.difficulty <= item.maxDifficulty &&
          (!item.unlockCondition || item.unlockCondition())
      );
  }

  getRandomItem() {
    const availableItems = this.itemService
      .items()
      .filter(
        (item) =>
          item.minDifficulty <= this.activeBoss()!.difficulty &&
          this.activeBoss()!.difficulty <= item.maxDifficulty &&
          (!item.unlockCondition || item.unlockCondition())
      );
    const weightedPool: number[] = [];

    for (const item of availableItems) {
      for (let i = 0; i < item.baseWeight; i++) {
        weightedPool.push(item.id);
      }
    }
    const randomIndex = Math.floor(Math.random() * weightedPool.length);
    return weightedPool[randomIndex];
  }

  cleanBoss = effect(() => {
    if (this.activeBoss()) {
      if (this.helperService.cleanBoss() === true) {
        this.setBoss(null);
        this.bossBattleStart.set(false);
        this.helperService.cleanBoss.set(false);
      }
    }
  });
}
