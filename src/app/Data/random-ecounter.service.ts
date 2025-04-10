import { Injectable, signal, WritableSignal } from '@angular/core';
import { RandomEncounter } from '../Models/random-encounter.model';

@Injectable({
  providedIn: 'root',
})
export class RandomEcounterService {
  knownEncounters: WritableSignal<RandomEncounter[]> = signal([
    {
      id: 1,
      name: 'Pokemon Center',
      description: `Restore some of your Pokemon's health!`,
      image: '',
      hidden: false,
    },
    {
      id: 2,
      name: 'PokeMart',
      description: `Alright! You picked up a new TM at the PokeMart. This is a great new move!`,
      image: '',
      hidden: false,
    },
  ]);

  hiddenEncounters: WritableSignal<RandomEncounter[]> = signal([
    {
      id: 1,
      name: 'Wild Spearow Attack!',
      description: `A group of wild Spearow's suddenly fly out of a nearby tree. You must have disturbed their nest!`,
      image: '',
      hidden: true,
    },
  ]);
}
