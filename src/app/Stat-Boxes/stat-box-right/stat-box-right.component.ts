import { HttpClientJsonpModule } from '@angular/common/http';
import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../../helper.service';

@Component({
  selector: 'app-stat-box-right',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './stat-box-right.component.html',
  styleUrl: './stat-box-right.component.css',
})
export class StatBoxRightComponent {
  constructor(private helperService: HelperService) {}

  get currentAttack() {
    return this.helperService.playerAttack;
  }

  attack: null | number = null;

  checkAttack = effect(() => {
    if (this.helperService.activePokemon()) this.attack = this.currentAttack();
  });
}
