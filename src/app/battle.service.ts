import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor(private helperService: HelperService) {}

  get currentHealth() {
    return this.helperService.playerCurrentHealth;
  }
  get maxHealth() {
    return this.helperService.playerMaxHealth;
  }
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
    this.currentHealth.set(this.currentHealth()! - 3);
    if (this.currentHealth()! <= 0) {
      this.currentHealth.set(0);
    }
  }
  recoverHealth() {
    this.currentHealth.set(this.currentHealth()! + 5);
    if (this.currentHealth()! > this.maxHealth()) {
      this.currentHealth.set(this.maxHealth());
    }
  }
  gainLevel() {
    this.experience.set(0);
    this.level.set(this.level()! + 1);
  }
}
