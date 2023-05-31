import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from './service/user.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

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
    this.isPlatFormBrowser && setTimeout(() => {this.userService.updateUserStorage()}, 300)
  }
}
