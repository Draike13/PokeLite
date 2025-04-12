import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { HelperService } from './helper.service';
import { Pokemon } from '../Models/pokemon.model';
import { SaveService } from './save.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialService {
  constructor(
    private saveService: SaveService,
    private helperService: HelperService
  ) {}
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
}
