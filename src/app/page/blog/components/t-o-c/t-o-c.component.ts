import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IToCData } from '../../interfaces/blog.interface';

@Component({
  selector: 'app-toc',
  templateUrl: './t-o-c.component.html',
  styleUrls: ['./t-o-c.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToCComponent implements OnInit {

  @Input() tocData = [] as IToCData[]

  constructor (
    private router: Router,
  ) { }

  ngOnInit(): void { }

  navigate(eleId: string){
    this.router.navigate([], { fragment: eleId });
  }
}
