import { Injectable, signal, WritableSignal } from '@angular/core';
import { Rank } from '../Models/rank.model';

@Injectable({
  providedIn: 'root',
})
export class RankService {
  ranks: WritableSignal<Rank[]> = signal([
    {
      rankId: 1,
      rankImage: 'assets/ranks/Pokeball-white.png',
      current: true,
    },
    {
      rankId: 2,
      rankImage: 'assets/ranks/Pokeball-red.png',
      current: false,
    },
    {
      rankId: 3,
      rankImage: 'assets/ranks/Pokeball-gold.png',
      current: false,
    },
    {
      rankId: 4,
      rankImage: 'assets/ranks/Pokeball-purple.png',
      current: false,
    },
  ]);
}
