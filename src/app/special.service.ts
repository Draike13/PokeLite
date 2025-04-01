import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialService {
  constructor(private helperService:HelperService) {}
eeveeCount = 0

  changeCount = effect(() => {
    let count = 0;
    if (this.cRefusal()) count++;
    if (this.bRefusal()) count++;
    if (this.sRefusal()) count++;
    this.refusalCount.set(count);
  });

  cRefusal: WritableSignal<boolean> = signal(false);
  bRefusal: WritableSignal<boolean> = signal(false);
  sRefusal: WritableSignal<boolean> = signal(false);
  refusalCount: WritableSignal<number> = signal(0);


  unlockEevee() {
    this.eeveeCount++;
    if (this.eeveeCount > 9) {
      this.helperService.fullPokeList().filter((eachPokemon) => {
        if (eachPokemon.id === 5) {
          eachPokemon.locked = false;
        }
      });
    }
  }
}

