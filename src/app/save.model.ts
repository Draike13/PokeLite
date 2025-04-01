import { Pokemon } from './pokemon.model';

export interface SaveFile {
  slot: number;
  playerName: string;
  pokemonData: Pokemon[];
}
