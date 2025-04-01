import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HelperService } from '../helper.service';
import { SaveService } from '../save.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ModalNameEntryComponent } from '../Modals/modal-name-entry/modal-name-entry.component';

@Component({
  selector: 'app-content-box',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './content-box.component.html',
  styleUrl: './content-box.component.css',
})
export class ContentBoxComponent {
  constructor(
    private helperService: HelperService,
    private saveService: SaveService
  ) {}
  dialog = inject(MatDialog);
  saves = false;
  saveFiles() {
    return this.saveService.getSaves();
  }
  displaySaveFiles() {
    this.saves = true;
  }
  nameSaveFile() {
    this.dialog.open(ModalNameEntryComponent),
      {
        height: '24vh',
        width: '48vw',
        position: {
          top: '8vh',
        },
      };
  }
}
// openDialog(pokemon: Pokemon) {
//     this.dialog.open(ModalNameEntryComponent, {
//       data: { pokemon: pokemon },
//       height: '24vh',
//       width: '48vw',
//       position: {
//         top: '8vh',
//       },
//     });
//   }
