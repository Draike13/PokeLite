import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BossService } from '../Data/boss.service';
import { Boss } from '../Models/boss.model';
import { HelperService } from './helper.service';
import { BattleService } from './battle.service';
import { BossEncounterPokemonService } from './boss-encounter-pokemon.service';
import { ItemsService } from '../Data/items.service';
import { RandomEncounter } from '../Models/random-encounter.model';

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

  bossSelected: WritableSignal<boolean> = signal(false);
  rewardChecker: WritableSignal<boolean> = signal(false);
  selectedEvent: WritableSignal<RandomEncounter | null> = signal(null);

  runEvent = effect(() => {
    const event = this.selectedEvent();
    if (!event) return;
    //pokemon center
    if (event.category === 1 && event.id === 1) {
      setTimeout(() => {
        this.battleService.recoverHealth(10);
      }, 300);
    }
    //pokemart
    if (event.category === 1 && event.id === 2) {
      setTimeout(() => {
        this.battleService.gainAttack(2);
      }, 300);
    }
    //celedon dept store
    if (event.category === 1 && event.id === 3) {
      setTimeout(() => {
        this.battleService.gainAttack(3);
      }, 300);
    }
    //Poffins!
    if (event.category === 1 && event.id === 3) {
      setTimeout(() => {
        this.battleService.recoverHealth(5);
      }, 300);
    }
    //trainer joey
    if (event.category === 2 && event.id === 1) {
      const chance = Math.floor(Math.random() * 100);
      if (chance <= 80) {
        setTimeout(() => {
          this.battleService.giveExp(20);
        }, 300);
      }
      if (chance > 80) {
        this.rewardChecker.set(true);
        setTimeout(() => {
          this.battleService.takeDamage(3);
        }, 300);
      }
    }
    //shorts boy
    if (event.category === 2 && event.id === 2) {
      const chance = Math.floor(Math.random() * 100);
      if (chance <= 70) {
        setTimeout(() => {
          this.battleService.giveExp(15);
        }, 300);
      }
      if (chance > 70) {
        this.rewardChecker.set(true);
        setTimeout(() => {
          this.battleService.takeDamage(2);
        }, 300);
      }
    }
    //random moving bush
    if (event.category === 2 && event.id === 3) {
      const chance = Math.floor(Math.random() * 100);
      if (chance <= 80) {
        setTimeout(() => {
          this.battleService.giveExp(15);
        }, 300);
      }
      if (chance > 80) {
        this.rewardChecker.set(true);
        setTimeout(() => {
          this.battleService.takeDamage(5);
        }, 300);
      }
    }
    //stop the team rocket grunt
    if (event.category === 2 && event.id === 4) {
      setTimeout(() => {
        this.battleService.giveExp(30);
      }, 300);
    }
    //spearow attack
    if (event.category === 3 && event.id === 1) {
      const chance = Math.floor(Math.random() * 100);
      if (chance <= 5) {
        setTimeout(() => {
          this.battleService.giveExp(15);
        }, 300);
      }
      if (chance > 5) {
        this.rewardChecker.set(true);
        setTimeout(() => {
          this.battleService.takeDamage(2);
        }, 300);
      }
    }
    //found a chansey
    if (event.category === 3 && event.id === 2) {
      const chance = Math.floor(Math.random() * 100);
      if (chance <= 70) {
        setTimeout(() => {
          this.battleService.recoverHealth(15);
        }, 300);
      }
      if (chance > 70) {
        this.rewardChecker.set(true);
      }
    }
    //haunter attack
    if (event.category === 3 && event.id === 3) {
      const chance = Math.floor(Math.random() * 100);
      if (chance <= 50) {
        setTimeout(() => {
          this.battleService.giveExp(40);
        }, 300);
      }
      if (chance > 50) {
        this.rewardChecker.set(true);
        setTimeout(() => {
          this.battleService.takeDamage(5);
        }, 300);
      }
    }
    //rare candy
    if (event.category === 3 && event.id === 4) {
      setTimeout(() => {
        this.battleService.gainLevel();
      }, 300);
    }
  });

  choosingEvent: WritableSignal<boolean> = signal(false);
  routeCounter: WritableSignal<number> = signal(0);

  increaseRouteCount() {
    this.routeCounter.set(this.routeCounter() + 1);
  }

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
