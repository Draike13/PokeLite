import {
  Component,
  computed,
  effect,
  signal,
  WritableSignal,
} from '@angular/core';
import { HelperService } from '../Services/helper.service';
import { BossService } from '../Services/boss.service';
import { Boss } from '../Models/boss.model';
import { EncounterService } from '../Services/encounter.service';
import { Badge } from '../Models/badge.model';

@Component({
  selector: 'app-boss-carousel',
  imports: [],
  templateUrl: './boss-carousel.component.html',
  styleUrl: './boss-carousel.component.css',
})
export class BossCarouselComponent {
  constructor(
    private encounterService: EncounterService,
    private bossService: BossService,
    private helperService: HelperService
  ) {}
  ngOnInit() {
    this.sortBadges();
  }
  badgeCount = 0;
  activeRoutes = effect(() => {
    if (this.helperService.activePokemon()) {
      if (this.badgeCount >= 7) {
        this.bossList().forEach((boss) => {
          if (boss.difficulty <= 8) {
            boss.locked = false;
          }
        });
      }
      if (this.badgeCount >= 6) {
        this.bossList().forEach((boss) => {
          if (boss.difficulty <= 7) {
            boss.locked = false;
          }
        });
      }
      if (this.badgeCount >= 4) {
        this.bossList().forEach((boss) => {
          if (boss.difficulty <= 6) {
            boss.locked = false;
          }
        });
      }
      if (this.badgeCount >= 2) {
        this.bossList().forEach((boss) => {
          if (boss.difficulty <= 4) {
            boss.locked = false;
          }
        });
      }
    }
  });

  bossList() {
    return this.bossService.Bosses();
  }

  setBossRoute(boss: Boss) {
    this.encounterService.setBoss(boss);
  }
  currentIndex: WritableSignal<number> = signal(0);

  selectedBoss = computed(() => this.bossList()[this.currentIndex()]);

  rotateLeft() {
    const length = this.bossList().length;
    this.currentIndex.set((this.currentIndex() - 1 + length) % length);
  }
  rotateRight() {
    const length = this.bossList().length;
    this.currentIndex.set((this.currentIndex() + 1) % length);
  }

  get current() {
    return this.selectedBoss();
  }
  get prev() {
    const list = this.bossList();
    return list[(this.currentIndex() - 1 + list.length) % list.length];
  }
  get next() {
    const list = this.bossList();
    return list[(this.currentIndex() + 1) % list.length];
  }

  badges: { badgeId: number; badgeName: string; badgeImage: string }[] = [];

  sortBadges() {
    this.helperService.playerBadges().forEach((eachBadge) => {
      if (eachBadge.acquired === true) {
        this.badges!.push({
          badgeId: eachBadge.badgeId,
          badgeName: eachBadge.badgeName,
          badgeImage: eachBadge.badgeImage,
        });
        this.badgeCount++;
      } else {
        this.badges!.push({
          badgeId: eachBadge.badgeId,
          badgeName: eachBadge.badgeName,
          badgeImage: eachBadge.badgeImageBlank,
        });
      }
    });
  }
}
