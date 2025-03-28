import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../helper.service';
import { BattleService } from '../battle.service';

@Component({
  selector: 'app-choice-box-center',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './choice-box-center.component.html',
  styleUrl: './choice-box-center.component.css',
})
export class ChoiceBoxCenterComponent {
  constructor(
    private helperService: HelperService,
    private battleService: BattleService
  ) {}

  giveExp() {
    this.battleService.giveExp();
  }
  takeDamage() {
    this.battleService.takeDamage();
  }
  heal() {
    this.battleService.recoverHealth();
  }
}
