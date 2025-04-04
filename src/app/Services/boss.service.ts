import { Injectable, signal, WritableSignal } from '@angular/core';
import { Boss } from '../Models/boss.model';
import { BadgesService } from './badges.service';

@Injectable({
  providedIn: 'root',
})
export class BossService {
  Bosses: WritableSignal<Boss[]> = signal([
    {
      difficulty: 1,
      bossName: 'Brock',
      pokemon: [
        {
          id: 20,
          commonId: 20,
          name: 'Geodude',
          currentHealth: 25,
          maxHealth: 25,
          attack: 3,
          level: 5,
          experience: 0,
          image: 'assets/bosses/pokemon/Geodude.jpg',
          locked: false,
        },
        {
          id: 21,
          commonId: 21,
          name: 'Onix',
          currentHealth: 25,
          maxHealth: 25,
          attack: 3,
          level: 8,
          experience: 0,
          image: 'assets/bosses/pokemon/Onix.jpg',
          locked: false,
        },
        {
          id: 22,
          commonId: 22,
          name: 'Kabuto',
          currentHealth: 25,
          maxHealth: 25,
          attack: 3,
          level: 8,
          experience: 80,
          evolutionLevel: 9,
          image: 'assets/bosses/pokemon/Kabuto.jpg',
          locked: false,
        },
        {
          id: 2222,
          commonId: 22,
          name: 'Kabutops',
          currentHealth: 50,
          maxHealth: 50,
          attack: 12,
          level: 9,
          experience: 0,
          image: 'assets/bosses/pokemon/Kabutops.png',
          locked: true,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeId: 1,
      image: 'assets/bosses/trainers/Brock.jpg',
    },
  ]);
}
