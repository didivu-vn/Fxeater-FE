import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-no-ssr',
  templateUrl: './no-ssr.component.html',
  styleUrls: ['./no-ssr.component.scss']
})
export class NoSSRComponent {

  constructor (
    @Inject(PLATFORM_ID) private platformId: string,
  ) { }

  get isBrowserOnly(): boolean {
    return isPlatformBrowser(this.platformId);
  }

}
