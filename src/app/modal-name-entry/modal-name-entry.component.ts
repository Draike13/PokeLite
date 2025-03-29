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
import { HelperService } from '../helper.service';
import { Pokemon } from '../pokemon.model';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
    private dialogRef: MatDialogRef<ModalNameEntryComponent>
  ) {}
  data = inject(MAT_DIALOG_DATA);

  playPokemon(pokemon: Pokemon, name: string) {
    if (name.length >= 3) {
      this.helperService.activePokemon.set(pokemon);
      this.helperService.playerName.set(`${name}'s`);
      this.dialogRef.close();
    }
  }
}
