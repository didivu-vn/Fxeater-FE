import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent implements OnInit {

  lang$ = this.langService.lang$

  constructor (
    private langService: LanguageService
  ) { }

  ngOnInit(): void {
      
  }

  changeValue(data: any){
    // validate and set new data
    if (data !== this.lang$.value.lang) {
      this.langService.setLangToStorage(data)
      window.location.reload()
    }
  }

}
