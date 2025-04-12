export interface BattleLog {
  text: string;
  type: 'enemy-damage' | 'player-damage' | 'taunt' | 'status' | 'glitch';
}
