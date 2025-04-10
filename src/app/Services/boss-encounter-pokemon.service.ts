import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { EncounterService } from './encounter.service';
import { HelperService } from './helper.service';
import { Pokemon } from '../Models/pokemon.model';
import { BattleLog } from '../Models/battle-log.model';
import { Item } from '../Models/item.model';

@Injectable({
  providedIn: 'root',
})
export class BossEncounterPokemonService {
  constructor(
    private encounterService: EncounterService,
    private helperService: HelperService
  ) {}
  encounterToggle: WritableSignal<boolean> = signal(false);
  battleLog: WritableSignal<BattleLog[]> = signal([]);

  playerDeclareAttack: WritableSignal<boolean> = signal(false);
  leftAttacking: WritableSignal<boolean> = signal(false);
  centerAttacking: WritableSignal<boolean> = signal(false);
  rightAttacking: WritableSignal<boolean> = signal(false);

  encounterRun = effect(() => {
    if (this.encounterToggle() === true) {
      this.leftView.set('encounter');
      this.centerView.set('encounter');
      this.rightView.set('encounter');
      setTimeout(() => {
        this.encounterToggle.set(false);
      }, 300);
    }
  });

  resetEncounters: WritableSignal<boolean> = signal(false);

  combatPhase = effect(() => {
    if (this.playerDeclareAttack() === true) {
      const activeAttackers = [];
      if (this.leftContainerCurrentHealth() > 0) activeAttackers.push(0);
      if (this.centerContainerCurrentHealth() > 0) activeAttackers.push(1);
      if (this.rightContainerCurrentHealth() > 0) activeAttackers.push(2);
      if (activeAttackers.length < 1) this.playerDeclareAttack.set(false);
      let randomAttacker = Math.floor(Math.random() * activeAttackers.length);
      const selectedAttacker = activeAttackers[randomAttacker];
      setTimeout(() => {
        if (selectedAttacker === 0) {
          this.leftAttacking.set(true);
          setTimeout(() => {
            const attack = this.leftContainerAttack();
            this.helperService.damage.update((current) => current + attack);
            this.addToBattleLog({
              text: `${this.leftContainerPokemonName()} dealt ${this.leftContainerAttack()} to ${this.helperService.playerPokemonName()}`,
              type: 'enemy-damage',
            });
            this.playerDeclareAttack.set(false);
          }, 1100);
        }
        if (selectedAttacker === 1) {
          this.centerAttacking.set(true);
          setTimeout(() => {
            const attack = this.centerContainerAttack();
            this.helperService.damage.update((current) => current + attack);
            this.addToBattleLog({
              text: `${this.centerContainerPokemonName()} dealt ${this.centerContainerAttack()} to ${this.helperService.playerPokemonName()}`,
              type: 'enemy-damage',
            });
            this.playerDeclareAttack.set(false);
          }, 1100);
        }
        if (selectedAttacker === 2) {
          this.rightAttacking.set(true);
          setTimeout(() => {
            const attack = this.rightContainerAttack();
            this.helperService.damage.update((current) => current + attack);
            this.addToBattleLog({
              text: `${this.rightContainerPokemonName()} dealt ${this.rightContainerAttack()} to ${this.helperService.playerPokemonName()}`,
              type: 'enemy-damage',
            });
            this.playerDeclareAttack.set(false);
          }, 1100);
        }
      }, 300);
    }
  });

  addToBattleLog(newLog: BattleLog) {
    const logs = this.battleLog();
    const updated = [...logs, newLog];
    this.battleLog.set(updated);
  }

  activePokemon: WritableSignal<Pokemon[]> = signal([]);

  startBattle = effect(() => {
    if (this.encounterService.bossBattleStart() === true) {
      this.setActive();
    }
  });

  setActive() {
    this.activePokemon.set(this.encounterService.activeBoss()!.pokemon);
  }
  resetActive = effect(() => {
    if (
      this.encounterService.playerWin() === true ||
      this.helperService.playerLoss() === true
    ) {
      this.activePokemon.set([]);
    }
  });
  leftDisable: WritableSignal<boolean> = signal(false);
  leftView: WritableSignal<'empty' | 'active' | 'item' | 'encounter'> =
    signal('empty');
  leftContainerAttack: WritableSignal<number> = signal(0);
  leftContainerMaxHealth: WritableSignal<number> = signal(0);
  leftContainerCurrentHealth: WritableSignal<number> = signal(0);
  leftContainerPokemonName: WritableSignal<string> = signal('');
  leftContainerPokemonImage: WritableSignal<string> = signal('');
  leftContainerLevel: WritableSignal<number> = signal(0);
  leftFoundItem: WritableSignal<Item | null> = signal(null);

