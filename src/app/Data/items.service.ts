import { Injectable, signal, WritableSignal } from '@angular/core';
import { Item } from '../Models/item.model';
import { BossService } from './boss.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private bossService: BossService) {}
  items: WritableSignal<Item[]> = signal([
    {
      name: 'Rare Candy',
      id: 1,
      image: 'assets/items/RareCandy.png',
      baseWeight: 10,
      minDifficulty: 1,
      maxDifficulty: 8,
    },
    {
      name: 'Potion',
      id: 2,
      image: 'assets/items/Potion.png',
      baseWeight: 50,
      minDifficulty: 1,
      maxDifficulty: 6,
    },
    {
      name: 'X-Attack',
      id: 3,
      image: 'assets/items/XAttack.png',
      baseWeight: 30,
      minDifficulty: 2,
      maxDifficulty: 8,
    },
    {
      name: 'Max Potion',
      id: 4,
      image: 'assets/items/MaxPotion.png',
      baseWeight: 10,
      minDifficulty: 5,
      maxDifficulty: 8,
    },
    {
      name: 'Mega Stone',
      id: 5,
      image: '',
      baseWeight: 10,
      minDifficulty: 8,
      maxDifficulty: 8,
      unlockCondition: () =>
        this.bossService.Bosses()[7].pokemon[3].locked === false,
    },
  ]);
}
