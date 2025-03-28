import { HttpClientJsonpModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-stat-box-right',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './stat-box-right.component.html',
  styleUrl: './stat-box-right.component.css',
})
export class StatBoxRightComponent {
  constructor(private helperService: HelperService) {}

  get attack() {
    return this.helperService.playerAttack;
  }
}
