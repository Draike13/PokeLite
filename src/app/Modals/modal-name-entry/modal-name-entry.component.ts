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
import { HelperService } from '../../helper.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SpecialService } from '../../special.service';
import { PokemonService } from '../../pokemon.service';
import { SaveService } from '../../save.service';

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
    this.dialogRef.close();
  }
}
