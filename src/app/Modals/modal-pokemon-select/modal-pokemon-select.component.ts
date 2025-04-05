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
import { HelperService } from '../../Services/helper.service';
import { Pokemon } from '../../Models/pokemon.model';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SpecialService } from '../../Services/special.service';
import { PokemonService } from '../../Data/pokemon.service';
@Component({
  selector: 'app-modal-pokemon-select',
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
  templateUrl: './modal-pokemon-select.component.html',
  styleUrl: './modal-pokemon-select.component.css',
})
export class ModalPokemonSelectComponent {
  constructor(
    private pokemonService: PokemonService,
    private specialService: SpecialService,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<ModalPokemonSelectComponent>
  ) {
    this.countTracker();
  }
  data = inject(MAT_DIALOG_DATA);

  refusalText = '';

  get refusalCount() {
    return this.specialService.refusalCount;
  }
  refusal(pokemon: Pokemon) {
    return this.specialService.refusal(pokemon);
  }
  startGame(pokemon: Pokemon) {
    this.helperService.activePokemon.set(pokemon);
    this.helperService.pokemonBaseId = pokemon.commonId;
    this.dialogRef.close();
  }

  countTracker() {
    if (this.refusalCount() < 2) {
      this.refusalText = 'On Second Thought...';
    } else if (this.refusalCount() === 2) {
      this.refusalText = 'Maybe You Just Need Something...Different?';
    } else if (this.refusalCount() > 2) {
      this.refusalText = 'On Second Thought...';
    }
    //add more logic to these to make it see WHICH pokemon have been checked
  }
}
