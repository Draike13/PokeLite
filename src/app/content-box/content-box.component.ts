import {
  Component,
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
  ],
  templateUrl: './content-box.component.html',
  styleUrl: './content-box.component.css',
})
export class ContentBoxComponent {
  currentView: WritableSignal<
    'saves' | 'blurb' | 'nameEntry' | 'pokemonSelection'
  > = signal('blurb');

  get selectedSave() {
    return this.helperService.activeSave;
  }

  constructor(
    private dialog: MatDialog,
    private saveService: SaveService,
    private helperService: HelperService
  ) {}

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
        this.currentView.set('pokemonSelection');
      }
    });
  }

  selectPokemon(selectedPokemon: Pokemon) {
    this.dialog.open(ModalPokemonSelectComponent, {
      data: { pokemon: selectedPokemon },
      height: '24vh',
      width: '48vw',
      position: {
        top: '8vh',
      },
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
}
