import {
  Component,
  effect,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../Services/helper.service';
import { SaveService } from '../Services/save.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalNameEntryComponent } from '../Modals/modal-name-entry/modal-name-entry.component';
import { ModalPokemonSelectComponent } from '../Modals/modal-pokemon-select/modal-pokemon-select.component';
import { SaveFile } from '../Models/save.model';
import { Pokemon } from '../Models/pokemon.model';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { Rank } from '../Models/rank.model';
import { Boss } from '../Models/boss.model';
import { BossService } from '../Services/boss.service';
import { EncounterService } from '../Services/encounter.service';
import { PokemonCarouselComponent } from '../pokemon-carousel/pokemon-carousel.component';

@Component({
  selector: 'app-content-box',
  imports: [
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    PokemonCarouselComponent,
  ],
  templateUrl: './content-box.component.html',
  styleUrl: './content-box.component.css',
})
export class ContentBoxComponent {
  get bossImage() {
    return this.encounterService.activeBoss()!.image;
  }
  get bossBadgeImage() {
    return this.helperService.activeSave()!.badges[
      this.encounterService.activeBoss()!.heldBadgeIndex
    ].badgeImage;
  }

  bossTaunt() {
    if (this.encounterService.activeBoss()!.difficulty === 1) {
      return 'Brock: Good luck ever reaching me!';
    }
    if (this.encounterService.activeBoss()!.difficulty === 2) {
      return 'Misty: You really think you can swim that far? Hope you dont drown!';
    } else return 'something broke, oh no!';
  }
  pokeballBlank = 'assets/ranks/Pokeball-blank.png';
  currentView: WritableSignal<
    | 'saves'
    | 'blurb'
    | 'nameEntry'
    | 'pokemonSelection'
    | 'battleSelect'
    | 'battlePath'
    | 'pathBoss'
    | 'victory'
  > = signal('blurb');

  get selectedSave() {
    return this.helperService.activeSave;
  }

  sortBosses() {
    return this.bossService.Bosses();
  }

  constructor(
    private dialog: MatDialog,
    private saveService: SaveService,
    private helperService: HelperService,
    private bossService: BossService,
    private encounterService: EncounterService
  ) {}

  routeCounter: WritableSignal<number> = signal(0);

  activeCheck = effect(() => {
    if (this.helperService.activePokemon()) {
      this.currentView.set('battleSelect');
    }
  });

  bossCheck = effect(() => {
    if (this.encounterService.activeBoss()) {
      this.currentView.set('battlePath');
    }
  });

  routeCheck = effect(() => {
    if (this.encounterService.activeBoss()) {
      if (
        this.routeCounter() ===
        this.encounterService.activeBoss()!.encounterCount
      ) {
        this.encounterService.bossBattleStart.set(true);
        this.routeCounter.set(0);
        if (this.encounterService.bossBattleStart() === true) {
          this.currentView.set('pathBoss');
        }
      }
    }
  });

  increaseRouteCount() {
    this.routeCounter.set(this.routeCounter() + 1);
  }

  selectRoute(boss: Boss) {
    this.encounterService.setBoss(boss);
  }

  pokemonList() {
    return this.helperService.pokemonList();
  }

  displaySaveFiles() {
    this.currentView.set('saves');
  }
  handleSaveClick(save: SaveFile) {
    this.helperService.activeSave.set(save);
    if (this.helperService.activeSave()!.playerName === 'New Game') {
      this.openNameModal();
    } else if (this.helperService.activeSave()!.playerName !== 'New Game') {
      this.helperService.buildTrainerCard();
    }
  }

  saveFiles() {
    return this.saveService.getSaves();
  }

  openNameModal() {
    const dialogRef = this.dialog.open(ModalNameEntryComponent, {
      data: { selectedSave: this.selectedSave },
      height: '24vh',
      width: '48vw',
      position: {
        top: '8vh',
      },
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.selectedSave()!.playerName = result;
        this.currentView.set('saves');
      }
    });
  }

  previewPokeList(save: SaveFile) {
    return this.saveService.previewPokemonList(save);
  }
  previewRank(save: SaveFile) {
    let currentRank: Rank;
    save.rank.forEach((eachRank) => {
      if (eachRank.current === true) {
        currentRank = eachRank;
      }
    });
    return currentRank!.rankImage;
  }

  sortBadges(save: SaveFile) {
    let badges: { badgeId: number; badgeName: string; badgeImage: string }[] =
      [];
    save.badges.forEach((eachBadge) => {
      if (eachBadge.acquired === true) {
        badges!.push({
          badgeId: eachBadge.badgeId,
          badgeName: eachBadge.badgeName,
          badgeImage: eachBadge.badgeImage,
        });
      } else {
        badges!.push({
          badgeId: eachBadge.badgeId,
          badgeName: eachBadge.badgeName,
          badgeImage: eachBadge.badgeImageBlank,
        });
      }
    });
    return badges;
  }

  displayPokemonList() {
    this.currentView.set('pokemonSelection');
  }

  changeToVictory = effect(() => {
    if (this.encounterService.playerWin() === true) {
      this.currentView.set('victory');
      setTimeout(() => {
        this.encounterService.setBoss(null);
        this.encounterService.playerWin.set(false);
        this.helperService.cleanup();
        this.currentView.set('pokemonSelection');
      }, 4000);
    }
  });
}
