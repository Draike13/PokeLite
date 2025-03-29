import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HelperService } from '../helper.service';
import { Pokemon } from '../pokemon.model';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ModalNameEntryComponent } from '../modal-name-entry/modal-name-entry.component';
@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private helperService: HelperService) {}
  dialog = inject(MatDialog);

  get playerName() {
    return this.helperService.playerName;
  }
  get pokemonList() {
    return this.helperService.pokemonList();
  }
  get pokemonName() {
    return this.helperService.playerPokemonName;
  }

  openDialog(pokemon: Pokemon) {
    this.dialog.open(ModalNameEntryComponent, {
      data: { pokemon: pokemon },
      height: '15vh',
      width: '40vw',
      position: {
        top: '8vh',
      },
    });
  }
}
