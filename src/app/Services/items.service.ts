import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items: WritableSignal<{ name: string; id: number; image: string }[]> = signal(
    [
      {
        name: 'Rare Candy',
        id: 1,
        image: 'assets/items/RareCandy.png',
      },
      {
        name: 'Potion',
        id: 2,
        image: 'assets/items/Potion.png',
      },
      {
        name: 'X-Attack',
        id: 3,
        image: 'assets/items/XAttack.png',
      },
      {
        name: 'Max Potion',
        id: 4,
        image: 'assets/items/MaxPotion.png',
      },
      {
        name: 'Mega Stone',
        id: 5,
        image: '',
      },
    ]
  );
}
