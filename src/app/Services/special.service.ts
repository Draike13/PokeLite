import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { HelperService } from './helper.service';
import { Pokemon } from '../Models/pokemon.model';
import { SaveService } from './save.service';
import { BossEncounterPokemonService } from './boss-encounter-pokemon.service';
import { BattleLogService } from './battle-log.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialService {
  private intervalRef: any = null;

  constructor(
    private battleLogService: BattleLogService,
    private saveService: SaveService,
    private helperService: HelperService
  ) {
    effect(() => {
      const active = this.helperService.activePokemon(); // or however you access active
      if (active?.id === 101010101010) {
        this.startMissingNoCorruption();
        this.startGlitchLog();
      } else {
        this.stopMissingNoCorruption();
        this.stopGlitchLog();
      }
    });
  }

  private startMissingNoCorruption() {
    if (this.intervalRef) return; // Already running

    this.intervalRef = setInterval(() => {
      const damageAmount = this.randomInt(2, 50);
      const newAttack = this.randomInt(1, 999);

      this.helperService.damage.update((v) => v + damageAmount);

      const missingNo = this.helperService.activePokemon();
      if (missingNo && missingNo.id === 101010101010) {
        missingNo.attack = newAttack;
      }
    }, 1000);
  }

  private stopMissingNoCorruption() {
    clearInterval(this.intervalRef);
    this.intervalRef = null;
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  glitchTimer: ReturnType<typeof setInterval> | null = null;

  startGlitchLog() {
    this.stopGlitchLog();

    this.glitchTimer = setInterval(() => {
      // 80% chance to glitch
      if (Math.random() < 0.8) {
        const glitchMessages = [
          '█▓▒░͘͟͢G̶̴͜L̷̵͘I͢T̵̢͘͝C̨͜͏Ḩ̸̧░▒▓█',
          'Err0r...R͜͠e͝͠͏a̴͢l͏͝i̸̶t͘͟ý̴̴ D͟͢͏ís̷t͢͏͝ơ̵͠r̡̛ţ̡́e̸̛d̨.',
          '[DATA EXPUNGED]',
          '...who am i?',
          '▚▚▚▚▚ LOADING ███',
          'What...what is trainer?',
          '̴̡͢D҉̶̛͢͟Ǫ̛̛͞ ̸̴͢͠N̷̨̛͢͞Ó̸̶T̷̡͢ ̀͏́͢͡Ú̷̷͘͏S̕͜͝Ę̨͝',
        ];
        const glitchLine =
          glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
        this.battleLogService.addToBattleLog({
          text: glitchLine,
          type: 'glitch',
        });
      }
    }, 1600);
  }

  stopGlitchLog() {
    if (this.glitchTimer) {
      clearInterval(this.glitchTimer);
      this.glitchTimer = null;
    }
  }

  eeveeCount = 0;

  refusal: WritableSignal<boolean> = signal(false);
  refusalText: WritableSignal<string> = signal('On second thought...');

  bRefusal: WritableSignal<boolean> = signal(false);
  cRefusal: WritableSignal<boolean> = signal(false);
  sRefusal: WritableSignal<boolean> = signal(false);
  refusalCount: WritableSignal<number> = signal(0);

  specialHoldoutId: WritableSignal<number | null> = signal(null);

  refusalFlags = {
    1: this.bRefusal,
    2: this.cRefusal,
    3: this.sRefusal,
  };

  specialUnlock = effect(() => {
    if (this.refusalCount() === 3) {
      setTimeout(() => {
        this.unlockPikachu();
      }, 500);
    }
  });

  unlockPikachu() {
    this.helperService.activeSave()!.pokemonData.filter((eachPokemon) => {
      if (eachPokemon.id === 4) {
        eachPokemon.locked = false;
      }
    });
    this.saveService.saveGame(this.helperService.activeSave()!);
    this.saveService.getSaves();
  }

  unlockEevee() {
    this.eeveeCount++;
    if (this.eeveeCount > 9) {
      this.helperService.activeSave()!.pokemonData.filter((eachPokemon) => {
        if (eachPokemon.id === 5) {
          eachPokemon.locked = false;
        }
      });
    }
    this.saveService.saveGame(this.helperService.activeSave()!);
    this.saveService.getSaves();
  }

  unlockMissingNo() {
    this.helperService.activeSave()!.pokemonData.filter((eachPokemon) => {
      if (eachPokemon.id === 101010101010) {
        eachPokemon.locked = false;
      }
    });
    this.saveService.saveGame(this.helperService.activeSave()!);
    this.saveService.getSaves();
  }
}
