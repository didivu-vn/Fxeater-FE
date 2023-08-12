import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/service';

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
    private router: Router,
    private navigationService: NavigationService
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

  back(){
    this.navigationService.back()
  }

}
