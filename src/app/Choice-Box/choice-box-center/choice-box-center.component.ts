import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { BattleService } from '../../Services/battle.service';
import { PokemonService } from '../../Services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-choice-box-center',
  imports: [MatCardModule, MatButtonModule, FormsModule, MatInputModule],
  templateUrl: './choice-box-center.component.html',
  styleUrl: './choice-box-center.component.css',
})
export class ChoiceBoxCenterComponent {
  constructor(
    private helperService: HelperService,
    private battleService: BattleService,
    private pokemonService: PokemonService
  ) {}

  megaStone: boolean = false;
  giveExp() {
    this.battleService.giveExp();
  }
  takeDamage() {
    this.battleService.takeDamage();
  }
  heal() {
    this.battleService.recoverHealth();
  }
  unlock() {
    this.pokemonService.pokemon().forEach((eachPokemon) => {
      if (eachPokemon.id === 4) {
        eachPokemon.locked = false;
      }
    });
  }
  level() {
    this.battleService.gainLevel();
  }
  megaEvolve() {
    if (
      this.helperService.activePokemon()!.id ===
        Number(
          `${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}`
        ) &&
      this.megaStone === true
    ) {
      let currentLevel = this.helperService.playerLevel();
      this.helperService.fullPokeList().forEach((eachPokemon) => {
        if (
          eachPokemon.id ===
          Number(
            `${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}`
          )
        ) {
          this.helperService.activePokemon.set(eachPokemon);
          setTimeout(() => {
            this.helperService.playerLevel.set(currentLevel);
          });
        }
      });
    }
  }
  acquireBadgeNumber?: number;

  gainBadge() {
    this.battleService.gainBadge(this.acquireBadgeNumber!);
  }

  aquireStone() {
    return (this.megaStone = true);
  }
}