  buildLeftCard = effect(() => {
    if (this.activePokemon().length > 0) {
      if (this.activePokemon()) {
        this.leftView.set('active');
        this.buildLeftBattleCard();
      }
    }
  });
  leftDead: WritableSignal<boolean> = signal(false);
  killLeft = effect(() => {
    if (this.leftView() === 'active') {
      if (this.leftContainerCurrentHealth() === 0) {
        this.leftDead.set(true);
        setTimeout(() => {
          if (
            (this.centerView() === 'empty' || this.centerView() === 'item') &&
            (this.rightView() === 'empty' || this.rightView() === 'item')
          ) {
            this.leftView.set('empty');
            this.centerView.set('empty');
            this.rightView.set('empty');
            this.encounterService.victoryLeft.set(true);
            this.leftDead.set(false);
          } else {
            const id = this.encounterService.getRandomItem();
            const item = this.encounterService
              .availableBossItems()
              .find((i) => i.id === id);
            this.leftFoundItem.set(item || null);
            this.leftView.set('item');
            this.encounterService.victoryLeft.set(true);
            this.leftDead.set(false);
          }
        }, 1250);
      }
    }
  });

  buildLeftBattleCard() {
    this.leftContainerAttack.set(this.activePokemon()![0].attack);
    this.leftContainerMaxHealth.set(this.activePokemon()![0].maxHealth);
    this.leftContainerCurrentHealth.set(this.activePokemon()![0].currentHealth);
    this.leftContainerPokemonName.set(this.activePokemon()![0].name);
    this.leftContainerPokemonImage.set(this.activePokemon()![0].image);
    this.leftContainerLevel.set(this.activePokemon()![0].level);
  }

