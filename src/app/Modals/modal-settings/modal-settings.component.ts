import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SaveService } from '../../Services/save.service';
import { SaveFile } from '../../Models/save.model';
import { PokemonService } from '../../Data/pokemon.service';
import { BadgesService } from '../../Data/badges.service';
import { RankService } from '../../Data/rank.service';

@Component({
  selector: 'app-modal-settings',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './modal-settings.component.html',
  styleUrl: './modal-settings.component.css',
})
export class ModalSettingsComponent {
  constructor(
    private pokemonService: PokemonService,
    private badgesService: BadgesService,
    private rankService: RankService,
    private saveService: SaveService,
    private dialogRef: MatDialogRef<ModalSettingsComponent>
  ) {}

  saveFiles() {
    return this.saveService.getSaves();
  }

  deleteSave(save: SaveFile) {
    this.saveService.saveGame({
      slot: save.slot,
      playerName: 'New Game',
      pokemonData: this.pokemonService.pokemon(),
      badges: this.badgesService.badges(),
      rank: this.rankService.ranks(),
    });
  }
}
