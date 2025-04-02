import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor(private helperService: HelperService) {}
  get experience() {
    return this.helperService.PlayerExp;
  }
  get level() {
    return this.helperService.playerLevel;
  }

  giveExp() {
    this.experience.set(this.experience() + 7);
    if (this.experience() >= 100) {
      this.level.set(this.level()! + 1);
      this.experience.set(this.experience()! - 100);
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
    this.experience.set(0);
    this.helperService.gainedLevels.set(this.helperService.gainedLevels() + 1);
  }
}
