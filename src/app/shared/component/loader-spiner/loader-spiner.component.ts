import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-loader-spiner',
  templateUrl: './loader-spiner.component.html',
  styleUrls: ['./loader-spiner.component.scss']
})
export class LoaderSpinerComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

}
