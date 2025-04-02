import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HelperService } from '../../Services/helper.service';

@Component({
  selector: 'app-modal-player-card',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './modal-player-card.component.html',
  styleUrl: './modal-player-card.component.css',
})
export class ModalPlayerCardComponent {
  constructor(private helperService: HelperService) {}
  data = inject(MAT_DIALOG_DATA);

  username() {
    return this.helperService.activeSave()?.playerName ?? 'Someone';
  }
}
