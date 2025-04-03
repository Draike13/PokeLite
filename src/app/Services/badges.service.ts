import { Injectable, signal, WritableSignal } from '@angular/core';
import { Badge } from '../Models/badge.model';

@Injectable({
  providedIn: 'root',
})
export class BadgesService {
  badges: WritableSignal<Badge[]> = signal([
    {
      badgeId: 1,
      badgeName: 'Boulder',
      badgeImage: 'assets/badges/Boulder.png',
      badgeImageBlank: 'assets/badges/Boulder-blank.png',
      acquired: false,
    },
    {
      badgeId: 2,
      badgeName: 'Cascade',
      badgeImage: 'assets/badges/Cascade.png',
      badgeImageBlank: 'assets/badges/Cascade-blank.png',
      acquired: false,
    },
    {
      badgeId: 3,
      badgeName: 'Thunder',
      badgeImage: 'assets/badges/Thunder.png',
      badgeImageBlank: 'assets/badges/Thunder-blank.png',
      acquired: false,
    },
    {
      badgeId: 4,
      badgeName: 'Rainbow',
      badgeImage: 'assets/badges/Rainbow.png',
      badgeImageBlank: 'assets/badges/Rainbow-blank.png',
      acquired: false,
    },
    {
      badgeId: 5,
      badgeName: 'Soul',
      badgeImage: 'assets/badges/Soul.png',
      badgeImageBlank: 'assets/badges/Soul-blank.png',
      acquired: false,
    },
    {
      badgeId: 6,
      badgeName: 'Marsh',
      badgeImage: 'assets/badges/Marsh.png',
      badgeImageBlank: 'assets/badges/Marsh-blank.png',
      acquired: false,
    },
    {
      badgeId: 7,
      badgeName: 'Volcano',
      badgeImage: 'assets/badges/Volcano.png',
      badgeImageBlank: 'assets/badges/Volcano-blank.png',
      acquired: false,
    },
    {
      badgeId: 8,
      badgeName: 'Earth',
      badgeImage: 'assets/badges/Earth.png',
      badgeImageBlank: 'assets/badges/Earth-blank.png',
      acquired: false,
    },
  ]);
}
