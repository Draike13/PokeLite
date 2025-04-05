import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { BattleService } from '../../Services/battle.service';
import { PokemonService } from '../../Services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EncounterService } from '../../Services/encounter.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';

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
    private encounterService: EncounterService
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

  goUpRank() {
    return this.battleService.increaseRank();
  }

  currentView: WritableSignal<'empty' | 'active'> = signal('empty');

  activePokemon: WritableSignal<Pokemon | null> = signal(null);

  bossAttack: WritableSignal<number> = signal(0);
  bossMaxHealth: WritableSignal<number> = signal(0);
  bossCurrentHealth: WritableSignal<number> = signal(0);
  bossExp: WritableSignal<number> = signal(0);
  bossPokemonName: WritableSignal<string> = signal('');
  bossPokemonImage: WritableSignal<string> = signal('');
  bossLevel: WritableSignal<number> = signal(0);

  startBattle = effect(() => {
    if (this.encounterService.bossBattleStart() === true) {
      this.setActive();
    }
  });
  buildCard = effect(() => {
    if (this.activePokemon()) {
      this.currentView.set('active');
      this.buildBattleCard();
    }
  });

  kill = effect(() => {
    if (this.currentView() === 'active') {
      if (this.bossCurrentHealth() === 0) {
        this.activePokemon.set(null);
        this.currentView.set('empty');
        this.encounterService.victoryCenter.set(true);
      }
    }
  });

  setActive() {
    this.activePokemon.set(this.encounterService.activeBoss()!.pokemon[1]);
  }

  buildBattleCard() {
    this.bossAttack.set(this.activePokemon()!.attack);
    this.bossMaxHealth.set(this.activePokemon()!.maxHealth);
    this.bossCurrentHealth.set(this.activePokemon()!.currentHealth);
    this.bossExp.set(this.activePokemon()!.experience);
    this.bossPokemonName.set(this.activePokemon()!.name);
    this.bossPokemonImage.set(this.activePokemon()!.image);
    this.bossLevel.set(this.activePokemon()!.level);
  }
  attack() {
    if (this.bossCurrentHealth() > 0) {
      this.bossCurrentHealth.set(
        this.bossCurrentHealth() - this.helperService.playerAttack()
      );
    }
    if (this.bossCurrentHealth() <= 0) {
      this.bossCurrentHealth.set(0);
    }
  }
}
