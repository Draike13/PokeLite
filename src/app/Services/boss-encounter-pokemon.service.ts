import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { EncounterService } from './encounter.service';
import { HelperService } from './helper.service';
import { Pokemon } from '../Models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class BossEncounterPokemonService {
  constructor(
    private encounterService: EncounterService,
    private helperService: HelperService
  ) {
    console.log('hello');
    this.watch();
  }

  // currentView: WritableSignal<'empty' | 'active'> = signal('empty');

  activePokemon: WritableSignal<Pokemon[]> = signal([]);

  // bossAttack: WritableSignal<number> = signal(0);
  // bossMaxHealth: WritableSignal<number> = signal(0);
  // bossCurrentHealth: WritableSignal<number> = signal(0);
  // bossExp: WritableSignal<number> = signal(0);
  // bossPokemonName: WritableSignal<string> = signal('');
  // bossPokemonImage: WritableSignal<string> = signal('');
  // bossLevel: WritableSignal<number> = signal(0);

  watch() {
    console.log('hello');
  }
  startBattle = effect(() => {
    if (this.encounterService.bossBattleStart() === true) {
      console.log('test');
      this.setActive();
    }
  });
  // buildCard = effect(() => {
  //   if (this.activePokemon()) {
  //     this.currentView.set('active');
  //     this.buildBattleCard();
  //   }
  // });

  // kill = effect(() => {
  //   if (this.currentView() === 'active') {
  //     if (this.bossCurrentHealth() === 0) {
  //       this.activePokemon.set(null);
  //       this.currentView.set('empty');
  //       this.encounterService.victoryLeft.set(true);
  //     }
  //   }
  // });

  setActive() {
    this.activePokemon.set(this.encounterService.activeBoss()!.pokemon);
    console.log(this.activePokemon());
  }
}

// buildBattleCard() {
//   this.bossAttack.set(this.activePokemon()!.attack);
//   this.bossMaxHealth.set(this.activePokemon()!.maxHealth);
//   this.bossCurrentHealth.set(this.activePokemon()!.currentHealth);
//   this.bossExp.set(this.activePokemon()!.experience);
//   this.bossPokemonName.set(this.activePokemon()!.name);
//   this.bossPokemonImage.set(this.activePokemon()!.image);
//   this.bossLevel.set(this.activePokemon()!.level);
// }
// attack() {
//   if (this.bossCurrentHealth() > 0) {
//     this.bossCurrentHealth.set(
//       this.bossCurrentHealth() - this.helperService.playerAttack()
//     );
//   }
//   if (this.bossCurrentHealth() <= 0) {
//     this.bossCurrentHealth.set(0);
//   }
// }
