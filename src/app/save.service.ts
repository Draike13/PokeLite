import { Injectable } from '@angular/core';
import { SaveFile } from './save.model';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class SaveService {
  private readonly SAVE_KEY = 'gameSaves';

  constructor(private pokemonService: PokemonService) {
    this.initializeSaves();
  }

  private initializeSaves() {
    if (!localStorage.getItem(this.SAVE_KEY)) {
      const defaultSaves: SaveFile[] = [
        {
          slot: 1,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
        },
        {
          slot: 2,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
        },
        {
          slot: 3,
          playerName: 'New Game',
          pokemonData: this.pokemonService.pokemon(),
        },
      ];
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(defaultSaves));
    }
  }

  getSaves() {
    return JSON.parse(localStorage.getItem(this.SAVE_KEY)!) || [];
  }

  saveGame(updatedSave: SaveFile) {
    console.log('saved');
  }
}
