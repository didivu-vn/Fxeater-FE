import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: 'img' })
export class LazyImgDirective implements OnInit {

  @Input() responsive = false;

  ref: any

  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    this.ref = nativeElement

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }

  ngOnInit(): void {
    if (this.responsive) {
      this.ref.style['height'] = 'auto'
      this.ref.style['width'] = '100%'
    }
  }

}
