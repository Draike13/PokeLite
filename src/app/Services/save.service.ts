import { Injectable } from '@angular/core';
import { SaveFile } from '../Models/save.model';
import { PokemonService } from './pokemon.service';
import { BadgesService } from './badges.service';

@Injectable({
  providedIn: 'root',
})
export class SaveService {
  private readonly SAVE_KEY = 'gameSaves';

  constructor(
    private pokemonService: PokemonService,
    private badgesService: BadgesService
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
        },
        {
          slot: 2,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
          badges: this.badgesService.badges(),
        },
        {
          slot: 3,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
          badges: this.badgesService.badges(),
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
}
