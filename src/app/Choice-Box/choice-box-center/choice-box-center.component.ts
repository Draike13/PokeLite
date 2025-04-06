import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { BattleService } from '../../Services/battle.service';
import { PokemonService } from '../../Data/pokemon.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EncounterService } from '../../Services/encounter.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';
import { BossEncounterPokemonService } from '../../Services/boss-encounter-pokemon.service';

@Component({
  selector: 'app-choice-box-center',
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    NgStyle,
  ],
  templateUrl: './choice-box-center.component.html',
  styleUrl: './choice-box-center.component.css',
})
export class ChoiceBoxCenterComponent {
  constructor(
    private helperService: HelperService,
    private battleService: BattleService,
    private pokemonService: PokemonService,
    private encounterService: EncounterService,
    private bossEncounterPokemonService: BossEncounterPokemonService
  ) {}

  // megaStone: boolean = false;
  // giveExp() {
  //   this.battleService.giveExp();
  // }
  // takeDamage() {
  //   this.battleService.takeDamage();
  // }
  // heal() {
  //   this.battleService.recoverHealth();
  // }
  // unlock() {
  //   this.pokemonService.pokemon().forEach((eachPokemon) => {
  //     if (eachPokemon.id === 4) {
  //       eachPokemon.locked = false;
  //     }
  //   });
  // }
  // level() {
  //   this.battleService.gainLevel();
  // }
  // megaEvolve() {
  //   if (
  //     this.helperService.activePokemon()!.id ===
  //       Number(
  //         `${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}`
  //       ) &&
  //     this.megaStone === true
  //   ) {
  //     let currentLevel = this.helperService.playerLevel();
  //     this.helperService.fullPokeList().forEach((eachPokemon) => {
  //       if (
  //         eachPokemon.id ===
  //         Number(
  //           `${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}${this.helperService.pokemonBaseId}`
  //         )
  //       ) {
  //         this.helperService.activePokemon.set(eachPokemon);
  //         setTimeout(() => {
  //           this.helperService.playerLevel.set(currentLevel);
  //         });
  //       }
  //     });
  //   }
  // }
  // acquireBadgeNumber?: number;

  // gainBadge() {
  //   this.battleService.gainBadge(this.acquireBadgeNumber!);
  // }

  // aquireStone() {
  //   return (this.megaStone = true);
  // }

  // goUpRank() {
  //   return this.battleService.increaseRank();
  // }

  currentView() {
    return this.bossEncounterPokemonService.centerView();
  }
  bossPokemonImage() {
    return this.bossEncounterPokemonService.centerContainerPokemonImage();
  }
  bossPokemonName() {
    return this.bossEncounterPokemonService.centerContainerPokemonName();
  }
  bossCurrentHealth() {
    return this.bossEncounterPokemonService.centerContainerCurrentHealth();
  }
  bossLevel() {
    return this.bossEncounterPokemonService.centerContainerLevel();
  }
  bossAttack() {
    return this.bossEncounterPokemonService.centerContainerAttack();
  }
  bossExp() {
    return this.bossEncounterPokemonService.centerContainerExp();
  }

  attack() {
    return this.bossEncounterPokemonService.attackCenter();
  }
}
