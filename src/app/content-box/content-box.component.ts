import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-content-box',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './content-box.component.html',
  styleUrl: './content-box.component.css',
})
export class ContentBoxComponent {}
