import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { HelperService } from './helper.service';
import { Pokemon } from './pokemon.model';
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

  changeCount = effect(() => {
    let count = 0;
    if (this.cRefusal()) count++;
    if (this.bRefusal()) count++;
    if (this.sRefusal()) count++;
    this.refusalCount.set(count);
    console.log(this.refusalCount());
  });

  cRefusal: WritableSignal<boolean> = signal(false);
  bRefusal: WritableSignal<boolean> = signal(false);
  sRefusal: WritableSignal<boolean> = signal(false);
  refusalCount: WritableSignal<number> = signal(0);

  specialUnlock = effect(() => {
    if (this.refusalCount() === 3) {
      setTimeout(() => {
        this.unlockPikachu();
      }, 500);
    }
  });

  refusal(pokemon: Pokemon) {
    if (pokemon.commonId === 1) {
      this.bRefusal.set(true);
    } else if (pokemon.commonId === 2) {
      this.cRefusal.set(true);
    } else if (pokemon.commonId === 3) {
      this.sRefusal.set(true);
    }
  }

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
