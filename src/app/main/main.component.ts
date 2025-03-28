import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ContentBoxComponent } from '../content-box/content-box.component';
import { ChoiceBoxLeftComponent } from '../choice-box-left/choice-box-left.component';
import { ChoiceBoxCenterComponent } from '../choice-box-center/choice-box-center.component';
import { ChoiceBoxRightComponent } from '../choice-box-right/choice-box-right.component';
import { FooterComponent } from '../footer/footer.component';
import { StatBoxRightComponent } from '../stat-box-right/stat-box-right.component';
import { StatBoxCenterComponent } from '../stat-box-center/stat-box-center.component';
import { StatBoxLeftComponent } from '../stat-box-left/stat-box-left.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    ContentBoxComponent,
    ChoiceBoxLeftComponent,
    ChoiceBoxCenterComponent,
    ChoiceBoxRightComponent,
    FooterComponent,
    StatBoxRightComponent,
    StatBoxCenterComponent,
    StatBoxLeftComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
