export interface Pokemon {
  id: number;
  name: string;
  currentHealth: number;
  maxHealth: number;
  attack: number;
  level: number;
  experience: number;
  evolutionLevel?: number;
  secondEvoultionLevel?: number;
  image: string;
  locked: boolean;
}
