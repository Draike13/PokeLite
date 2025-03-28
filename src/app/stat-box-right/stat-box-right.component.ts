import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stat-box-right',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './stat-box-right.component.html',
  styleUrl: './stat-box-right.component.css',
})
export class StatBoxRightComponent {}
