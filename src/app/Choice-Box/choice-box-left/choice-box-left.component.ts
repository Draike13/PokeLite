import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-choice-box-left',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './choice-box-left.component.html',
  styleUrl: './choice-box-left.component.css',
})
export class ChoiceBoxLeftComponent {}
