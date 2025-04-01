import { Component, effect, inject, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HelperService } from '../../helper.service';
import { Pokemon } from '../../pokemon.model';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SpecialService } from '../../special.service';
import { PokemonService } from '../../pokemon.service';
import { SaveService } from '../../save.service';
import { SaveFile } from '../../save.model';

@Component({
  selector: 'app-modal-name-entry',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    FormsModule,
  ],
  templateUrl: './modal-name-entry.component.html',
  styleUrl: './modal-name-entry.component.css',
})
export class ModalNameEntryComponent {
  userName = '';
  constructor(
    private pokemonService: PokemonService,
    private specialService: SpecialService,
    private helperService: HelperService,
    private saveService: SaveService,
    private dialogRef: MatDialogRef<ModalNameEntryComponent>
  ) {}
  data = inject(MAT_DIALOG_DATA);

  setName(name: string) {
    if (name.length >= 3) {
      const saves = this.saveService.getSaves();
      const saveToUpdate = saves.find(
        (save: SaveFile) => save.slot === this.data.selectedSave.slot
      );
      if (saveToUpdate) {
        saveToUpdate.playerName = name;
        this.saveService.saveGame(saveToUpdate);
      }
    }
    this.dialogRef.close();
  }
}
