import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { SaveService } from './save.service';
import { RankService } from './rank.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor(
    private helperService: HelperService,
    private saveService: SaveService,
    private rankService: RankService
  ) {}

  giveExp() {
    this.helperService.gainedExp.set(this.helperService.gainedExp() + 7);
    if (this.helperService.gainedExp() >= 100) {
      this.helperService.gainedLevels.set(
        this.helperService.gainedLevels()! + 1
      );
      this.helperService.PlayerExp.set(this.helperService.PlayerExp() - 100);
    }
  }
  takeDamage() {
    this.helperService.damage.set(this.helperService.damage() + 3);
    if (this.helperService.damage() >= this.helperService.playerMaxHealth()) {
      this.helperService.damage.set(this.helperService.playerMaxHealth());
    }
  }
  recoverHealth() {
    this.helperService.damage.set(this.helperService.damage() - 5);
    if (this.helperService.damage() <= 0) {
      this.helperService.damage.set(0);
    }
  }
  gainLevel() {
    this.helperService.gainedExp.set(0);
    this.helperService.gainedLevels.set(this.helperService.gainedLevels() + 1);
  }
  gainBadge(badge: number) {
    this.helperService.playerBadges()[badge].acquired = true;
    this.saveService.saveGame(this.helperService.activeSave()!);
  }

  increaseRank() {
    let currentRankId: number;
    this.helperService.activeSave()!.rank.forEach((currentRank) => {
      if (currentRank.rankId <= 4) {
        if (currentRank.current === true) {
          currentRankId = currentRank.rankId;
        }
        if (currentRankId < 4) {
          currentRank.current = false;
          this.saveService.saveGame(this.helperService.activeSave()!);
          if (currentRank.rankId === currentRankId + 1) {
            currentRank.current = true;
            this.saveService.saveGame(this.helperService.activeSave()!);
          }
        }
      }
    });
  }
}
