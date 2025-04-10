import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { RandomEncounter } from '../Models/random-encounter.model';
import { HelperService } from '../Services/helper.service';

@Injectable({
  providedIn: 'root',
})
export class RandomEcounterService {
  constructor(private helperService: HelperService) {
    effect(() => {
      const activePokemon = this.helperService.playerPokemonName();
      if (activePokemon) {
        this.knownEncounters.set([
          {
            id: 1,
            name: 'Pokemon Center',
            description: `Restore some of your Pokemon's health!`,
            image: '',
            reward: `${activePokemon} recovers some of its health!`,
            hidden: false,
          },
          {
            id: 2,
            name: 'PokeMart',
            description: `Alright! You picked up a new TM at the PokeMart. This is a great new move!`,
            image: '',
            reward: `${activePokemon} feels stronger than before.`,
            hidden: false,
          },
        ]);

        this.hiddenEncounters.set([
          {
            id: 1,
            name: 'Wild Spearow Attack!',
            description: `A group of wild Spearow's suddenly fly out of a nearby tree. You must have disturbed their nest!`,
            image: '',
            reward: `You shouldn't be seeing this........what have you done????!?!?!?!!@!@!$#!$!$!#@!1121!`,
            failure: `${activePokemon} took a little damage while fighting off the attacking Spearows... at least you got away!`,
            hidden: true,
          },
        ]);

        this.expEncounters.set([
          {
            id: 1,
            name: 'Youngster Joey',
            description: `Youngster Joey challenges you to a battle! His Rattata looks fierce...`,
            image: '',
            reward: `You knocked out Joey's Rattata. Your ${activePokemon} feels stronger!`,
            failure: `Oh no! Joey's Rattata got the best of ${activePokemon}. That hurt...`,
            hidden: false,
          },
          {
            id: 2,
            name: 'Shorts Boy',
            description: `Shorts Boy challenges you to a battle!`,
            image: '',
            reward: `${activePokemon} defeated Shorts Boy! I guess shorts aren't THAT powerful, huh?`,
            failure: `Oh no; the shorts were too strong after all!`,
            hidden: false,
          },
          {
            id: 3,
            name: 'A Shaking Bush',
            description: `You notice a bush on the side of the road move; do you investigate it?`,
            image: '',
            reward: `You start to investigate and are ambushed by a [--random pokemon here--]. Luckily ${activePokemon} was able to defeat it. `,
            failure: `As you start to investigate, you are ambushed by a [--Random pokemon here--] and have to run. ${activePokemon} is hurt defending you.`,
            hidden: false,
          },
          {
            id: 4,
            name: 'Stop Team Rocket!',
            description: `You see a Team Rocket grunt fleeing from a trainer. Maybe you can stop them from getting away?`,
            image: '',
            reward: `You catch up to the grunt and get back the stolen pokemon! What a good days work.`,
            failure: `You try to catch up, but are just too slow. Team Rocket got away!`,
            hidden: false,
          },
        ]);
      }
    });
  }

  knownEncounters: WritableSignal<RandomEncounter[]> = signal([]);
  hiddenEncounters: WritableSignal<RandomEncounter[]> = signal([]);
  expEncounters: WritableSignal<RandomEncounter[]> = signal([]);
}
