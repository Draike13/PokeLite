import { Item } from './item.model';

export interface RandomEncounter {
  id: number;
  name: string;
  description: string;
  image: string;
  reward: string;
  failure?: string;
  hidden: boolean;
}
