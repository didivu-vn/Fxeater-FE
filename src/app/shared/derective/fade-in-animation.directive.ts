import { Directive, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[gsapFadeIn]'
})
export class FadeInAnimationDirective implements OnInit {
    @Input() duration = 2;
    @Input() delay = 1;
    @Input() direct: 's' | 'e' | 'b' | 't' = 's'
    @Input() nodeType: 's' | 'm' = 's'
    @Input() className = ''

    @Output() complete: EventEmitter<null> = new EventEmitter();
    @Output() reverseComplete: EventEmitter<null> = new EventEmitter();

    constructor(protected element: ElementRef<HTMLDivElement>) { }

    ngOnInit() {
        // perform animation
        this.animateIn();
    }

    protected animateIn() {
        this.nodeType == 'm'
            ? gsap.from(
                this.element.nativeElement.children,
                Object.assign(
                    {
                        duration: this.duration,
                        delay: this.delay,
                        opacity: 0,
                        stagger: 0.2,
                    },
                    this.caculateAttribute()
                )
            )
            : gsap.from(
                this.element.nativeElement,
                Object.assign(
                    {
                        duration: this.duration,
                        delay: this.delay,
                        opacity: 0,
                        stagger: 0.2,
                    },
                    this.caculateAttribute()
                )
            )
    }

    private caculateAttribute () {
        const directMaster = {
            s : {
                x: -50
            },
            e: {
                x: 50
            },
            b: {
                y: 50
            },
            t: {
                y: -50
            }
        }
        return directMaster[this.direct]
    }
}