  attackLeft() {
    if (this.leftContainerCurrentHealth() > 0) {
      this.leftContainerCurrentHealth.set(
        this.leftContainerCurrentHealth() - this.helperService.playerAttack()
      );
      this.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} dealt ${this.helperService.playerAttack()} damage to ${this.leftContainerPokemonName()}`,
        type: 'player-damage',
      });
    }
    if (this.leftContainerCurrentHealth() <= 0) {
      this.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} has defeated ${this.leftContainerPokemonName()}`,
        type: 'player-damage',
      });
      this.leftContainerCurrentHealth.set(0);
    }
  }
  centerDisable: WritableSignal<boolean> = signal(false);
  centerView: WritableSignal<'empty' | 'active' | 'item' | 'encounter'> =
    signal('empty');
  centerContainerAttack: WritableSignal<number> = signal(0);
  centerContainerMaxHealth: WritableSignal<number> = signal(0);
  centerContainerCurrentHealth: WritableSignal<number> = signal(0);
  centerContainerPokemonName: WritableSignal<string> = signal('');
  centerContainerPokemonImage: WritableSignal<string> = signal('');
  centerContainerLevel: WritableSignal<number> = signal(0);
  centerFoundItem: WritableSignal<Item | null> = signal(null);

  buildCenterCard = effect(() => {
    if (this.activePokemon().length > 0) {
      if (this.activePokemon()) {
        this.centerView.set('active');
        this.buildCenterBattleCard();
      }
    }
  });

  centerDead: WritableSignal<boolean> = signal(false);
  killCenter = effect(() => {
    if (this.centerView() === 'active') {
      if (this.centerContainerCurrentHealth() === 0) {
        this.centerDead.set(true);
        setTimeout(() => {
          if (
            (this.leftView() === 'empty' || this.leftView() === 'item') &&
            (this.rightView() === 'empty' || this.rightView() === 'item')
          ) {
            this.leftView.set('empty');
            this.centerView.set('empty');
            this.rightView.set('empty');
            this.encounterService.victoryCenter.set(true);
            this.centerDead.set(false);
          } else {
            const id = this.encounterService.getRandomItem();
            const item = this.encounterService
              .availableBossItems()
              .find((i) => i.id === id);
            this.centerFoundItem.set(item || null);
            this.centerView.set('item');
            this.encounterService.victoryCenter.set(true);
            this.centerDead.set(false);
          }
        }, 1250);
      }
    }
  });

  buildCenterBattleCard() {
    this.centerContainerAttack.set(this.activePokemon()![1].attack);
    this.centerContainerMaxHealth.set(this.activePokemon()![1].maxHealth);
    this.centerContainerCurrentHealth.set(
      this.activePokemon()![1].currentHealth
    );
    this.centerContainerPokemonName.set(this.activePokemon()![1].name);
    this.centerContainerPokemonImage.set(this.activePokemon()![1].image);
    this.centerContainerLevel.set(this.activePokemon()![1].level);
  }

  attackCenter() {
    if (this.centerContainerCurrentHealth() > 0) {
      this.centerContainerCurrentHealth.set(
        this.centerContainerCurrentHealth() - this.helperService.playerAttack()
      );
      this.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} dealt ${this.helperService.playerAttack()} damage to ${this.centerContainerPokemonName()}`,
        type: 'player-damage',
      });
    }
    if (this.centerContainerCurrentHealth() <= 0) {
      this.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} has defeated ${this.centerContainerPokemonName()}`,
        type: 'player-damage',
      });
      this.centerContainerCurrentHealth.set(0);
    }
  }

  rightDisable: WritableSignal<boolean> = signal(false);
  rightView: WritableSignal<'empty' | 'active' | 'item' | 'encounter'> =
    signal('empty');
  rightContainerAttack: WritableSignal<number> = signal(0);
  rightContainerMaxHealth: WritableSignal<number> = signal(0);
  rightContainerCurrentHealth: WritableSignal<number> = signal(0);
  rightContainerPokemonName: WritableSignal<string> = signal('');
  rightContainerPokemonImage: WritableSignal<string> = signal('');
  rightContainerLevel: WritableSignal<number> = signal(0);
  rightFoundItem: WritableSignal<Item | null> = signal(null);

  buildRightCard = effect(() => {
    if (this.activePokemon().length > 0) {
      if (this.activePokemon()) {
        this.rightView.set('active');
        this.buildRightBattleCard();
      }
    }
  });
  rightDead: WritableSignal<boolean> = signal(false);
  killRight = effect(() => {
    if (this.rightView() === 'active') {
      if (this.rightContainerCurrentHealth() === 0) {
        this.rightDead.set(true);
        setTimeout(() => {
          if (
            (this.leftView() === 'empty' || this.leftView() === 'item') &&
            (this.centerView() === 'empty' || this.centerView() === 'item')
          ) {
            this.leftView.set('empty');
            this.centerView.set('empty');
            this.rightView.set('empty');
            this.encounterService.victoryRight.set(true);
            this.rightDead.set(false);
          } else {
            const id = this.encounterService.getRandomItem();
            const item = this.encounterService
              .availableBossItems()
              .find((i) => i.id === id);
            this.rightFoundItem.set(item || null);
            this.rightView.set('item');
            this.encounterService.victoryRight.set(true);
            this.rightDead.set(false);
          }
        }, 1250);
      }
    }
  });

  buildRightBattleCard() {
    this.rightContainerAttack.set(this.activePokemon()![2].attack);
    this.rightContainerMaxHealth.set(this.activePokemon()![2].maxHealth);
    this.rightContainerCurrentHealth.set(
      this.activePokemon()![2].currentHealth
    );
    this.rightContainerPokemonName.set(this.activePokemon()![2].name);
    this.rightContainerPokemonImage.set(this.activePokemon()![2].image);
    this.rightContainerLevel.set(this.activePokemon()![2].level);
  }

  attackRight() {
    if (this.rightContainerCurrentHealth() > 0) {
      this.rightContainerCurrentHealth.set(
        this.rightContainerCurrentHealth() - this.helperService.playerAttack()
      );
      this.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} dealt ${this.helperService.playerAttack()} damage to ${this.rightContainerPokemonName()}`,
        type: 'player-damage',
      });
    }
    if (this.rightContainerCurrentHealth() <= 0) {
      this.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} has defeated ${this.rightContainerPokemonName()}`,
        type: 'player-damage',
      });
      this.rightContainerCurrentHealth.set(0);
    }
  }

  brockEvolveEffect: WritableSignal<boolean> = signal(false);
  brockRan = false;
  brockSpecial = effect(() => {
    if (this.encounterService.activeBoss()) {
      if (
        this.encounterService.activeBoss()!.difficulty === 1 &&
        this.brockRan === false
      ) {
        let leftDead = false;
        let centerDead = false;
        if (this.rightView() === 'active') {
          if (this.leftContainerCurrentHealth() === 0) {
            leftDead = true;
          }
          if (this.centerContainerCurrentHealth() === 0) {
            centerDead = true;
          }
          if (leftDead === true && centerDead === true) {
            setTimeout(() => {
              this.brockRan = true;
              this.addToBattleLog({ text: `What?...`, type: 'status' });
              setTimeout(() => {
                this.addToBattleLog({
                  text: `Oh no! ${this.rightContainerPokemonName()} is evolving!`,
                  type: 'status',
                });
                this.brockEvolveEffect.set(true);
              }, 700);
              setTimeout(() => {
                this.rightContainerAttack.set(this.activePokemon()![3].attack);
                this.rightContainerMaxHealth.set(
                  this.activePokemon()![3].maxHealth
                );
                this.rightContainerCurrentHealth.set(
                  this.activePokemon()![3].currentHealth
                );
                this.rightContainerPokemonName.set(
                  this.activePokemon()![3].name
                );
                this.rightContainerPokemonImage.set(
                  this.activePokemon()![3].image
                );
                this.rightContainerLevel.set(this.activePokemon()![3].level);
                this.brockEvolveEffect.set(false);
                this.brockRan = false;
              }, 3200);
            }, 1700);
          }
        }
      }
    }
  });

  mistyAttackEffect: WritableSignal<boolean> = signal(false);
  mistyAttackCooldown = false; // just a local class field
  pulseEffect: WritableSignal<boolean> = signal(false);
  mistySpecialSetter = effect(() => {
    const boss = this.encounterService.activeBoss();
    const misty = boss?.difficulty === 2;
    const psyduckAlive = this.rightContainerCurrentHealth() > 0;
    const psyduckBonusState =
      this.rightContainerCurrentHealth() <= this.rightContainerMaxHealth() / 2;

    const isActive = !!(boss && misty && psyduckAlive && psyduckBonusState);

    // Only set if changed to avoid triggering new effect unnecessarily
    if (this.mistyAttackEffect() !== isActive) {
      this.mistyAttackEffect.set(isActive);
    }
  });

  mistySpecial = effect(() => {
    const shouldRun = this.mistyAttackEffect();
    const attackTriggered = this.playerDeclareAttack();
    const psyduckAlive = this.rightContainerCurrentHealth() > 0;
    let rampageTriggered = false;

    if (
      shouldRun &&
      attackTriggered &&
      psyduckAlive &&
      !this.mistyAttackCooldown
    ) {
      this.mistyAttackCooldown = true;

      this.rightAttacking.set(true);
      if (!rampageTriggered) {
        this.addToBattleLog({
          text: 'Oh no! Psyduck is on a psychic rampage!',
          type: 'status',
        });
        rampageTriggered = true;
      }

      setTimeout(() => {
        const attack = this.rightContainerAttack();
        this.helperService.damage.update((current) => current + attack);
        this.addToBattleLog({
          text: `${this.rightContainerPokemonName()} dealt ${attack} bonus damage to ${this.helperService.playerPokemonName()}`,
          type: 'enemy-damage',
        });
        this.rightAttacking.set(false);
        this.pulseEffect.set(true);

        setTimeout(() => {
          this.pulseEffect.set(false);
          // stat boost happens here

          this.leftContainerAttack.update((atk) => atk + 2);
          this.centerContainerAttack.update((atk) => atk + 2);
          this.rightContainerAttack.update((atk) => atk + 2);
          this.addToBattleLog({
            text: `Misty's Pokemon are getting stronger...`,
            type: 'status',
          });
        }, 1000); // adjust to match the animation duration

        // Cooldown resets AFTER the action cycle completes
        setTimeout(() => {
          this.mistyAttackCooldown = false;
        }, 2000); // adjust this value if needed
      }, 1100);
    }
  });

  surgeEffect: WritableSignal<boolean> = signal(false);

  surgeSpecial = effect(() => {
    const boss = this.encounterService.activeBoss();
    const surge = boss?.difficulty === 3;

    if (boss && surge) {
      if (
        (this.leftAttacking() === true ||
          this.centerAttacking() === true ||
          this.rightAttacking() === true) &&
        this.surgeEffect() === false
      ) {
        const chance = Math.floor(Math.random() * 100);
        if (chance <= 60) {
          setTimeout(() => {
            this.surgeEffect.set(true);
            this.addToBattleLog({
              text: `Oh no! Your Pokemon was paralyzed!`,
              type: 'status',
            });
            setTimeout(() => {
              this.playerDeclareAttack.set(true);
              setTimeout(() => {
                this.surgeEffect.set(false);
              }, 1000);
            }, 1100);
          }, 1100);
        }
      }
    }
  });
}
