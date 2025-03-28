import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-exp-bar',
  imports: [MatProgressBarModule],
  templateUrl: './exp-bar.component.html',
  styleUrl: './exp-bar.component.css',
})
export class ExpBarComponent {
  constructor(private helperSerive: HelperService) {}

  get pokemonExp() {
    return this.helperSerive.PlayerExp;
  }
}
