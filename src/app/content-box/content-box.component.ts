import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../helper.service';
@Component({
  selector: 'app-content-box',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './content-box.component.html',
  styleUrl: './content-box.component.css',
})
export class ContentBoxComponent {
  constructor(private helperService: HelperService) {}

  get selectedImage() {
    console.log(this.helperService.playerImage());
    return this.helperService.playerImage;
  }
}
