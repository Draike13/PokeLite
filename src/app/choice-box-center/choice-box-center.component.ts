import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-choice-box-center',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './choice-box-center.component.html',
  styleUrl: './choice-box-center.component.css',
})
export class ChoiceBoxCenterComponent {}
