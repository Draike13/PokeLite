import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-stat-box-center',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './stat-box-center.component.html',
  styleUrl: './stat-box-center.component.css',
})
export class StatBoxCenterComponent {
  constructor(private helperService: HelperService) {}

  get level() {
    return this.helperService.playerLevel;
  }
}
