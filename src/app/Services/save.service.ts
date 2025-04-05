import { Injectable } from '@angular/core';
import { SaveFile } from '../Models/save.model';
import { PokemonService } from '../Data/pokemon.service';
import { BadgesService } from '../Data/badges.service';
import { RankService } from '../Data/rank.service';

@Injectable({
  providedIn: 'root',
})
export class SaveService {
  private readonly SAVE_KEY = 'gameSaves';

  constructor(
    private pokemonService: PokemonService,
    private badgesService: BadgesService,
    private rankService: RankService
  ) {
    this.initializeSaves();
  }

  private initializeSaves() {
    if (!localStorage.getItem(this.SAVE_KEY)) {
      const defaultSaves: SaveFile[] = [
        {
          slot: 1,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
          badges: this.badgesService.badges(),
          rank: this.rankService.ranks(),
        },
        {
          slot: 2,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
          badges: this.badgesService.badges(),
          rank: this.rankService.ranks(),
        },
        {
          slot: 3,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
          badges: this.badgesService.badges(),
          rank: this.rankService.ranks(),
        },
      ];
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(defaultSaves));
    }
  }

  getSaves() {
    return JSON.parse(localStorage.getItem(this.SAVE_KEY)!) || [];
  }

  saveGame(updatedSave: SaveFile) {
    let storedSaves = this.getSaves();
    storedSaves[updatedSave.slot - 1] = updatedSave;

    localStorage.setItem(this.SAVE_KEY, JSON.stringify(storedSaves));
  }

  previewPokemonList(save: SaveFile) {
    return save.pokemonData.filter((eachPokemon) => !eachPokemon.locked);
  }
}
