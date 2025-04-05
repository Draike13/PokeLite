import { Badge } from './badge.model';
import { Pokemon } from './pokemon.model';

export interface Boss {
  difficulty: number;
  bossName: string;
  pokemon: Pokemon[];
  hiddenItems: string[];
  heldBadgeIndex: number;
  image: string;
}
