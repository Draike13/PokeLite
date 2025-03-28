import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stat-box-center',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './stat-box-center.component.html',
  styleUrl: './stat-box-center.component.css',
})
export class StatBoxCenterComponent {}
