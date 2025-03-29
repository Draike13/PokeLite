import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpecialService {
  constructor() {}
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
}
