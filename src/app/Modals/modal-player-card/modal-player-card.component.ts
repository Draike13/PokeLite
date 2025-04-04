import { Component, inject, OnInit } from '@angular/core';
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
import { Rank } from '../../Models/rank.model';

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
  ngOnInit() {
    this.sortBadges();
  }
  badges: { badgeId: number; badgeName: string; badgeImage: string }[] = [];

  username() {
    return this.helperService.activeSave()?.playerName ?? 'Someone';
  }

  rank() {
    let currentRank: Rank;
    this.helperService.playerRank().forEach((activeRank) => {
      if (activeRank.current === true) {
        currentRank = activeRank;
      }
    });
    return currentRank!.rankImage;
  }
  sortBadges() {
    this.helperService.playerBadges().forEach((eachBadge) => {
      if (eachBadge.acquired === true) {
        this.badges!.push({
          badgeId: eachBadge.badgeId,
          badgeName: eachBadge.badgeName,
          badgeImage: eachBadge.badgeImage,
        });
      } else {
        this.badges!.push({
          badgeId: eachBadge.badgeId,
          badgeName: eachBadge.badgeName,
          badgeImage: eachBadge.badgeImageBlank,
        });
      }
    });
  }
}
