import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  constructor(private env: EnvService) { }

  ngOnInit() {
  }

}
