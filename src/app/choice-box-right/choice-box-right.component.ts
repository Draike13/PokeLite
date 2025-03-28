import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-choice-box-right',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './choice-box-right.component.html',
  styleUrl: './choice-box-right.component.css',
})
export class ChoiceBoxRightComponent {}
