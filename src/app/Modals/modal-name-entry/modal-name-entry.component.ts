import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HelperService } from '../../Services/helper.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SpecialService } from '../../Services/special.service';
import { PokemonService } from '../../Data/pokemon.service';
import { SaveService } from '../../Services/save.service';

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
    private helperService: HelperService,
    private saveService: SaveService,
    private dialogRef: MatDialogRef<ModalNameEntryComponent>
  ) {}
  data = inject(MAT_DIALOG_DATA);

  setName(name: string) {
    if (name.length >= 3) {
      this.helperService.activeSave()!.playerName = name;
      this.saveService.saveGame(this.helperService.activeSave()!);
    }
    if (name.toLocaleLowerCase().trim() === 'draike') {
      this.helperService.activeSave()!.pokemonData.filter((lockedPokemon) => {
        if (lockedPokemon.locked === false) {
          lockedPokemon.locked = true;
          this.saveService.saveGame(this.helperService.activeSave()!);
        }
        if (
          lockedPokemon.id === 7 ||
          lockedPokemon.id === 8 ||
          lockedPokemon.id === 9
        ) {
          lockedPokemon.locked = false;
          this.saveService.saveGame(this.helperService.activeSave()!);
        }
      });
    }
    this.dialogRef.close();
  }
}
