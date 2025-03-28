import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-player-card',
  imports: [MatCardModule, MatButtonModule, NgStyle],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.css',
})
export class PlayerCardComponent {
  constructor(private helperService: HelperService) {}

  get selectedImage() {
    console.log(this.helperService.playerImage());
    return this.helperService.playerImage;
  }
}
