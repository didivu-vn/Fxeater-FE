import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {

  private _isLoaded : boolean = false;

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.init()
  }

  init(){
    this._isLoaded = true
  }

  // onIframeLoad(event: Event): void {
  //   const iframe = event.target as HTMLIFrameElement;
  //   const iframeWindow = iframe?.contentWindow;
  //   const iframeDocument = iframe.contentDocument;
  //   console.log(iframe, iframeWindow?.document.querySelectorAll('div'))
  // }

}
