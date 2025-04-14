import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { EncounterService } from './encounter.service';
import { HelperService } from './helper.service';
import { Pokemon } from '../Models/pokemon.model';
import { BattleLog } from '../Models/battle-log.model';
import { Item } from '../Models/item.model';
import { BattleLogService } from './battle-log.service';

@Injectable({
  providedIn: 'root',
})
export class BossEncounterPokemonService {
  constructor(
    private battleLogService: BattleLogService,
    private encounterService: EncounterService,
    private helperService: HelperService
  ) {}
  encounterToggle: WritableSignal<boolean> = signal(false);
  // battleLog: WritableSignal<BattleLog[]> = signal([]);

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
  attackLocked: WritableSignal<boolean> = signal(false);

  combatPhase = effect(() => {
    if (this.playerDeclareAttack() === true) {
      this.attackLocked.set(true);
      this.playerDeclareAttack.set(false);
      const activeAttackers = [];
      if (this.leftContainerCurrentHealth() > 0) activeAttackers.push(0);
      if (this.centerContainerCurrentHealth() > 0) activeAttackers.push(1);
      if (this.rightContainerCurrentHealth() > 0) activeAttackers.push(2);
      if (activeAttackers.length < 1) {
        this.attackLocked.set(false);
      }
      let randomAttacker = Math.floor(Math.random() * activeAttackers.length);
      const selectedAttacker = activeAttackers[randomAttacker];
      setTimeout(() => {
        if (selectedAttacker === 0) {
          this.leftAttacking.set(true);
          setTimeout(() => {
            const attack = this.leftContainerAttack();
            this.helperService.damage.update((current) => current + attack);
            this.battleLogService.addToBattleLog({
              text: `${this.leftContainerPokemonName()} dealt ${this.leftContainerAttack()} to ${this.helperService.playerPokemonName()}`,
              type: 'enemy-damage',
            });
            this.attackLocked.set(false);
          }, 1100);
        }
        if (selectedAttacker === 1) {
          this.centerAttacking.set(true);
          setTimeout(() => {
            const attack = this.centerContainerAttack();
            this.helperService.damage.update((current) => current + attack);
            this.battleLogService.addToBattleLog({
              text: `${this.centerContainerPokemonName()} dealt ${this.centerContainerAttack()} to ${this.helperService.playerPokemonName()}`,
              type: 'enemy-damage',
            });
            this.attackLocked.set(false);
          }, 1100);
        }
        if (selectedAttacker === 2) {
          this.rightAttacking.set(true);
          setTimeout(() => {
            const attack = this.rightContainerAttack();
            this.helperService.damage.update((current) => current + attack);
            this.battleLogService.addToBattleLog({
              text: `${this.rightContainerPokemonName()} dealt ${this.rightContainerAttack()} to ${this.helperService.playerPokemonName()}`,
              type: 'enemy-damage',
            });
            this.attackLocked.set(false);
          }, 1100);
        }
      }, 300);
    }
  });

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
      this.battleLogService.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} dealt ${this.helperService.playerAttack()} damage to ${this.leftContainerPokemonName()}`,
        type: 'player-damage',
      });
    }
    if (this.leftContainerCurrentHealth() <= 0) {
      this.battleLogService.addToBattleLog({
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
      this.battleLogService.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} dealt ${this.helperService.playerAttack()} damage to ${this.centerContainerPokemonName()}`,
        type: 'player-damage',
      });
    }
    if (this.centerContainerCurrentHealth() <= 0) {
      this.battleLogService.addToBattleLog({
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
      this.battleLogService.addToBattleLog({
        text: `${this.helperService.playerPokemonName()} dealt ${this.helperService.playerAttack()} damage to ${this.rightContainerPokemonName()}`,
        type: 'player-damage',
      });
    }
    if (this.rightContainerCurrentHealth() <= 0) {
      this.battleLogService.addToBattleLog({
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
              this.battleLogService.addToBattleLog({
                text: `What?...`,
                type: 'status',
              });
              setTimeout(() => {
                this.battleLogService.addToBattleLog({
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
  pulseEffect: WritableSignal<boolean> = signal(false);
  mistyAttackCooldown = false;
  mistyBonusStaged = false; // NEW: used to delay misty effect after normal attack

  mistyAttackEffectSetter = effect(() => {
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
    const attackTriggered = this.attackLocked();
    const psyduckAlive = this.rightContainerCurrentHealth() > 0;

    if (
      shouldRun &&
      attackTriggered &&
      psyduckAlive &&
      !this.mistyAttackCooldown
    ) {
      // If Psyduck already attacked normally, stage this for next tick
      if (this.rightAttacking()) {
        // 🧠 Psyduck is doing a normal attack, wait for it to end before rampage
        if (!this.mistyBonusStaged) {
          this.mistyBonusStaged = true;
          setTimeout(() => {
            this.attackLocked.set(true); // retrigger mistySpecial
            this.mistyBonusStaged = false;
          }, 50); // short delay just to let the current attack resolve
        }
        return;
      }

      this.mistyAttackCooldown = true;
      this.rightAttacking.set(true);

      this.battleLogService.addToBattleLog({
        text: 'Oh no! Psyduck is on a psychic rampage!',
        type: 'status',
      });

      setTimeout(() => {
        const attack = this.rightContainerAttack();
        this.helperService.damage.update((current) => current + attack);
        this.battleLogService.addToBattleLog({
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
          this.battleLogService.addToBattleLog({
            text: `Misty's Pokemon are getting stronger...`,
            type: 'status',
          });
        }, 1150);

        setTimeout(() => {
          this.mistyAttackCooldown = false;
        }, 1200);
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
            this.battleLogService.addToBattleLog({
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

  poisonLevel: WritableSignal<number> = signal(0); // 0 = none, 1 = slight, 2 = poisoned, 3 = badly
  poisonAttackers = new Set<string>();

  isPoisonBossActive(): boolean {
    const boss = this.encounterService.activeBoss();
    return boss?.difficulty === 4;
  }

  checkPoisonTriggers() {
    if (!this.isPoisonBossActive()) return;

    const newTriggers: string[] = [];

    if (this.leftAttacking() && !this.poisonAttackers.has('left')) {
      this.poisonAttackers.add('left');
      newTriggers.push('left');
    }

    if (this.centerAttacking() && !this.poisonAttackers.has('center')) {
      this.poisonAttackers.add('center');
      newTriggers.push('center');
    }

    if (this.rightAttacking() && !this.poisonAttackers.has('right')) {
      this.poisonAttackers.add('right');
      newTriggers.push('right');
    }

    if (newTriggers.length > 0) {
      const newLevel = this.poisonAttackers.size;
      this.poisonLevel.set(newLevel);

      const statusText = ['slightly poisoned', 'poisoned', 'badly poisoned'][
        newLevel - 1
      ];

      this.battleLogService.addToBattleLog({
        text: `Oh no! ${
          this.helperService.activePokemon()!.name
        } was ${statusText}!`,
        type: 'status',
      });
    }
  }

  applyPoisonDamage() {
    if (!this.isPoisonBossActive()) return;

    const level = this.poisonLevel();
    const damage = level * 2;

    if (damage > 0) {
      this.helperService.damage.update((current) => current + damage);

      this.battleLogService.addToBattleLog({
        text: `You take ${damage} poison damage!`,
        type: 'enemy-damage',
      });
    }
  }

  resetPoisonEffect() {
    this.poisonAttackers.clear();
    this.poisonLevel.set(0);
  }
  poisonApplied = {
    left: false,
    center: false,
    right: false,
  };
  poisonAttackWatcher = effect(() => {
    if (!this.isPoisonBossActive()) return;
    if (this.leftAttacking() && !this.poisonApplied.left) {
      this.poisonApplied.left = true;
      this.checkPoisonTriggers();
      setTimeout(() => {
        this.applyPoisonDamage();
        this.poisonApplied.left = false;
      }, 50);
    }

    if (this.centerAttacking() && !this.poisonApplied.center) {
      this.poisonApplied.center = true;
      this.checkPoisonTriggers();
      this.healingWaveLockout = true;
      this.healingEffect.set(true);

      setTimeout(() => {
        this.triggerHealingWave();
        this.applyPoisonDamage();
        this.poisonApplied.center = false;
      }, 50);
    }

    if (this.rightAttacking() && !this.poisonApplied.right) {
      this.poisonApplied.right = true;
      this.checkPoisonTriggers();
      setTimeout(() => {
        this.applyPoisonDamage();
        this.poisonApplied.right = false;
      }, 50);
    }
  });
  healingEffect: WritableSignal<boolean> = signal(false);
  healingWaveLockout = false;
  triggerHealingWave() {
    if (!this.isPoisonBossActive()) return;
    setTimeout(() => {
      this.healingEffect.set(false);
    }, 800);
    if (!this.healingWaveLockout) return;
    this.healingWaveLockout = false;
    const left = this.leftContainerCurrentHealth;
    const right = this.rightContainerCurrentHealth;
    const center = this.centerContainerCurrentHealth;

    if (this.leftView() === 'active') {
      left.update((current) => current + 7);
      console.log('left healed');
    }
    if (this.centerView() === 'active') {
      center.update((current) => current + 12);
      console.log('center healed');
      this.battleLogService.addToBattleLog({
        text: `${this.centerContainerPokemonName()} is healing its allies!`,
        type: 'status',
      });
    }
    if (this.leftView() === 'active') {
      right.update((current) => current + 7);
      console.log('right healed');
    }
  }

  removePoison = effect(() => {
    if (this.helperService.playerLoss() || this.encounterService.playerWin()) {
      this.resetPoisonEffect();
    }
  });
}
