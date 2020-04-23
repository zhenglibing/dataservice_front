import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';

@Component({
  selector: 'app-commonset',
  templateUrl: './commonset.page.html',
  styleUrls: ['./commonset.page.scss'],
})
export class CommonsetPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  settings = {
    pushState: true
  };

  constructor(private env: EnvService) { }

  ngOnInit() {
  }

}
