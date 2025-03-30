import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../helper.service';
import { BattleService } from '../battle.service';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-choice-box-center',
  imports: [MatCardModule, MatButtonModule],
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
      this.helperService.activePokemon()!.id === 222 &&
      this.megaStone === true
    ) {
      this.helperService.fullPokeList().forEach((eachPokemon) => {
        if (eachPokemon.id === 2222) {
          this.helperService.activePokemon.set(eachPokemon);
        }
      });
    }
  }

  aquireStone() {
    return (this.megaStone = true);
  }
}
