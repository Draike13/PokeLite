import { Component, effect, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../Services/helper.service';
import { EncounterService } from '../../Services/encounter.service';
import { Pokemon } from '../../Models/pokemon.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-choice-box-right',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './choice-box-right.component.html',
  styleUrl: './choice-box-right.component.css',
})
export class ChoiceBoxRightComponent {
  constructor(
    private helperService: HelperService,
    private encounterService: EncounterService
  ) {}
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
    if (this.bossCurrentHealth() === 0) {
      this.activePokemon.set(null);
      this.currentView.set('empty');
      this.encounterService.victoryRight.set(true);
    }
  });

  setActive() {
    this.activePokemon.set(this.encounterService.activeBoss()!.pokemon[2]);
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
