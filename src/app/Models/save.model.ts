import { Pokemon } from './pokemon.model';
import { Badge } from './badge.model';
import { Rank } from './rank.model';

export interface SaveFile {
  slot: number;
  playerName: string;
  pokemonData: Pokemon[];
  badges: Badge[];
  rank: Rank[];
}
