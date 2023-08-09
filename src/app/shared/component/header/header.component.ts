import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  searchKW = ''

  @Input() header = {
    title: '',
    subtitle: '',
  }

  constructor(
    private router: Router
  ) {} 

  search():void {
    this.searchKW &&
    this.router.navigate(['/search'],
      { 
        queryParams: {kw:this.searchKW}
      });
  }

  onKeydown(event: any){
    this.search()
  }

}
