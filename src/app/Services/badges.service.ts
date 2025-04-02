import { Injectable, signal, WritableSignal } from '@angular/core';
import { Badge } from '../Models/badge.model';

@Injectable({
  providedIn: 'root',
})
export class BadgesService {
  badges: WritableSignal<Badge[]> = signal([
    {
      badgeId: 1,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
    {
      badgeId: 2,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
    {
      badgeId: 3,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
    {
      badgeId: 4,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
    {
      badgeId: 5,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
    {
      badgeId: 6,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
    {
      badgeId: 7,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
    {
      badgeId: 8,
      badgeName: '',
      badgeImage: '',
      acquired: false,
    },
  ]);
}
