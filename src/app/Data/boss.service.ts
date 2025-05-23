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
          attack: 4,
          level: 5,
          experience: 0,
          image: 'assets/bosses/pokemon/Geodude.jpg',
          locked: false,
        },
        {
          id: 21,
          commonId: 21,
          name: 'Onix',
          currentHealth: 30,
          maxHealth: 30,
          attack: 4,
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Onix.jpg',
          locked: false,
        },
        {
          id: 22,
          commonId: 22,
          name: 'Kabuto',
          currentHealth: 40,
          maxHealth: 40,
          attack: 2,
          level: 9,
          experience: 0,
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
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Kabutops.jpg',
          locked: true,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 0,
      image: 'assets/bosses/trainers/Brock.jpg',
      encounterCount: 5,
      locked: false,
    },
    {
      difficulty: 2,
      bossName: 'Misty',
      pokemon: [
        {
          id: 30,
          commonId: 30,
          name: 'Goldeen',
          currentHealth: 40,
          maxHealth: 40,
          attack: 2,
          level: 5,
          experience: 0,
          image: 'assets/bosses/pokemon/Goldeen.jpg',
          locked: false,
        },
        {
          id: 3131,
          commonId: 31,
          name: 'Starmie',
          currentHealth: 50,
          maxHealth: 50,
          attack: 6,
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Starmie.jpg',
          locked: false,
        },
        {
          id: 32,
          commonId: 32,
          name: 'Psyduck',
          currentHealth: 40,
          maxHealth: 40,
          attack: 4,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/Psyduck.png',
          locked: false,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 1,
      image: 'assets/bosses/trainers/Misty.jpg',
      encounterCount: 5,
      locked: false,
    },
    {
      difficulty: 3,
      bossName: 'Lt. Surge',
      pokemon: [
        {
          id: 4040,
          commonId: 40,
          name: 'Electrode',
          currentHealth: 40,
          maxHealth: 40,
          attack: 5,
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Electrode.jpg',
          locked: false,
        },
        {
          id: 4141,
          commonId: 41,
          name: 'Raichu',
          currentHealth: 75,
          maxHealth: 75,
          attack: 9,
          level: 15,
          experience: 0,
          image: 'assets/bosses/pokemon/Raichu.jpg',
          locked: false,
        },
        {
          id: 42,
          commonId: 42,
          name: 'Electabuzz',
          currentHealth: 60,
          maxHealth: 60,
          attack: 10,
          level: 17,
          experience: 0,
          image: 'assets/bosses/pokemon/Electabuzz.png',
          locked: false,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 2,
      image: 'assets/bosses/trainers/Surge.jpg',
      encounterCount: 6,
      locked: true,
    },
    {
      difficulty: 4,
      bossName: 'Erika',
      pokemon: [
        {
          id: 50,
          commonId: 50,
          name: 'Tangela',
          currentHealth: 60,
          maxHealth: 60,
          attack: 3,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/Tangela.jpg',
          locked: false,
        },
        {
          id: 515151,
          commonId: 51,
          name: 'Vileplume',
          currentHealth: 90,
          maxHealth: 90,
          attack: 3,
          level: 16,
          experience: 0,
          image: 'assets/bosses/pokemon/Vileplume.jpg',
          locked: false,
        },
        {
          id: 5252,
          commonId: 52,
          name: 'Weepinbell',
          currentHealth: 60,
          maxHealth: 60,
          attack: 3,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/Weepinbell.png',
          locked: false,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 3,
      image: 'assets/bosses/trainers/Erika.jpg',
      encounterCount: 6,
      locked: true,
    },
    {
      difficulty: 5,
      bossName: 'Koga',
      pokemon: [
        {
          id: 6060,
          commonId: 60,
          name: 'Muk',
          currentHealth: 25,
          maxHealth: 25,
          attack: 3,
          level: 5,
          experience: 0,
          image: 'assets/bosses/pokemon/Muk.jpg',
          locked: false,
        },
        {
          id: 6161,
          commonId: 61,
          name: 'Venomoth',
          currentHealth: 50,
          maxHealth: 50,
          attack: 5,
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Venomoth.png',
          locked: false,
        },
        {
          id: 6262,
          commonId: 62,
          name: 'Weezing',
          currentHealth: 40,
          maxHealth: 40,
          attack: 2,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/Weezing.jpg',
          locked: false,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 4,
      image: 'assets/bosses/trainers/Koga.jpg',
      encounterCount: 7,
      locked: true,
    },
    {
      difficulty: 6,
      bossName: 'Sabrina',
      pokemon: [
        {
          id: 7070,
          commonId: 70,
          name: 'Hypno',
          currentHealth: 25,
          maxHealth: 25,
          attack: 3,
          level: 5,
          experience: 0,
          image: 'assets/bosses/pokemon/Hypno.jpg',
          locked: false,
        },
        {
          id: 717171,
          commonId: 71,
          name: 'Alakazam',
          currentHealth: 50,
          maxHealth: 50,
          attack: 5,
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Alakazam.jpg',
          locked: false,
        },
        {
          id: 72,
          commonId: 72,
          name: 'Mr. Mime',
          currentHealth: 40,
          maxHealth: 40,
          attack: 2,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/MrMime.jpg',
          locked: false,
        },
        {
          id: 71717171,
          commonId: 71,
          name: 'Mega Alakazam',
          currentHealth: 40,
          maxHealth: 40,
          attack: 2,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/MegaAlakazam.jpg',
          locked: true,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 5,
      image: 'assets/bosses/trainers/Sabrina.jpg',
      encounterCount: 7,
      locked: true,
    },
    {
      difficulty: 7,
      bossName: 'Blaine',
      pokemon: [
        {
          id: 8080,
          commonId: 80,
          name: 'Arcanine',
          currentHealth: 25,
          maxHealth: 25,
          attack: 3,
          level: 5,
          experience: 0,
          image: 'assets/bosses/pokemon/Arcanine.jpg',
          locked: false,
        },
        {
          id: 81,
          commonId: 81,
          name: 'Magmar',
          currentHealth: 50,
          maxHealth: 50,
          attack: 5,
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Magmar.jpg',
          locked: false,
        },
        {
          id: 8282,
          commonId: 82,
          name: 'Ninetales',
          currentHealth: 40,
          maxHealth: 40,
          attack: 2,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/Ninetales.jpg',
          locked: false,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 6,
      image: 'assets/bosses/trainers/Blaine.jpg',
      encounterCount: 7,
      locked: true,
    },
    {
      difficulty: 8,
      bossName: 'Giovanni',
      pokemon: [
        {
          id: 9090,
          commonId: 90,
          name: 'Dugtrio',
          currentHealth: 25,
          maxHealth: 25,
          attack: 3,
          level: 5,
          experience: 0,
          image: 'assets/bosses/pokemon/Dugtrio.jpg',
          locked: false,
        },
        {
          id: 919191,
          commonId: 91,
          name: 'Nidoking',
          currentHealth: 50,
          maxHealth: 50,
          attack: 5,
          level: 10,
          experience: 0,
          image: 'assets/bosses/pokemon/Nidoking.jpg',
          locked: false,
        },
        {
          id: 9292,
          commonId: 92,
          name: 'Rhydon',
          currentHealth: 40,
          maxHealth: 40,
          attack: 2,
          level: 12,
          experience: 0,
          image: 'assets/bosses/pokemon/Rhydon.jpg',
          locked: false,
        },
        {
          id: 93,
          commonId: 93,
          name: 'Mewtwo',
          currentHealth: 150,
          maxHealth: 150,
          attack: 20,
          level: 30,
          experience: 0,
          image: 'assets/bosses/pokemon/Mewtwo.jpg',
          locked: true,
        },
      ],
      hiddenItems: ['', ''],
      heldBadgeIndex: 7,
      image: 'assets/bosses/trainers/Giovanni.jpg',
      encounterCount: 3,
      locked: true,
    },
  ]);
}
