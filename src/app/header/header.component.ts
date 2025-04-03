import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HelperService } from '../Services/helper.service';
import { Pokemon } from '../Models/pokemon.model';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ModalPokemonSelectComponent } from '../Modals/modal-pokemon-select/modal-pokemon-select.component';
import { MatCardModule } from '@angular/material/card';
import { SpecialService } from '../Services/special.service';
import { ModalPlayerCardComponent } from '../Modals/modal-player-card/modal-player-card.component';
@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private helperService: HelperService,
    private specialService: SpecialService
  ) {}
  dialog = inject(MatDialog);

  get playerName() {
    return this.helperService.playerName;
  }
  get pokemonList() {
    return this.helperService.pokemonList;
  }
  get pokemonName() {
    return this.helperService.playerPokemonName;
  }

  special() {
    this.specialService.unlockEevee();
  }

  openPlayerCard() {
    this.dialog.open(ModalPlayerCardComponent, {
      height: 'min(50vh, 500px)',
      width: 'min(80vw, 700px)',
      maxWidth: '700px',
      position: {
        top: '16vh',
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
