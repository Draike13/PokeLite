import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HelperService } from '../helper.service';
import { Pokemon } from '../pokemon.model';
@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private helperService: HelperService) {}

  playerName = '';

  get pokemonList() {
    return this.helperService.pokemonList();
  }
  playPokemon(pokemon: Pokemon) {
    this.helperService.activePokemon.set(pokemon);
    this.playerName = "Trevor's";
  }
  get pokemonName() {
    return this.helperService.playerName;
  }
}
