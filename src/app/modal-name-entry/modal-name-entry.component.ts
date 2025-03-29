import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { HelperService } from '../helper.service';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-modal-name-entry',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './modal-name-entry.component.html',
  styleUrl: './modal-name-entry.component.css',
})
export class ModalNameEntryComponent {
  constructor(private helperService: HelperService) {}
  data = inject(MAT_DIALOG_DATA);

  playPokemon(pokemon: Pokemon) {
    this.helperService.activePokemon.set(pokemon);
    this.helperService.playerName.set("Trevor's");
  }
}
