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
  userName = '';
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
  playPokemon(pokemon: Pokemon, name: string) {
    if (name.length >= 3) {
      this.helperService.activePokemon.set(pokemon);
      this.helperService.playerName.set(`${name}'s`);
      this.helperService.pokemonBaseId = pokemon.commonId;
      this.dialogRef.close();
    }
  }
  refusal(pokemon: Pokemon) {
    if (pokemon.id === 1) {
      this.specialService.bRefusal.set(true);
    } else if (pokemon.id === 2) {
      this.specialService.cRefusal.set(true);
    } else if (pokemon.id === 3) {
      this.specialService.sRefusal.set(true);
    }
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
  specialUnlock = effect(() => {
    if (this.refusalCount() === 3) {
      setTimeout(() => {
        this.pokemonService.pokemon().forEach((eachPokemon) => {
          if (eachPokemon.id === 4) eachPokemon.locked = false;
        });
      });
    }
  });
}
