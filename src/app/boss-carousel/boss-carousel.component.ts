import { Component, computed, signal, WritableSignal } from '@angular/core';
import { HelperService } from '../Services/helper.service';
import { BossService } from '../Services/boss.service';
import { Boss } from '../Models/boss.model';
import { EncounterService } from '../Services/encounter.service';

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
}
