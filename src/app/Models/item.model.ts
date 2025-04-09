export interface Item {
  name: string;
  id: number;
  image: string;
  baseWeight: number;
  minDifficulty: number;
  maxDifficulty: number;
  unlockCondition?: () => boolean;
}
