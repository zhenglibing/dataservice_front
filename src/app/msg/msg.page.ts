import { Component } from '@angular/core';
import { EnvService } from '../wongoing/env.service';

@Component({
    selector: 'app-msg',
    templateUrl: 'msg.page.html',
    styleUrls: ['msg.page.scss']
})
export class MsgPage {
    isShowHeader = this.env.IsShowHeader;
    constructor(private env: EnvService) {}
}
