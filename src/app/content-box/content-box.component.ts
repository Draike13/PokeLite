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

  ngAfterViewInit() {
    this.handleSaveClick(0);
  }

  pokemonList() {
    return this.helperService.pokemonList();
  }

  displaySaveFiles() {
    this.currentView.set('saves');
  }
  handleSaveClick(event: number) {
    const selectedSave = this.saveFiles()[event];
    this.selectedSave?.set(selectedSave);
    if (selectedSave.playerName === 'New Game') {
      this.openNameModal();
    } else if (selectedSave.playerName !== 'New Game') {
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
}
