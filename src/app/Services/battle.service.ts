import { effect, Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { SaveService } from './save.service';
import { RankService } from '../Data/rank.service';
import { Item } from '../Models/item.model';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  constructor(
    private helperService: HelperService,
    private saveService: SaveService,
    private rankService: RankService
  ) {}

  giveExp(exp: number) {
    this.helperService.activeSave()!.pokemonData.forEach((eachPokemon) => {
      if (eachPokemon.id === this.helperService.activePokemon()!.id) {
        eachPokemon.experience += exp;
        this.saveService.saveGame(this.helperService.activeSave()!);
        this.helperService.PlayerExp.set(eachPokemon.experience);
      }
    });
  }

  levelUp = effect(() => {
    let currentExp = this.helperService.PlayerExp();
    while (currentExp >= 100) {
      this.helperService.PlayerExp.set(currentExp - 100);
      this.gainLevel();
      currentExp -= 100;
    }
  });

  takeDamage() {
    this.helperService.damage.set(this.helperService.damage() + 3);
    if (this.helperService.damage() >= this.helperService.playerMaxHealth()) {
      this.helperService.damage.set(this.helperService.playerMaxHealth());
    }
  }
  recoverHealth(heal: number) {
    this.helperService.damage.set(this.helperService.damage() - heal);
    if (this.helperService.damage() <= 0) {
      this.helperService.damage.set(0);
    }
  }
  gainLevel() {
    this.helperService.activeSave()!.pokemonData.forEach((eachPokemon) => {
      if (eachPokemon.id === this.helperService.activePokemon()!.id) {
        eachPokemon.level += 1;
        this.saveService.saveGame(this.helperService.activeSave()!);
        this.helperService.playerLevel.set(eachPokemon.level);
      }
    });
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

  useItem(item: Item) {
    if (item.id === 1) {
      this.gainLevel();
    } else if (item.id === 2) {
      this.recoverHealth(10);
    } else if (item.id === 3) {
      this.helperService.playerAttack.update((atk) => atk + 5);
    }
  }
}
