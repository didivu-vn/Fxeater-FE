import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from './service/user.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isPlatFormBrowser: boolean;

  constructor(
    private userService: UserService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isPlatFormBrowser = isPlatformBrowser(platformId)
  }

  ngOnInit(): void {
    console.log('FXeater run in mode ', environment.production)
    environment.production && this.isPlatFormBrowser && this.grabTheTrackId()
    this.isPlatFormBrowser && setTimeout(() => {this.userService.updateUserStorage()}, 300)
  }

  grabTheTrackId(){
    //Add custom element of script with following attributes
    let customGtagScriptEle: HTMLScriptElement = this.document.createElement('script');
    customGtagScriptEle.async = true;
    customGtagScriptEle.src = `https://www.googletagmanager.com/gtm.js?id=${environment.GTM_TRACKING_ID}&l=dataLayer`;
    this.document.head.prepend(customGtagScriptEle);    
  }
}
