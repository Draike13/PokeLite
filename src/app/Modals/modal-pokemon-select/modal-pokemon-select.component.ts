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
import { Pokemon } from '../../Models/pokemon.model';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SpecialService } from '../../Services/special.service';
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
    private specialService: SpecialService,
    private helperService: HelperService,
    private dialogRef: MatDialogRef<ModalPokemonSelectComponent>
  ) {}
  data = inject(MAT_DIALOG_DATA);

  startGame(pokemon: Pokemon) {
    this.helperService.activePokemon.set(pokemon);
    this.helperService.pokemonBaseId = pokemon.commonId;
    this.dialogRef.close();
  }

  setRefusal() {
    const id = this.data.pokemon.commonId;
    if (![1, 2, 3].includes(id)) return;
    const flag = this.specialService.refusalFlags[id as 1 | 2 | 3];
    if (flag()) return;
    flag.set(true);
    const refusedCount = Object.values(this.specialService.refusalFlags).filter(
      (flag) => flag()
    ).length;
    this.specialService.refusalCount.set(refusedCount);
    if (refusedCount === 3) {
      this.specialService.specialHoldoutId.set(null);
    }
    if (refusedCount === 2) {
      const remainingId = [1, 2, 3].find(
        (pid) => !this.specialService.refusalFlags[pid as 1 | 2 | 3]()
      );
      this.specialService.specialHoldoutId.set(remainingId ?? null);
    }
  }

  refusalText(pokemon: Pokemon): string {
    const id = pokemon.commonId;
    if (![1, 2, 3].includes(id)) return 'On Second Thought...';
    const flag = this.specialService.refusalFlags[id as 1 | 2 | 3];
    const isRefused = flag();
    const specialId = this.specialService.specialHoldoutId();
    if (!isRefused && specialId === id) {
      return 'Maybe You Just Need Something...Different?';
    }
    if (isRefused) {
      return 'On Second Thought...';
    }
    return 'On Second Thought...';
  }
}
