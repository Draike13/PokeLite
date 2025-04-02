import { Pokemon } from './pokemon.model';
import { Badge } from './badge.model';

export interface SaveFile {
  slot: number;
  playerName: string;
  pokemonData: Pokemon[];
  badges: Badge[];
}
