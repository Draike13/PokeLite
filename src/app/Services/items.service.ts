import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items: WritableSignal<{}[]> = signal([
    {
      name: 'Rare Candy',
      id: 1,
      image: '',
    },
    {
      name: 'Potion',
      id: 2,
      image: '',
    },
    {
      name: 'X-Attack',
      id: 3,
      image: '',
    },
    {
      name: 'Max Potion',
      id: 4,
      image: '',
    },
    {
      name: 'Mega Stone',
      id: 5,
      image: '',
    },
  ]);
}
