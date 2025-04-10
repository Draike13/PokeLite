import { Item } from './item.model';

export interface RandomEncounter {
  id: number;
  name: string;
  description: string;
  image: string;
  reward?: Item;
  hidden: boolean;
}
