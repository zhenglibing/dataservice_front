import { Component, OnInit } from '@angular/core';
import { EnvService } from 'src/app/wongoing/env.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  isShowHeader = this.env.IsShowHeader;
  content: any = '';
  constructor(private env: EnvService) { }

  ngOnInit() {
  }

  public feedbackCommit() {
    console.log('this feedback content is ' + this.content);
  }
}
