import { Component, computed, signal, WritableSignal } from '@angular/core';
import { HelperService } from '../Services/helper.service';
import { Pokemon } from '../Models/pokemon.model';
import { ModalPokemonSelectComponent } from '../Modals/modal-pokemon-select/modal-pokemon-select.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-carousel',
  imports: [],
  templateUrl: './pokemon-carousel.component.html',
  styleUrl: './pokemon-carousel.component.css',
})
export class PokemonCarouselComponent {
  constructor(
    private helperService: HelperService,
    private dialog: MatDialog
  ) {}

  pokemonList() {
    return this.helperService.pokemonList();
  }

  currentIndex: WritableSignal<number> = signal(0);

  selectedPokemon = computed(() => this.pokemonList()[this.currentIndex()]);

  rotateLeft() {
    const length = this.pokemonList().length;
    this.currentIndex.set((this.currentIndex() - 1 + length) % length);
  }
  rotateRight() {
    const length = this.pokemonList().length;
    this.currentIndex.set((this.currentIndex() + 1) % length);
  }

  get current() {
    return this.selectedPokemon();
  }
  get prev() {
    const list = this.pokemonList();
    return list[(this.currentIndex() - 1 + list.length) % list.length];
  }
  get next() {
    const list = this.pokemonList();
    return list[(this.currentIndex() + 1) % list.length];
  }

  openPokemonModal(currentPokemon: Pokemon) {
    this.dialog.open(ModalPokemonSelectComponent, {
      data: { pokemon: currentPokemon },
      height: '24vh',
      width: '48vw',
      position: {
        top: '8vh',
      },
    });
  }
}
