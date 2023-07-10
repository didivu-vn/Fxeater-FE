import { Component, Input } from '@angular/core';
import { IChartPattern } from 'src/app/page/learning/interface/interface';

@Component({
  selector: 'app-chart-pattern-card',
  templateUrl: './chart-pattern-card.component.html',
  styleUrls: ['./chart-pattern-card.component.scss']
})
export class ChartPatternCardComponent {

  @Input() item = {} as IChartPattern

}
