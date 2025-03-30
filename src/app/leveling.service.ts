import { effect, Injectable } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class LevelingService {
  constructor(
    private pokemonService: PokemonService,
    private helperService: HelperService
  ) {}

  get level() {
    return this.helperService.playerLevel;
  }
  get firstEvoLevel() {
    return this.helperService.playerEvolutionLevel;
  }
}
