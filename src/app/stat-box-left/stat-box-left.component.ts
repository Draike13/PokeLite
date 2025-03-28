import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-stat-box-left',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './stat-box-left.component.html',
  styleUrl: './stat-box-left.component.css',
})
export class StatBoxLeftComponent {}
