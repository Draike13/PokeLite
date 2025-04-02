import { Pokemon } from './pokemon.model';

export interface badge {
  badgeName: string
  badgeImage: string
  acquired: boolean
}

export interface SaveFile {
  slot: number;
  playerName: string;
  pokemonData: Pokemon[];
  badges: badge[]
}
